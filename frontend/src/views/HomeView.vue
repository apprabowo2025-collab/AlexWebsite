<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { shows, contact } from '../data/siteContent.js'
import { dateLocale, t } from '../i18n.js'
import GlassHeader from '../components/home/GlassHeader.vue'
import ProductionsGrid from '../components/home/ProductionsGrid.vue'
import '../assets/css/magazine-home.css'

// Turns 1 into "01"
function pad(value) {
  return String(value).padStart(2, '0')
}

// ---------- Tour dates ----------
// Today's date as "YYYY-MM-DD" in the visitor's time zone, so a show stays listed all day.
const now = new Date()
const today = [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join('-')

// Adds the day, month and long date used by the big-number rows, in the chosen language.
function withDates(show) {
  const [year, month, day] = show.date.split('-').map(Number)
  const when = new Date(year, month - 1, day)
  const lang = dateLocale.value
  return {
    ...show,
    day: pad(day),
    month: when.toLocaleDateString(lang, { month: 'short' }).replace('.', ''),
    year,
    weekday: when.toLocaleDateString(lang, { weekday: 'long' }),
    full: when.toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  }
}

// Upcoming shows, soonest first
const upcomingShows = computed(() =>
  shows
    .filter((show) => show.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(withDates),
)
const nextShow = computed(() => upcomingShows.value[0])

// The last four shows already played, most recent first
const pastShows = computed(() =>
  shows
    .filter((show) => show.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4)
    .map(withDates),
)

// Everyone Alex is (or was recently) on stage with, for the intro line
const bandmates = computed(() => [...new Set([...upcomingShows.value, ...pastShows.value].map((show) => show.with))])

// ---------- Cover carousel ----------
const cover = computed(() => t.value.cover.slides)
// slide = the number of the photo showing now
const slide = ref(0)
const current = computed(() => cover.value[slide.value])
// The next two photos, shown as numbered thumbnails on the cover
const upcoming = computed(() =>
  [1, 2].map((step) => {
    const index = (slide.value + step) % cover.value.length
    return { index, item: cover.value[index] }
  }),
)

let timer = null
const paused = ref(false)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function startTimer() {
  stopTimer()
  if (reduceMotion) return
  timer = window.setInterval(() => {
    if (!paused.value) slide.value = (slide.value + 1) % cover.value.length
  }, 5000)
}

function stopTimer() {
  if (timer) window.clearInterval(timer)
  timer = null
}

// Jumping to a photo restarts the 5 seconds so it does not change straight away
function goTo(index) {
  slide.value = index
  startTimer()
}

onMounted(startTimer)
onBeforeUnmount(stopTimer)
</script>

<template>
  <div class="magazine">
    <GlassHeader />

    <main>
      <!-- 1. Cover: big serif name, portrait in an arch, oxblood panel and hairlines -->
      <section id="top" class="cover">
        <span class="cover-panel" aria-hidden="true"></span>
        <span class="cover-rule cover-rule-v" aria-hidden="true"></span>
        <span class="cover-rule cover-rule-h" aria-hidden="true"></span>
        <span class="cover-circle" aria-hidden="true"></span>
        <span class="cover-dot cover-dot-ink" aria-hidden="true"></span>
        <span class="cover-dot cover-dot-red" aria-hidden="true"></span>
        <p class="cover-side" aria-hidden="true">{{ t.cover.side }}</p>

        <h1 class="cover-line cover-line-1">Alex Haak</h1>
        <p class="cover-line cover-line-2" aria-hidden="true">Live.</p>
        <p class="cover-ft">
          ft. <em>{{ current.feature }}</em>
          <a class="cover-ft-link" href="#music">{{ t.cover.hearTheWork }}</a>
        </p>

        <!-- Carousel: photos stacked in the arch, the active one fades in -->
        <div
          class="cover-stage"
          role="region"
          aria-roledescription="carousel"
          :aria-label="t.cover.photos"
          @mouseenter="paused = true"
          @mouseleave="paused = false"
          @focusin="paused = true"
          @focusout="paused = false"
        >
          <div class="cover-arch">
            <img
              v-for="(item, index) in cover"
              :key="item.image"
              :src="item.image"
              :alt="item.alt"
              :class="{ 'is-active': index === slide }"
              :style="{ objectPosition: item.position }"
              :aria-hidden="index !== slide"
              :loading="index === 0 ? 'eager' : 'lazy'"
            />
          </div>
          <div class="cover-dots">
            <button
              v-for="(item, index) in cover"
              :key="item.image"
              type="button"
              :class="{ 'is-active': index === slide }"
              :aria-label="t.cover.showPhoto(index + 1, item.label)"
              :aria-current="index === slide"
              @click="goTo(index)"
            ></button>
          </div>
        </div>

        <div class="cover-copy">
          <a v-if="nextShow" class="next-stop" href="#live">
            <span class="next-stop-dot" aria-hidden="true"></span>
            {{ t.cover.nextStop }} · {{ nextShow.city }} · {{ Number(nextShow.day) }} {{ nextShow.month }}
          </a>
          <p class="issue-chip"><span class="dot-live"></span>{{ t.cover.chip }}</p>
          <p class="cover-body">{{ t.cover.body }}</p>
          <p class="cover-booking">{{ t.cover.booking[0] }}<em>{{ t.cover.booking[1] }}</em>{{ t.cover.booking[2] }}</p>
          <div class="cover-actions">
            <a class="mag-btn" href="#contact">{{ t.nav.workWithMe }}</a>
            <a class="glass-btn" href="#music">{{ t.cover.listen }}</a>
          </div>
        </div>

        <!-- Numbered thumbnails of the next two photos; the second sits over the red panel -->
        <div class="cover-thumbs">
          <button
            v-for="next in upcoming"
            :key="next.index"
            type="button"
            class="cover-thumb"
            :aria-label="t.cover.showPhoto(next.index + 1, next.item.label)"
            @click="goTo(next.index)"
          >
            <span class="thumb-no">{{ pad(next.index + 1) }}</span>
            <span class="thumb-frame">
              <img :src="next.item.image" alt="" :style="{ objectPosition: next.item.position }" />
            </span>
          </button>
          <p class="cover-thumbs-note">{{ current.note }}</p>
        </div>
      </section>

      <!-- 2. Marquee: oxblood strip -->
      <section class="marquee" :aria-label="t.servicesLabel">
        <!-- The list is written twice so it can scroll in a seamless loop;
             the second copy is hidden from screen readers. -->
        <div class="marquee-row">
          <span
            v-for="(item, index) in [...t.marquee, ...t.marquee]"
            :key="index"
            :aria-hidden="index >= t.marquee.length ? 'true' : undefined"
          >
            {{ item }}<i aria-hidden="true">✦</i>
          </span>
        </div>
      </section>

      <!-- 3. About: editor's letter on white -->
      <section id="about" class="zone zone-white">
        <div class="zone-inner about">
          <div class="about-head">
            <p class="kicker">{{ t.about.kicker }}</p>
            <h2 class="about-title">
              {{ t.about.title[0] }}<em>{{ t.about.title[1] }}</em>{{ t.about.title[2] }}
            </h2>
          </div>
          <div class="about-body">
            <p v-for="(paragraph, index) in t.about.paragraphs" :key="index">
              <template v-if="index === 0">
                <span class="drop-cap">{{ paragraph[0] }}</span>{{ paragraph.slice(1) }}
              </template>
              <template v-else>{{ paragraph }}</template>
            </p>
            <p class="about-sign">— Alex</p>
          </div>
        </div>
      </section>

      <!-- 4. Music: black with grid -->
      <section id="music" class="zone zone-black">
        <div class="zone-inner">
          <header class="edit-head">
            <h2 class="edit-title">{{ t.music.title[0] }}<em>{{ t.music.title[1] }}</em>{{ t.music.title[2] }}</h2>
            <div class="edit-aside">
              <p class="kicker">{{ t.music.kicker }}</p>
              <p>{{ t.music.intro }}</p>
            </div>
          </header>

          <div class="music-grid">
            <article v-for="(item, index) in t.music.cards" :key="item.link" class="dark-glass music-card">
              <div class="music-art" :class="{ 'is-wine': index === 2 }">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.title"
                  :style="{ objectPosition: item.position }"
                  loading="lazy"
                />
                <span class="music-no">{{ pad(index + 1) }}</span>
                <span v-if="!item.image" class="music-placeholder">{{ item.placeholder }}</span>
              </div>
              <div class="music-copy">
                <p class="kicker">{{ item.type }}</p>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
                <a
                  class="line-link"
                  :href="item.link"
                  v-bind="item.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
                >
                  {{ item.linkLabel }} <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </div>

          <div class="credits">
            <div class="credits-head">
              <p class="kicker">{{ t.credits.kicker }}</p>
              <h3 class="credits-title">{{ t.credits.title[0] }}<em>{{ t.credits.title[1] }}</em>{{ t.credits.title[2] }}</h3>
              <p>{{ t.credits.intro }}</p>
              <a class="mag-btn mag-btn-cream" href="/files/resume.pdf" download>{{ t.credits.download }}</a>
            </div>
            <ol class="credits-list">
              <li v-for="credit in t.credits.items" :key="credit.title">
                <span class="credit-year">{{ credit.year }}</span>
                <div>
                  <h4>{{ credit.title }}</h4>
                  <p class="credit-role">{{ credit.role }}</p>
                  <p>{{ credit.description }}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- 4b. Productions: cover-art grid with 30-second previews -->
      <section id="productions" class="zone zone-black zone-productions">
        <div class="zone-inner">
          <ProductionsGrid />
        </div>
      </section>

      <!-- 4c. Live: date // location // touring with // tickets, on grey -->
      <section id="live" class="zone zone-grey">
        <div class="zone-inner">
          <header class="edit-head">
            <h2 class="edit-title">{{ t.live.title[0] }}<em>{{ t.live.title[1] }}</em>{{ t.live.title[2] }}</h2>
            <div class="edit-aside">
              <p class="kicker">{{ t.live.kicker }}</p>
              <p>{{ t.live.intro(bandmates) }}</p>
            </div>
          </header>

          <div class="show-labels" aria-hidden="true">
            <span>{{ t.live.labels.date }}</span>
            <span>{{ t.live.labels.location }}</span>
            <span>{{ t.live.labels.with }}</span>
            <span>{{ t.live.labels.tickets }}</span>
          </div>

          <ol v-if="upcomingShows.length" class="show-list">
            <li v-for="(show, index) in upcomingShows" :key="show.date + show.venue" class="show-row">
              <time class="show-date" :datetime="show.date" :title="show.full">
                <span class="show-day">{{ show.day }}</span>
                <span class="show-month">{{ show.month }}</span>
              </time>
              <span class="show-place">
                <span class="show-venue">
                  {{ show.venue }}
                  <span v-if="index === 0" class="show-next">{{ t.live.next }}</span>
                </span>
                <span class="show-meta">
                  {{ show.city }}, {{ show.country }} · {{ show.weekday }}<template v-if="show.doors"> · {{ t.live.doors }} {{ show.doors }}</template>
                </span>
              </span>
              <span class="show-with">
                <span class="show-label-inline">{{ t.live.labels.with }}</span>
                <strong>{{ show.with }}</strong>
                <span v-if="show.tour" class="show-meta"><em>{{ show.tour }}</em> {{ t.live.tour }}</span>
              </span>
              <a
                v-if="show.tickets"
                class="show-action"
                :href="show.tickets"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="t.live.ticketsLabel(show)"
              >
                {{ t.live.tickets }} <span aria-hidden="true">↗</span>
              </a>
              <span v-else class="show-action is-none">—</span>
            </li>
          </ol>
          <p v-else class="show-empty">{{ t.live.empty }}</p>

          <template v-if="pastShows.length">
            <p class="kicker show-past-kicker">{{ t.live.recent }}</p>
            <ol class="show-list is-past">
              <li v-for="show in pastShows" :key="show.date + show.venue" class="show-row">
                <time class="show-date" :datetime="show.date" :title="show.full">
                  <span class="show-day">{{ show.day }}</span>
                  <span class="show-month">{{ show.month }} {{ show.year }}</span>
                </time>
                <span class="show-place">
                  <span class="show-venue">{{ show.venue }}</span>
                  <span class="show-meta">{{ show.city }}, {{ show.country }}</span>
                </span>
                <span class="show-with">
                  <span class="show-label-inline">{{ t.live.labels.with }}</span>
                  <strong>{{ show.with }}</strong>
                  <span v-if="show.tour" class="show-meta"><em>{{ show.tour }}</em> {{ t.live.tour }}</span>
                </span>
                <span class="show-action is-none">{{ t.live.played }}</span>
              </li>
            </ol>
          </template>
        </div>
      </section>

      <!-- 5. Coaching: cream with liquid glass cards -->
      <section id="coaching" class="zone zone-cream">
        <div class="zone-inner">
          <header class="edit-head">
            <h2 class="edit-title">{{ t.coaching.title[0] }}<em>{{ t.coaching.title[1] }}</em>{{ t.coaching.title[2] }}</h2>
            <div class="edit-aside">
              <p class="kicker">{{ t.coaching.kicker }}</p>
              <p>{{ t.coaching.intro }}</p>
            </div>
          </header>

          <ol class="coach-grid">
            <li v-for="(item, index) in t.coaching.items" :key="index" class="liquid-card coach-card">
              <span class="coach-no">{{ pad(index + 1) }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </li>
          </ol>
          <a class="mag-btn coach-cta" href="#contact">{{ t.coaching.cta }}</a>
        </div>
      </section>

      <!-- 6. Education: blush banner -->
      <section id="education" class="zone zone-glow">
        <div class="zone-inner">
          <div class="glow-banner">
            <div class="glow-copy">
              <p class="kicker">{{ t.education.kicker }}</p>
              <h2 class="glow-title">{{ t.education.title[0] }}<br />{{ t.education.title[1] }}</h2>
              <p class="glow-text">{{ t.education.intro }}</p>
              <a class="mag-btn" href="#contact">{{ t.education.cta }}</a>
            </div>
            <ul class="glow-list">
              <li v-for="(item, index) in t.education.items" :key="index">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 7. Back cover: deep wine -->
      <section id="contact" class="zone zone-red">
        <img class="cta-portrait" src="/images/alex_haak.jpeg" alt="" loading="lazy" />
        <div class="zone-inner cta-content">
          <p class="kicker">{{ t.contact.kicker }}</p>
          <h2 class="cta-title">{{ t.contact.title[0] }}<em>{{ t.contact.title[1] }}</em>{{ t.contact.title[2] }}</h2>
          <p class="cta-body">{{ t.contact.body }}</p>
          <a class="mag-btn mag-btn-cream mag-btn-lg" :href="`mailto:${contact.email}`">{{ t.nav.workWithMe }}</a>
          <div class="cta-links">
            <a
              v-for="link in contact.links"
              :key="link.href"
              class="cta-pill"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }} ↗
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="mag-footer">
      <div class="zone-inner">
        <p class="footer-mark">Alex Haak</p>
        <div class="footer-row">
          <nav class="footer-nav" :aria-label="t.nav.footer">
            <a href="#about">{{ t.nav.about }}</a>
            <a href="#music">{{ t.nav.music }}</a>
            <a href="#productions">{{ t.nav.productions }}</a>
            <a href="#live">{{ t.nav.live }}</a>
            <a href="#coaching">{{ t.nav.coaching }}</a>
            <a href="#education">{{ t.nav.education }}</a>
            <a href="#contact">{{ t.nav.contact }}</a>
          </nav>
          <p>© {{ new Date().getFullYear() }} Alex Haak · {{ t.footer.tagline }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>
