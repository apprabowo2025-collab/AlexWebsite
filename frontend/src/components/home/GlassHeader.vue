<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Music', href: '#music' },
  { label: 'Live', href: '#live' },
  { label: 'Coaching', href: '#coaching' },
  { label: 'Education', href: '#education' },
]

const menuOpen = ref(false)
const scrolled = ref(false)

// The pill turns more solid once the cover scrolls away so the menu stays readable.
function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="mag-header" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }">
    <a class="mag-logo" href="#top">Alex Haak</a>

    <nav id="mag-nav" class="mag-nav" aria-label="Main">
      <a v-for="link in links" :key="link.href" :href="link.href" @click="menuOpen = false">
        {{ link.label }}
      </a>
    </nav>

    <div class="mag-header-actions">
      <a class="mag-btn mag-btn-sm mag-btn-cream" href="#contact">Work with me</a>
      <button
        type="button"
        class="mag-burger"
        :aria-expanded="menuOpen"
        aria-controls="mag-nav"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span>
      </button>
    </div>
  </header>
</template>
