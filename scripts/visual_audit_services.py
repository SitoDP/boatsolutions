"""Capture service-page sections and report layout metrics for visual review."""

from __future__ import annotations

import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("BASE_URL", "https://boat-solutions.es").rstrip("/")
OUTPUT = Path("artifacts/service-audit")
ROUTES = {
    "servicios": "/servicios",
    "mantenimiento": "/programas/mantenimiento-delegado",
    "electronica": "/programas/electronica-asesorada",
    "detailing": "/programas/limpieza-detailing",
    "completo": "/programas/listo-para-zarpar",
}
VIEWPORTS = ((1440, 900), (390, 844))


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    report: dict[str, object] = {}

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        for width, height in VIEWPORTS:
            page = browser.new_page(viewport={"width": width, "height": height})
            for name, path in ROUTES.items():
                page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
                page.screenshot(path=str(OUTPUT / f"{name}-{width}-fold.png"))
                for section_name, selector in (
                    ("cards", ".programs-live-region"),
                    ("included", ".detail-included"),
                    ("workflow", ".detail-workflow"),
                    ("conditions", ".program-conditions"),
                ):
                    section = page.locator(selector)
                    if section.count():
                        section.first.screenshot(
                            path=str(OUTPUT / f"{name}-{width}-{section_name}.png")
                        )
                report[f"{name}-{width}"] = page.evaluate(
                    """() => ({
                      viewport: document.documentElement.clientWidth,
                      pageWidth: document.documentElement.scrollWidth,
                      surface: (() => {
                        const el = document.querySelector('.programs-surface');
                        if (!el) return null;
                        const r = el.getBoundingClientRect();
                        return { left: r.left, width: r.width, right: r.right };
                      })(),
                      sections: [...document.querySelectorAll('.programs-surface > section')].map((el) => {
                        const r = el.getBoundingClientRect();
                        const style = getComputedStyle(el);
                        return {
                          className: el.className,
                          left: Math.round(r.left),
                          width: Math.round(r.width),
                          height: Math.round(r.height),
                          paddingLeft: style.paddingLeft,
                          paddingRight: style.paddingRight,
                        };
                      }),
                    })"""
                )
            page.close()
        browser.close()

    (OUTPUT / "metrics.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(OUTPUT / "metrics.json")


if __name__ == "__main__":
    main()
