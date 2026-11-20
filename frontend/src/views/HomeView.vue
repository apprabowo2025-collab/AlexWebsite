<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import content from '../data/siteContent.js'
import GlassHeader from '../components/home/GlassHeader.vue'
import ProductionsGrid from '../components/home/ProductionsGrid.vue'
import '../assets/css/magazine-home.css'

const { cover, shows, marquee, music, credits, coaching, education, contact } = content

// Turns 1 into "01"
function pad(value) {
  return String(value).padStart(2, '0')
}

// ---------- Tour dates ----------
// Today's date as "YYYY-MM-DD" in the visitor's time zone, so a show stays listed all day.
const now = new Date()
const today = [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join('-')

// Adds the day, month and long date used by the big-number rows.
function withDates(show) {
  const [year, month, day] = show.date.split('-').map(Number)
  const when = new Date(year, month - 1, day)
  return {
    ...show,
    day: pad(day),
    month: when.toLocaleDateString('en-GB', { month: 'short' }),
    year,
    weekday: when.toLocaleDateString('en-GB', { weekday: 'long' }),
    full: when.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  }
}

// Upcoming shows, soonest first
const upcomingShows = shows
  .filter((show) => show.date >= today)
  .sort((a, b) => a.date.localeCompare(b.date))
  .map(withDates)
const nextShow = upcomingShows[0]

// The last four shows already played, most recent first
const pastShows = shows
  .filter((show) => show.date < today)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 4)
  .map(withDates)

// Everyone Alex is (or was recently) on stage with, for the intro line
const bandmates = [...new Set([...upcomingShows, ...pastShows].map((show) => show.with))]

// ---------- Cover carousel ----------
// slide = the number of the photo showing now
const slide = ref(0)
const current = computed(() => cover[slide.value])
// The next two photos, shown as numbered thumbnails on the cover
const upcoming = computed(() =>
  [1, 2].map((step) => {
    const index = (slide.value + step) % cover.length
    return { index, item: cover[index] }
  }),
)

let timer = null
const paused = ref(false)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function startTimer() {
  stopTimer()
  if (reduceMotion) return
  timer = window.setInterval(() => {
    if (!paused.value) slide.value = (slide.value + 1) % cover.length
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
        <p class="cover-side" aria-hidden="true">Issue 01 — Music &amp; Mentorship</p>

        <h1 class="cover-line cover-line-1">Alex Haak</h1>
        <p class="cover-line cover-line-2" aria-hidden="true">Live.</p>
        <p class="cover-ft">
          ft. <em>{{ current.feature }}</em>
          <a class="cover-ft-link" href="#music">Hear the work ↗</a>
        </p>

        <!-- Carousel: photos stacked in the arch, the active one fades in -->
        <div
          class="cover-stage"
          role="region"
          aria-roledescription="carousel"
          aria-label="Photos"
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
              :aria-label="`Show photo ${index + 1}: ${item.label}`"
              :aria-current="index === slide"
              @click="goTo(index)"
            ></button>
          </div>
        </div>

        <div class="cover-copy">
          <a v-if="nextShow" class="next-stop" href="#live">
            <span class="next-stop-dot" aria-hidden="true"></span>
            Next stop · {{ nextShow.city }} · {{ Number(nextShow.day) }} {{ nextShow.month }}
          </a>
          <p class="issue-chip"><span class="dot-live"></span>Touring musician · Producer · Coach</p>
          <p class="cover-body">
            Freelance musician on stage and in the studio — touring, production and writing, plus teaching,
            funding proposals and artist business coaching.
          </p>
          <p class="cover-booking">Now taking on <em>songwriting sessions</em></p>
          <div class="cover-actions">
            <a class="mag-btn" href="#contact">Work with me</a>
            <a class="glass-btn" href="#music">Listen / Watch</a>
          </div>
        </div>

        <!-- Numbered thumbnails of the next two photos; the second sits over the red panel -->
        <div class="cover-thumbs">
          <button
            v-for="next in upcoming"
            :key="next.index"
            type="button"
            class="cover-thumb"
            :aria-label="`Show photo ${next.index + 1}: ${next.item.label}`"
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
      <section class="marquee" aria-label="Services">
        <!-- The list is written twice so it can scroll in a seamless loop;
             the second copy is hidden from screen readers. -->
        <div class="marquee-row">
          <span
            v-for="(item, index) in [...marquee, ...marquee]"
            :key="index"
            :aria-hidden="index >= marquee.length ? 'true' : undefined"
          >
            {{ item }}<i aria-hidden="true">✦</i>
          </span>
        </div>
      </section>

      <!-- 3. About: editor's letter on white -->
      <section id="about" class="zone zone-white">
        <div class="zone-inner about">
          <div class="about-head">
            <p class="kicker">From the desk — About</p>
            <h2 class="about-title">
              A freelance <em>touring and studio</em> musician who also teaches and coaches artists.
            </h2>
          </div>
          <div class="about-body">
            <p>
              <span class="drop-cap">I</span> play live with artists and bands on tour, produce and write in
              the studio, and work alongside that on teaching and music business strategy. Being a working musician helps me
              understand the creative process, while my project work helps artists turn ideas into
              structured outcomes.
            </p>
            <p>
              Whether it is building a song, shaping an artist profile, preparing a funding proposal or
              running a workshop, my focus is helping creative people move from idea to execution.
            </p>
            <p class="about-sign">— Alex</p>
          </div>
        </div>
      </section>

      <!-- 4. Music: black with grid -->
      <section id="music" class="zone zone-black">
        <div class="zone-inner">
          <header class="edit-head">
            <h2 class="edit-title">Music &amp; <em>performance</em></h2>
            <div class="edit-aside">
              <p class="kicker">01 — Music</p>
              <p>Touring and live work, studio production and songwriting — as a freelance musician for other artists.</p>
            </div>
          </header>

          <div class="music-grid">
            <article v-for="(item, index) in music" :key="item.title" class="dark-glass music-card">
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
              <p class="kicker">Contents</p>
              <h3 class="credits-title">Selected <em>credits</em></h3>
              <p>Releases, tours and writing deals — the full list is in the resume.</p>
              <a class="mag-btn mag-btn-cream" href="/files/resume.pdf" download>Download resume</a>
            </div>
            <ol class="credits-list">
              <li v-for="credit in credits" :key="credit.title">
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
            <h2 class="edit-title">On <em>tour</em></h2>
            <div class="edit-aside">
              <p class="kicker">Live — Freelance touring musician</p>
              <p v-if="bandmates.length">
                On stage as a hired musician for other artists — most recently with {{ bandmates.join(' and ') }}.
              </p>
              <p v-else>On stage as a hired musician for other artists.</p>
            </div>
          </header>

          <div class="show-labels" aria-hidden="true">
            <span>Date</span><span>Location</span><span>Touring with</span><span>Tickets</span>
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
                  <span v-if="index === 0" class="show-next">Next</span>
                </span>
                <span class="show-meta">
                  {{ show.city }}, {{ show.country }} · {{ show.weekday }}<template v-if="show.doors"> · Doors {{ show.doors }}</template>
                </span>
              </span>
              <span class="show-with">
                <span class="show-label-inline">Touring with</span>
                <strong>{{ show.with }}</strong>
                <span v-if="show.tour" class="show-meta"><em>{{ show.tour }}</em> tour</span>
              </span>
              <a
                v-if="show.tickets"
                class="show-action"
                :href="show.tickets"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Tickets for ${show.with} at ${show.venue}, ${show.city}, ${show.full} (opens in a new tab)`"
              >
                Tickets <span aria-hidden="true">↗</span>
              </a>
              <span v-else class="show-action is-none">—</span>
            </li>
          </ol>
          <p v-else class="show-empty">No upcoming shows right now. New dates will appear here first.</p>

          <template v-if="pastShows.length">
            <p class="kicker show-past-kicker">Recently on stage</p>
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
                  <span class="show-label-inline">Touring with</span>
                  <strong>{{ show.with }}</strong>
                  <span v-if="show.tour" class="show-meta"><em>{{ show.tour }}</em> tour</span>
                </span>
                <span class="show-action is-none">Played</span>
              </li>
            </ol>
          </template>
        </div>
      </section>

      <!-- 5. Coaching: cream with liquid glass cards -->
      <section id="coaching" class="zone zone-cream">
        <div class="zone-inner">
          <header class="edit-head">
            <h2 class="edit-title">Artist <em>business</em> coaching</h2>
            <div class="edit-aside">
              <p class="kicker">02 — Coaching</p>
              <p>Practical guidance for emerging artists: positioning, release planning, live strategy, content direction, bios and proposals.</p>
            </div>
          </header>

          <ol class="coach-grid">
            <li v-for="(item, index) in coaching" :key="item.title" class="liquid-card coach-card">
              <span class="coach-no">{{ pad(index + 1) }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </li>
          </ol>
          <a class="mag-btn coach-cta" href="#contact">Enquire about coaching</a>
        </div>
      </section>

      <!-- 6. Education: blush banner -->
      <section id="education" class="zone zone-glow">
        <div class="zone-inner">
          <div class="glow-banner">
            <div class="glow-copy">
              <p class="kicker">03 — Education</p>
              <h2 class="glow-title">Teach the<br />Craft.</h2>
              <p class="glow-text">
                Workshops and learning programmes for individuals, schools, youth programmes, arts
                organisations and community groups.
              </p>
              <a class="mag-btn" href="#contact">Book a workshop</a>
            </div>
            <ul class="glow-list">
              <li v-for="item in education" :key="item.title">
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
          <p class="kicker">04 — Contact</p>
          <h2 class="cta-title">Let’s build something <em>in music.</em></h2>
          <p class="cta-body">
            Writing, production, teaching, funding proposals, artist business coaching, collaborations or
            music-related projects.
          </p>
          <a class="mag-btn mag-btn-cream mag-btn-lg" :href="`mailto:${contact.email}`">Work with me</a>
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
          <nav class="footer-nav" aria-label="Footer">
            <a href="#about">About</a>
            <a href="#music">Music</a>
            <a href="#productions">Productions</a>
            <a href="#live">Live</a>
            <a href="#coaching">Coaching</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>
          <p>© {{ new Date().getFullYear() }} Alex Haak · Touring musician · Producer · Writer · Coach</p>
        </div>
      </div>
    </footer>
  </div>
</template>
