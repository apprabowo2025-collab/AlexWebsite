<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import releases, { playlistUrl } from '../../data/productions.js'

function pad(value) {
  return String(value).padStart(2, '0')
}

const previewUrl = (id) => `https://p.scdn.co/mp3-preview/${id}`
const spotifyUrl = (id) => `https://open.spotify.com/track/${id}`

// Featured releases first (large squares), then everything else in playlist order
const ordered = [...releases.filter((r) => r.featured), ...releases.filter((r) => !r.featured)]

const trackCount = releases.reduce((sum, r) => sum + r.tracks.length, 0)
const artistCount = new Set(
  releases.flatMap((r) => r.tracks.flatMap((t) => t.artist.split(',').map((name) => name.trim()))),
).size

// On phones only the first 11 tiles show until "Show all" is pressed
const expanded = ref(false)

// ---------- Previews: one audio element, so only one plays at a time ----------
const audio = new Audio()
audio.preload = 'none'
const playing = ref(null) // { release, track } indexes into `ordered`
const progress = ref(0)

const isPlaying = (ri, ti = null) =>
  playing.value?.release === ri && (ti === null || playing.value.track === ti)

function stop() {
  audio.pause()
  playing.value = null
  progress.value = 0
}

function toggle(ri, ti = 0) {
  if (isPlaying(ri, ti)) return stop()
  audio.src = previewUrl(ordered[ri].tracks[ti].preview)
  progress.value = 0
  playing.value = { release: ri, track: ti }
  audio.play().catch(stop)
}

audio.addEventListener('timeupdate', () => {
  if (audio.duration) progress.value = audio.currentTime / audio.duration
})
audio.addEventListener('ended', stop)
audio.addEventListener('error', stop)
onBeforeUnmount(stop)

// ---------- Tracklist for releases with more than one song ----------
const dialog = ref(null)
const openIndex = ref(null)
const openRelease = computed(() => (openIndex.value === null ? null : ordered[openIndex.value]))

function openTracklist(ri) {
  openIndex.value = ri
  dialog.value.showModal()
}

function closeTracklist() {
  dialog.value.close()
}

// Clicking the dark backdrop around the panel closes it
function onDialogClick(event) {
  if (event.target === dialog.value) closeTracklist()
}
</script>

<template>
  <header class="edit-head">
    <h2 class="edit-title">In the <em>studio</em></h2>
    <div class="edit-aside">
      <p class="kicker">Productions</p>
      <p>Records Alex produced for other artists — from remixes for R3HAB and Arcando to singles, EPs and albums.</p>
      <dl class="prod-stats">
        <div><dt>Tracks</dt><dd>{{ trackCount }}</dd></div>
        <div><dt>Releases</dt><dd>{{ releases.length }}</dd></div>
        <div><dt>Artists</dt><dd>{{ artistCount }}</dd></div>
      </dl>
    </div>
  </header>

  <ol class="prod-grid" :class="{ 'is-expanded': expanded }">
    <li
      v-for="(release, ri) in ordered"
      :key="release.cover"
      class="prod-tile"
      :class="{ 'is-feature': release.featured, 'is-playing': isPlaying(ri) }"
    >
      <span class="prod-art">
        <img :src="release.cover" :alt="`Cover of ${release.title} by ${release.artist}`" loading="lazy" />
      </span>
      <span class="prod-no" aria-hidden="true">{{ pad(ri + 1) }}</span>

      <button
        v-if="release.tracks.length > 1"
        type="button"
        class="prod-count"
        :aria-label="`Show all ${release.tracks.length} tracks of ${release.title}`"
        @click="openTracklist(ri)"
      >
        {{ release.tracks.length }} tracks
      </button>

      <div class="prod-meta">
        <p class="prod-role">{{ release.role }}</p>
        <h3 class="prod-title">
          <a :href="spotifyUrl(release.tracks[0].spotify)" target="_blank" rel="noopener noreferrer">
            {{ release.title }}
          </a>
        </h3>
        <p class="prod-artist">{{ release.artist }}</p>
      </div>

      <button
        type="button"
        class="prod-play"
        :aria-label="`${isPlaying(ri) ? 'Stop' : 'Play'} preview of ${release.tracks[0].title}`"
        :aria-pressed="isPlaying(ri)"
        @click="toggle(ri)"
      >
        <svg v-if="isPlaying(ri)" viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0h4v14H0zM8 0h4v14H8z" /></svg>
        <svg v-else viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0l12 7-12 7z" /></svg>
      </button>
      <span class="prod-progress" aria-hidden="true">
        <i :style="{ width: isPlaying(ri) ? `${progress * 100}%` : '0%' }"></i>
      </span>
    </li>
  </ol>

  <div class="prod-foot">
    <p>Press play on a cover for a 30-second preview. Titles open the track on Spotify.</p>
    <div class="prod-foot-actions">
      <button v-if="!expanded" type="button" class="mag-btn mag-btn-cream prod-show-all" @click="expanded = true">
        Show all {{ releases.length }}
      </button>
      <a class="mag-btn mag-btn-cream" :href="playlistUrl" target="_blank" rel="noopener noreferrer">
        Full playlist on Spotify ↗
      </a>
    </div>
  </div>

  <dialog ref="dialog" class="prod-dialog" aria-labelledby="prod-dialog-title" @click="onDialogClick" @close="openIndex = null">
    <div v-if="openRelease" class="prod-dialog-body">
      <button type="button" class="prod-dialog-close" aria-label="Close tracklist" @click="closeTracklist">✕</button>
      <img :src="openRelease.cover" alt="" />
      <p class="kicker">{{ openRelease.tracks.length }} tracks · {{ openRelease.role }}</p>
      <h3 id="prod-dialog-title">{{ openRelease.title }}</h3>
      <p class="prod-dialog-artist">{{ openRelease.artist }}</p>
      <ol class="prod-tracks">
        <li v-for="(track, ti) in openRelease.tracks" :key="track.spotify">
          <span class="prod-track-no">{{ pad(ti + 1) }}</span>
          <a :href="spotifyUrl(track.spotify)" target="_blank" rel="noopener noreferrer">{{ track.title }}</a>
          <button
            type="button"
            class="prod-track-play"
            :class="{ 'is-playing': isPlaying(openIndex, ti) }"
            :aria-label="`${isPlaying(openIndex, ti) ? 'Stop' : 'Play'} preview of ${track.title}`"
            :aria-pressed="isPlaying(openIndex, ti)"
            @click="toggle(openIndex, ti)"
          >
            <svg v-if="isPlaying(openIndex, ti)" viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0h4v14H0zM8 0h4v14H8z" /></svg>
            <svg v-else viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0l12 7-12 7z" /></svg>
          </button>
        </li>
      </ol>
    </div>
  </dialog>
</template>
