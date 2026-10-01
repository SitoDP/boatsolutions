<template>
  <RouteLoader />
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
  <BookingModal :isOpen="isOpen" :isConsulting="isConsulting" :prefill="prefill" @close="close" />
  <ProgramBookingModal />
  <TransportRequestModal />
  <DetailingRequestModal />
  <ToastContainer />
  <WhatsAppButton />
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import BookingModal from './components/BookingModal.vue'
import ProgramBookingModal from './components/ProgramBookingModal.vue'
import TransportRequestModal from './components/TransportRequestModal.vue'
import DetailingRequestModal from './components/DetailingRequestModal.vue'
import ToastContainer from './components/ToastContainer.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import RouteLoader from './components/RouteLoader.vue'
import { useBooking } from './composables/useBooking'

const { isOpen, isConsulting, prefill, close } = useBooking()
</script>

<style>
@import './styles/main.css';

main {
  min-height: 100vh;
}
</style>
