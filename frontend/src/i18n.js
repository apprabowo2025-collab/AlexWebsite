// Language switch for the site: English ('en') or Dutch ('nl').
// The choice is remembered in the browser; first-time Dutch-speaking visitors get Dutch.
import { computed, ref, watchEffect } from 'vue'
import content from './data/siteContent.js'

export const languages = [
  { code: 'en', name: 'English', dateLocale: 'en-GB' },
  { code: 'nl', name: 'Nederlands', dateLocale: 'nl-NL' },
]

const STORAGE_KEY = 'language'

function startingLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (languages.some((lang) => lang.code === saved)) return saved
  } catch {
    // Storage can be blocked (private mode); fall back to the browser language
  }
  return navigator.language?.toLowerCase().startsWith('nl') ? 'nl' : 'en'
}

export const locale = ref(startingLanguage())

export function setLocale(code) {
  locale.value = code
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // Not saved, but the switch still works for this visit
  }
}

// All words for the current language
export const t = computed(() => content[locale.value])

// The locale used to write dates, e.g. "20 nov" in Dutch
export const dateLocale = computed(() => languages.find((lang) => lang.code === locale.value).dateLocale)

// Keep <html lang> and the browser tab title in step with the chosen language
watchEffect(() => {
  document.documentElement.lang = locale.value
  document.title = t.value.meta.title
})
