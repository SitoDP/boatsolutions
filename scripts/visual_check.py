"""Responsive smoke and interaction checks for the production programs rollout."""

from __future__ import annotations

import os
import re
from pathlib import Path

from playwright.sync_api import Page, sync_playwright


BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:4173").rstrip("/")
ARTIFACTS = Path("artifacts/screenshots")
VIEWPORTS = (375, 768, 1024, 1440)
PROGRAM_PATHS = (
    "/programas/mantenimiento-delegado",
    "/programas/electronica-asesorada",
    "/programas/limpieza-detailing",
    "/programas/listo-para-zarpar",
)
CORE_PATHS = (
    "/",
    "/servicios",
    *PROGRAM_PATHS,
    "/bases-revision-gratuita",
    "/contacto",
    "/galeria",
    "/politica-de-privacidad",
    "/terminos-y-condiciones",
    "/en/servicios",
    "/en/contacto",
    "/en/programas/listo-para-zarpar",
    "/en/bases-revision-gratuita",
    "/en/politica-de-privacidad",
    "/en/terminos-y-condiciones",
)


def open_page(page: Page, path: str) -> None:
    page.goto(f"{BASE_URL}{path}", wait_until="domcontentloaded")
    page.locator("main h1").wait_for(state="visible")


def assert_layout(page: Page, path: str) -> None:
    metrics = page.evaluate(
        """() => ({
          viewport: document.documentElement.clientWidth,
          page: document.documentElement.scrollWidth,
          h1: document.querySelector('main h1')?.textContent?.trim() || '',
          lang: document.documentElement.lang,
          brokenImages: [...document.images]
            .filter((img) => img.complete && img.naturalWidth === 0)
            .map((img) => img.currentSrc || img.src),
        })"""
    )
    assert metrics["h1"], f"Missing H1 at {path}"
    assert metrics["page"] <= metrics["viewport"] + 1, (
        f"Horizontal overflow at {path}: {metrics['page']} > {metrics['viewport']}"
    )
    assert not metrics["brokenImages"], f"Broken images at {path}: {metrics['brokenImages']}"
    expected_lang = "en" if path.startswith("/en") else "es"
    assert metrics["lang"] == expected_lang, f"Wrong html lang at {path}: {metrics['lang']}"


def check_prices(page: Page) -> None:
    page.set_viewport_size({"width": 1440, "height": 900})
    open_page(page, "/servicios")
    hero_layout = page.evaluate(
        """() => {
          const header = document.querySelector('header');
          const hero = document.querySelector('.hero-section');
          const caption = document.querySelector('.hero-caption');
          const promotion = document.querySelector('.inspection-banner');
          if (!header || !hero || !caption || !promotion) return null;
          return {
            headerBottom: header.getBoundingClientRect().bottom,
            heroTop: hero.getBoundingClientRect().top,
            heroHeight: hero.getBoundingClientRect().height,
            captionBottom: caption.getBoundingClientRect().bottom,
            promotionTop: promotion.getBoundingClientRect().top,
          };
        }"""
    )
    assert hero_layout is not None
    assert hero_layout["heroTop"] >= hero_layout["headerBottom"], hero_layout
    assert hero_layout["heroHeight"] <= 760, hero_layout
    assert hero_layout["captionBottom"] <= hero_layout["promotionTop"] - 8, hero_layout

    assert page.locator("[data-program]").count() == 4
    card_layout = page.evaluate(
        """() => {
          const cards = [...document.querySelectorAll('.program-card:not(.featured)')];
          const actionBottoms = cards.map((card) =>
            card.querySelector('.card-actions')?.getBoundingClientRect().bottom || 0
          );
          const ready = document.querySelector('[data-program="ready"]');
          const conditions = ready?.querySelector('.program-card-conditions')?.getBoundingClientRect();
          const note = ready?.querySelector('.program-hours-note')?.getBoundingClientRect();
          return {
            actionBottoms,
            noteGap: conditions && note ? note.top - conditions.bottom : null,
          };
        }"""
    )
    assert max(card_layout["actionBottoms"]) - min(card_layout["actionBottoms"]) <= 2, card_layout
    assert card_layout["noteGap"] is not None and card_layout["noteGap"] >= 4, card_layout

    initial = page.locator("[data-program]").evaluate_all(
        "els => els.map((el) => el.getAttribute('data-price'))"
    )
    assert initial == ["215", "130", "85", "360"], initial
    page.locator('[data-length="50"]').first.click()
    updated = page.locator("[data-program]").evaluate_all(
        "els => els.map((el) => el.getAttribute('data-price'))"
    )
    assert updated == ["355", "215", "145", "600"], updated


def check_detail_and_modal(page: Page) -> None:
    page.set_viewport_size({"width": 1440, "height": 900})
    open_page(page, "/programas/electronica-asesorada")

    layout = page.evaluate(
        """() => {
          const surface = document.querySelector('.detail-page');
          const hero = document.querySelector('.detail-hero');
          const problem = document.querySelector('.detail-problem');
          if (!surface || !hero || !problem) return null;
          const surfaceBox = surface.getBoundingClientRect();
          const heroBox = hero.getBoundingClientRect();
          const problemStyle = getComputedStyle(problem);
          return {
            surfaceWidth: surfaceBox.width,
            surfaceLeft: surfaceBox.left,
            headerBottom: document.querySelector('header')?.getBoundingClientRect().bottom || 0,
            heroTop: heroBox.top,
            heroHeight: heroBox.height,
            problemPaddingLeft: parseFloat(problemStyle.paddingLeft),
          };
        }"""
    )
    assert layout is not None
    assert layout["surfaceWidth"] <= 1240, layout
    assert layout["surfaceLeft"] >= 24, layout
    assert layout["heroTop"] >= layout["headerBottom"], layout
    assert layout["heroHeight"] <= 760, layout
    assert layout["problemPaddingLeft"] >= 40, layout

    page.locator('[data-detail-conditions] [data-length="50"]').click()
    assert page.locator("[data-detail-price]").inner_text().strip() == "215 €"
    assert page.locator("[data-legal-review]").count() == 0

    price_box = page.locator(".program-conditions-price").evaluate(
        "el => ({bottom: el.getBoundingClientRect().bottom})"
    )
    selector_box = page.locator("[data-detail-conditions] .length-selector").evaluate(
        "el => ({top: el.getBoundingClientRect().top})"
    )
    assert 0 <= selector_box["top"] - price_box["bottom"] <= 80, (
        "Length selector is not immediately after the monthly fee"
    )

    cta = page.locator('[data-booking-cta="detail-hero"]')
    assert cta.get_attribute("type") == "button"
    cta.click()
    dialog = page.get_by_role("dialog")
    dialog.wait_for(state="visible")
    assert dialog.locator("#booking-program").input_value() == "navigation"
    assert dialog.locator("#booking-length").input_value() == "50"
    assert dialog.locator('[data-promotion-terms]').get_attribute("href") == "/bases-revision-gratuita"
    assert dialog.locator('.privacy-check a').get_attribute("href") == "/politica-de-privacidad"
    page.keyboard.press("Escape")
    dialog.wait_for(state="hidden")


def check_english_mobile_labels(page: Page) -> None:
    page.set_viewport_size({"width": 375, "height": 900})
    open_page(page, "/en/servicios")
    labels = page.locator(".comparison-row span[data-program-label]").evaluate_all(
        "els => [...new Set(els.map((el) => el.getAttribute('data-program-label')))]"
    )
    assert labels == [
        "Delegated Maintenance Plan",
        "Expert-Guided Electronics Plan",
        "Cleaning & Detailing Plan",
        "Ready to Cast Off",
    ], labels
    pseudo_labels = page.locator(".comparison-row span[data-program-label]").first.evaluate(
        "el => getComputedStyle(el, '::before').content"
    )
    assert "Mantenimiento" not in pseudo_labels and "Electrónica" not in pseudo_labels
    assert "31/10/2026" in page.locator("main").inner_text()


def check_redirects(page: Page) -> None:
    redirects = {
        "/programas/barco-sin-preocupaciones": "/programas/mantenimiento-delegado",
        "/programas/navega-seguro": "/programas/electronica-asesorada",
        "/programas/zarpa-cuando-quieras": "/programas/listo-para-zarpar",
        "/yacht-management": "/programas/mantenimiento-delegado",
        "/yacht-detailing": "/programas/limpieza-detailing",
        "/yacht-consulting": "/servicios",
        "/yacht-logistics": "/servicios",
        "/en/programas/barco-sin-preocupaciones": "/en/programas/mantenimiento-delegado",
        "/en/programas/navega-seguro": "/en/programas/electronica-asesorada",
        "/en/programas/zarpa-cuando-quieras": "/en/programas/listo-para-zarpar",
        "/en/yacht-management": "/en/programas/mantenimiento-delegado",
        "/en/yacht-detailing": "/en/programas/limpieza-detailing",
        "/en/yacht-consulting": "/en/servicios",
        "/en/yacht-logistics": "/en/servicios",
    }
    for source, destination in redirects.items():
        page.goto(f"{BASE_URL}{source}", wait_until="domcontentloaded")
        page.wait_for_url(f"**{destination}")
        assert page.url.rstrip("/").endswith(destination), f"Redirect failed: {source} -> {page.url}"


def main() -> None:
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    failures: list[str] = []
    console_errors: list[str] = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1024, "height": 900})
        page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
        page.on("pageerror", lambda error: console_errors.append(str(error)))

        for path in CORE_PATHS:
            try:
                open_page(page, path)
                assert_layout(page, path)
            except Exception as error:  # keep auditing the rest of the site
                failures.append(f"{path}: {error}")

        try:
            check_prices(page)
            check_detail_and_modal(page)
            check_english_mobile_labels(page)
            check_redirects(page)
        except Exception as error:
            failures.append(f"interaction: {error}")

        for width in VIEWPORTS:
            page.set_viewport_size({"width": width, "height": 900})
            for name, path in (
                ("servicios", "/servicios"),
                ("programa-completo", "/programas/listo-para-zarpar"),
            ):
                try:
                    open_page(page, path)
                    assert_layout(page, path)
                    page.screenshot(
                        path=str(ARTIFACTS / f"{name}-{width}.png"),
                        full_page=True,
                    )
                except Exception as error:
                    failures.append(f"{name}@{width}: {error}")

        browser.close()

    actionable_console_errors = [
        error for error in console_errors
        if not re.search(r"favicon|Failed to load resource.*404", error, re.IGNORECASE)
    ]
    if actionable_console_errors:
        failures.append("console: " + " | ".join(dict.fromkeys(actionable_console_errors)))

    if failures:
        raise AssertionError("\n".join(failures))
    print(f"QA passed: {len(CORE_PATHS)} routes, {len(VIEWPORTS)} responsive widths, prices, modal and redirects")


if __name__ == "__main__":
    main()
