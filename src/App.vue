<template>
  <RouteLoader />
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
  <ProgramBookingModal />
  <ToastContainer />
  <WhatsAppButton />
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ProgramBookingModal from './components/ProgramBookingModal.vue'
import ToastContainer from './components/ToastContainer.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import RouteLoader from './components/RouteLoader.vue'
</script>

<style>
@import './styles/main.css';

main {
  min-height: 100vh;
}
</style>
