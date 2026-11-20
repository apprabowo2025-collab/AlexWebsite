<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { languages, locale, setLocale, t } from '../../i18n.js'

const links = computed(() => [
  { label: t.value.nav.about, href: '#about' },
  { label: t.value.nav.music, href: '#music' },
  { label: t.value.nav.productions, href: '#productions' },
  { label: t.value.nav.live, href: '#live' },
  { label: t.value.nav.coaching, href: '#coaching' },
  { label: t.value.nav.education, href: '#education' },
])

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

    <nav id="mag-nav" class="mag-nav" :aria-label="t.nav.main">
      <a v-for="link in links" :key="link.href" :href="link.href" @click="menuOpen = false">
        {{ link.label }}
      </a>
      <!-- Only in the phone menu, where the "Work with me" button is hidden for space -->
      <a class="mag-nav-contact" href="#contact" @click="menuOpen = false">{{ t.nav.contact }}</a>
    </nav>

    <div class="mag-header-actions">
      <!-- Language switch: one round flag per language; the current one is ringed -->
      <div class="lang-switch" role="group" :aria-label="t.nav.language">
        <button
          v-for="lang in languages"
          :key="lang.code"
          type="button"
          class="lang-btn"
          :class="{ 'is-active': locale === lang.code }"
          :lang="lang.code"
          :aria-pressed="locale === lang.code"
          :aria-label="lang.name"
          :title="lang.name"
          @click="setLocale(lang.code)"
        >
          <svg v-if="lang.code === 'nl'" class="lang-flag" viewBox="0 0 9 6" aria-hidden="true">
            <rect width="9" height="6" fill="#21468b" />
            <rect width="9" height="4" fill="#fff" />
            <rect width="9" height="2" fill="#ae1c28" />
          </svg>
          <svg v-else class="lang-flag" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <clipPath id="uk-flag-cross">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <rect width="60" height="30" fill="#012169" />
            <path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6" />
            <path d="M0 0l60 30m0-30L0 30" clip-path="url(#uk-flag-cross)" stroke="#c8102e" stroke-width="4" />
            <path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10" />
            <path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6" />
          </svg>
        </button>
      </div>

      <a class="mag-btn mag-btn-sm mag-btn-cream" href="#contact">{{ t.nav.workWithMe }}</a>
      <button
        type="button"
        class="mag-burger"
        :aria-expanded="menuOpen"
        aria-controls="mag-nav"
        :aria-label="t.nav.menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span>
      </button>
    </div>
  </header>
</template>
