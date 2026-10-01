import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Eagerly import the home view (most likely landing page) so first paint
// doesn't wait on a chunk fetch. Every other view is lazy-loaded.
const Nosotros = () => import('../views/Nosotros.vue')
const Proyectos = () => import('../views/Proyectos.vue')
const Galeria = () => import('../views/Galeria.vue')
const Contacto = () => import('../views/Contacto.vue')
const YachtLogistics = () => import('../views/YachtLogistics.vue')
const Servicios = () => import('../views/Servicios.vue')
const ProgramaDetalle = () => import('../views/ProgramaDetalle.vue')
const BasesRevisionGratuita = () => import('../views/BasesRevisionGratuita.vue')
const PoliticaPrivacidad = () => import('../views/PoliticaPrivacidad.vue')
const TerminosCondiciones = () => import('../views/TerminosCondiciones.vue')
const NotFound = () => import('../views/NotFound.vue')

const programRoutes = [
  { slug: 'mantenimiento-delegado', programId: 'care' },
  { slug: 'electronica-asesorada', programId: 'navigation' },
  { slug: 'limpieza-detailing', programId: 'ready' },
  { slug: 'listo-para-zarpar', programId: 'complete' },
] as const

const legacyProgramRedirects = [
  { slug: 'barco-sin-preocupaciones', destination: 'mantenimiento-delegado' },
  { slug: 'navega-seguro', destination: 'electronica-asesorada' },
  { slug: 'zarpa-cuando-quieras', destination: 'listo-para-zarpar' },
] as const

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/nosotros', name: 'nosotros', component: Nosotros },
    { path: '/proyectos', name: 'proyectos', component: Proyectos },
    { path: '/galeria', name: 'galeria', component: Galeria },
    { path: '/contacto', name: 'contacto', component: Contacto },
    { path: '/servicios', name: 'services', component: Servicios },
    ...programRoutes.map(({ slug, programId }) => ({
      path: `/programas/${slug}`,
      name: `program-${programId}`,
      component: ProgramaDetalle,
      props: { programId },
      meta: { programId },
    })),
    { path: '/bases-revision-gratuita', name: 'promotion-terms', component: BasesRevisionGratuita },
    ...legacyProgramRedirects.map(({ slug, destination }) => ({
      path: `/programas/${slug}`,
      redirect: `/programas/${destination}`,
    })),
    { path: '/yacht-consulting', redirect: '/servicios' },
    { path: '/yacht-management', redirect: '/programas/mantenimiento-delegado' },
    { path: '/yacht-logistics', name: 'yacht-logistics', component: YachtLogistics },
    { path: '/yacht-detailing', redirect: '/programas/limpieza-detailing' },
    { path: '/politica-de-privacidad', name: 'politica-privacidad', component: PoliticaPrivacidad },
    { path: '/terminos-y-condiciones', name: 'terminos-condiciones', component: TerminosCondiciones },
    // EN routes
    { path: '/en', name: 'home-en', component: Home },
    { path: '/en/nosotros', name: 'nosotros-en', component: Nosotros },
    { path: '/en/proyectos', name: 'proyectos-en', component: Proyectos },
    { path: '/en/galeria', name: 'galeria-en', component: Galeria },
    { path: '/en/contacto', name: 'contacto-en', component: Contacto },
    { path: '/en/servicios', name: 'services-en', component: Servicios },
    ...programRoutes.map(({ slug, programId }) => ({
      path: `/en/programas/${slug}`,
      name: `program-${programId}-en`,
      component: ProgramaDetalle,
      props: { programId },
      meta: { programId },
    })),
    { path: '/en/bases-revision-gratuita', name: 'promotion-terms-en', component: BasesRevisionGratuita },
    ...legacyProgramRedirects.map(({ slug, destination }) => ({
      path: `/en/programas/${slug}`,
      redirect: `/en/programas/${destination}`,
    })),
    { path: '/en/yacht-consulting', redirect: '/en/servicios' },
    { path: '/en/yacht-management', redirect: '/en/programas/mantenimiento-delegado' },
    { path: '/en/yacht-logistics', name: 'yacht-logistics-en', component: YachtLogistics },
    { path: '/en/yacht-detailing', redirect: '/en/programas/limpieza-detailing' },
    { path: '/en/politica-de-privacidad', name: 'politica-privacidad-en', component: PoliticaPrivacidad },
    { path: '/en/terminos-y-condiciones', name: 'terminos-condiciones-en', component: TerminosCondiciones },
    // Catch-all
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// Keep <html lang> in sync with the active locale (improves SEO + a11y)
router.afterEach((to) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = to.path.startsWith('/en') ? 'en' : 'es'
  }
})

export default router
