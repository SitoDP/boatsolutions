<template>
  <div class="galeria-page">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">{{ t.heroTitle }}</h1>
        <p class="hero-subtitle">{{ t.heroSubtitle }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="gallery-grid">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="gallery-item"
            @click="openLightbox(index)"
          >
            <img :src="image.src" :alt="image.alt" loading="lazy" />
            <div class="gallery-overlay">
              <span class="gallery-icon">+</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox" aria-label="Cerrar">&times;</button>
        <button class="lightbox-nav prev" @click="prevImage" aria-label="Anterior">&lt;</button>
        <img :src="images[lightboxIndex].src" :alt="images[lightboxIndex].alt" />
        <button class="lightbox-nav next" @click="nextImage" aria-label="Siguiente">&gt;</button>
        <div class="lightbox-counter">{{ lightboxIndex + 1 }} / {{ images.length }}</div>
      </div>
    </Teleport>

    <section class="section cta">
      <div class="container">
        <h2>{{ t.ctaTitle }}</h2>
        <p>{{ t.ctaText }}</p>
        <a href="https://youtube.com/@SailingBoatSolutions" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-large">
          {{ t.ctaBtn }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/useMeta'
import imgDulcinea1 from '../assets/dulcinea1.jpeg'
import imgDulcineaConsulting from '../assets/dulcineaConsulting.jpeg'
import imgMarcela1 from '../assets/marcela1.jpeg'
import imgMarcela2 from '../assets/marcela2.jpeg'
import imgDulcineaAerea from '../assets/dulcineaAerea.jpeg'
import imgDulcineaAlAgua from '../assets/dulcineaAlAgua.jpeg'
import imgPulidoAna from '../assets/pulidoAna.jpeg'
import imgDulcineaStorage from '../assets/dulcineaStorage.jpeg'
import imgDulcineaPalaTimon from '../assets/dulcineaPalaTimon.jpeg'
import imgDulcineaStorage2 from '../assets/dulcineaStorage2.jpeg'
import imgMarcelaTravel from '../assets/marcelaTravel.jpeg'
import imgDulcineaInSide from '../assets/dulcineaInSide.jpeg'
import imgDulcineaAmarre from '../assets/dulcineaAmarre.jpeg'

const { useT } = useLanguage()
const t = useT('galeria')

usePageMeta({
  es: {
    title: 'Galería',
    description: 'Galería de trabajos de mantenimiento, electrónica, limpieza y puesta a punto en las Rías Baixas.',
  },
  en: {
    title: 'Gallery',
    description: 'Gallery of maintenance, electronics, cleaning and boat preparation work in Galicia.',
  },
})

interface GalleryImage {
  src: string
  alt: string
}

const BASE = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,fit=crop/AMqDOgByPghjN30x/'

const images: GalleryImage[] = [
  { src: BASE + 'dji_0773-mk34eQ2g2ZUekG6R.JPG', alt: 'Vista aerea de embarcacion' },
  { src: BASE + 'img_1681-zR73hJx3RTqLfd01.jpg', alt: 'Embarcacion en el mar' },
  { src: BASE + 'img_23233-yxk0N83Y27Icf47I.jpg', alt: 'Gestion de yate' },
  { src: BASE + 'img_3592-mp84x25VeJCLqWJL.JPG', alt: 'Interior de embarcacion' },
  { src: BASE + 'pulir-baiona-m5K8N07gwlSrDxWn.png', alt: 'Detailing profesional en Baiona' },
  { src: BASE + 'img_20220420_090516-yYEsKX76VSkhJu6A.jpg', alt: 'Logistica de embarcacion' },
  { src: BASE + 'dji_fly_20250715_135058_892_1752580280260_photo_optimized-pVFBPFMOjxZr06es.JPG', alt: 'Fotografia aerea de yate' },
  { src: BASE + 'img_1747-GatsfpyBmklZgI6y.jpg', alt: 'Servicio nautico profesional' },
  { src: imgDulcinea1, alt: 'Dulcinea en el puerto de Vigo' },
  { src: imgDulcineaConsulting, alt: 'Dulcinea durante una revisión técnica' },
  { src: imgMarcela1, alt: 'Marcela en el mar' },
  { src: imgMarcela2, alt: 'Marcela — traslado' },
  { src: imgDulcineaAerea, alt: 'Vista aérea de Dulcinea navegando' },
  { src: imgDulcineaAlAgua, alt: 'Botadura de Dulcinea' },
  { src: imgPulidoAna, alt: 'Detailing profesional — pulido de casco' },
  { src: imgDulcineaStorage, alt: 'Dulcinea en almacenaje en seco' },
  { src: imgDulcineaPalaTimon, alt: 'Cubierta de teca a bordo de Dulcinea' },
  { src: imgDulcineaStorage2, alt: 'Embarcaciones en varadero cubierto' },
  { src: imgMarcelaTravel, alt: 'Marcela en travel-lift — Marina Davila' },
  { src: imgDulcineaInSide, alt: 'Obra viva de Dulcinea en taller' },
  { src: imgDulcineaAmarre, alt: 'Dulcinea y Marcela en el amarre' },
]

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const prevImage = () => {
  lightboxIndex.value = (lightboxIndex.value - 1 + images.length) % images.length
}

const nextImage = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % images.length
}
</script>

<style scoped>
.hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  position: relative;
  background: var(--color-meteorite-dark);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/AMqDOgByPghjN30x/dji_fly_20250715_135058_892_1752580280260_photo_optimized-pVFBPFMOjxZr06es.JPG') center/cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(8, 16, 24, 0.75) 0%, rgba(66, 104, 135, 0.55) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-light);
  padding: 140px 20px 60px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover img { transform: scale(1.08); }

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(66, 104, 135, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay { opacity: 1; }

.gallery-icon {
  font-size: 3rem;
  color: white;
  font-weight: 300;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.96);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.lightbox img {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  z-index: 3001;
  line-height: 1;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.12);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 20px;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 4px;
}

.lightbox-nav:hover { background: rgba(255, 255, 255, 0.25); }
.lightbox-nav.prev { left: 20px; }
.lightbox-nav.next { right: 20px; }

.lightbox-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 0.9rem;
  font-family: var(--font-heading);
  opacity: 0.8;
}

.cta {
  background: var(--color-gray-light);
  text-align: center;
}

.cta h2 { color: var(--color-dark); margin-bottom: 16px; }
.cta p { color: var(--color-gray); margin-bottom: 32px; font-size: 1.1rem; }

.btn-large { padding: 16px 40px; }

@media (max-width: 768px) {
  .hero-title { font-size: 2rem; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .lightbox-nav { padding: 12px; font-size: 1.5rem; }
}
</style>
