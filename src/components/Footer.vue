<template>
  <footer class="footer">
    <video class="footer-video" autoplay muted loop playsinline>
      <source :src="cdnVideo('footer-bg.mp4')" type="video/mp4" />
    </video>
    <div class="footer-overlay"></div>
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=192,h=192,fit=crop,f=png/AMqDOgByPghjN30x/untitled-design-4-dOqZL1pLyvs3RvbW.png" alt="Boat Solutions International" class="footer-logo" />
          <p class="footer-name">Boat Solutions International</p>
          <div class="social-links">
            <a href="https://www.instagram.com/boat_solutions.es/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://youtube.com/@SailingBoatSolutions" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-contact">
          <h4>{{ lbl.contact }}</h4>
          <a href="mailto:info@boat-solutions.es" class="footer-email">info@boat-solutions.es</a>
          <a href="tel:+34676625595" class="footer-phone">+34 676 625 595</a>
          <router-link :to="to('/contacto')" class="footer-btn">{{ lbl.contactBtn }}</router-link>
        </div>

        <div class="footer-links">
          <h4>{{ lbl.navigation }}</h4>
          <router-link :to="to('/')">{{ lbl.home }}</router-link>
          <router-link :to="to('/nosotros')">{{ lbl.about }}</router-link>
          <router-link :to="to('/proyectos')">{{ lbl.projects }}</router-link>
          <router-link :to="to('/galeria')">{{ lbl.gallery }}</router-link>
          <router-link :to="to('/servicios')">{{ lbl.services }}</router-link>
          <router-link :to="to('/programas/mantenimiento-delegado')">{{ lbl.careProgram }}</router-link>
          <router-link :to="to('/programas/electronica-asesorada')">{{ lbl.navigationProgram }}</router-link>
          <router-link :to="to('/programas/limpieza-detailing')">{{ lbl.cleaningProgram }}</router-link>
          <router-link :to="to('/programas/listo-para-zarpar')">{{ lbl.completeProgram }}</router-link>
          <router-link :to="to('/yacht-logistics')">{{ lbl.logistics }}</router-link>
          <router-link :to="to('/contacto')">{{ lbl.contact }}</router-link>
        </div>

        <div class="footer-links">
          <h4>Legal</h4>
          <router-link :to="to('/politica-de-privacidad')">{{ lbl.privacy }}</router-link>
          <router-link :to="to('/terminos-y-condiciones')">{{ lbl.terms }}</router-link>
        </div>
      </div>

      <div class="footer-bottom">
        <p>Design and Photos by Calixto Abalo Rodríguez</p>
        <div class="footer-legal-links">
          <router-link :to="to('/politica-de-privacidad')">{{ lbl.privacy }}</router-link>
          <span>·</span>
          <router-link :to="to('/terminos-y-condiciones')">{{ lbl.terms }}</router-link>
        </div>
        <p>© 2025. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'
import { cdnVideo } from '../config'

const { to, useT } = useLanguage()
const lbl = useT('footer')
</script>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  background: var(--color-meteorite-dark);
  color: var(--color-light);
  padding: 64px 0 32px;
}

.footer-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.footer-overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 16, 24, 0.82);
  z-index: 1;
}

.footer .container {
  position: relative;
  z-index: 2;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
  margin-bottom: 48px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  
}

.footer-name {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  opacity: 0.9;
}

.social-links {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.75);
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.footer-contact h4 {
  font-size: 1rem;
  margin-bottom: 16px;
  font-family: var(--font-heading);
}

.footer-email,
.footer-phone {
  display: block;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 8px;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-email:hover,
.footer-phone:hover {
  color: var(--color-light);
}

.footer-btn {
  display: inline-block;
  margin-top: 14px;
  padding: 8px 20px;
  background: var(--color-primary);
  color: white;
  border-radius: 6px;
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 0.875rem;
  transition: background 0.3s ease;
}

.footer-btn:hover {
  background: var(--color-primary-dark);
}

.footer-links h4 {
  font-size: 1rem;
  margin-bottom: 16px;
  font-family: var(--font-heading);
}

.footer-links a {
  display: block;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 10px;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--color-light);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  font-family: var(--font-heading);
}

.footer-legal-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-legal-links a {
  color: rgba(255, 255, 255, 0.45);
  transition: color 0.2s;
}

.footer-legal-links a:hover {
  color: rgba(255, 255, 255, 0.8);
}

.footer-legal-links span {
  opacity: 0.4;
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
