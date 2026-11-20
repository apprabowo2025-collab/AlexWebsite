// All the words and lists on the home page, kept in one place so the page itself stays short.
// The productions grid has its own file: productions.js.

export default {
  // Cover carousel: one slide per photo. "feature" is the "ft." line, "note" the small frosted card.
  cover: [
    {
      image: '/images/alex_haak.jpeg',
      alt: 'Alex Haak performing live with an electric guitar',
      position: '50% 20%',
      label: 'Live',
      feature: 'UK Tour, One Revolution',
      note: 'On stage with One Revolution Reggae Band, UK tour.',
    },
    {
      image: '/images/tour-photo.webp',
      alt: 'On stage at the Evenings Are For Falling In Love tour, under blue stage light',
      position: '50% 12%',
      label: 'Evenings Are For Falling In Love tour',
      feature: 'Live in Amsterdam & Rotterdam',
      note: 'On stage in Amsterdam and Rotterdam — live dates below.',
    },
    {
      image: '/images/studio-session.webp',
      alt: 'Alex Haak playing guitar in the studio, surrounded by keyboards and monitors',
      position: '30% 35%',
      label: 'Studio',
      feature: 'In the studio',
      note: 'Writing, arranging and producing — guitar, synths and session work.',
    },
  ],

  // Live dates, one row each: date // location // touring with // tickets.
  // "with" is the artist Alex is playing for; "tour" is optional.
  // A show moves from "Upcoming" to "Recently on stage" the day after it happens,
  // and the cover's "Next stop" tag always points at the next one.
  // Add a tickets URL to show a ticket link (only on upcoming shows).
  shows: [
    {
      date: '2026-11-19',
      venue: 'Bitterzoet',
      city: 'Amsterdam',
      country: 'NL',
      doors: '19:30',
      with: 'Charlot',
      tour: 'Evenings Are For Falling In Love',
      tickets: 'https://www.paradiso.nl/programma/charlot/2889499',
    },
    {
      date: '2026-11-20',
      venue: 'Rotown',
      city: 'Rotterdam',
      country: 'NL',
      doors: '21:00',
      with: 'Charlot',
      tour: 'Evenings Are For Falling In Love',
      tickets: 'https://www.rotown.nl/agenda/charlot-1/',
    },
  ],

  marquee: ['Touring', 'Session work', 'Production', 'Songwriting', 'Artist coaching', 'Workshops', 'Funding proposals'],

  music: [
    {
      title: 'Touring & live',
      type: 'Freelance musician',
      description: 'Live performance, rehearsals and live arrangements for artists and bands on tour, from the UK to the Netherlands.',
      image: '/images/tour-photo.webp',
      position: '50% 15%',
      link: '#live',
      linkLabel: 'See live dates',
    },
    {
      title: 'Production',
      type: 'Studio',
      description: '44 tracks for 26 artists — production, arrangement, demos and studio collaboration.',
      image: '/images/studio-session.webp',
      position: '50% 40%',
      link: '#productions',
      linkLabel: 'Hear the productions',
    },
    {
      title: 'Songwriting',
      type: 'Writing',
      description: 'Signed songwriter at AT Publishing, writing with and for other artists.',
      image: '/images/alex_haak.jpeg',
      position: '50% 25%',
      link: '#contact',
      linkLabel: 'Book a session',
    },
  ],

  credits: [
    {
      year: '2023–24',
      title: 'Writing and production for CHARLOT',
      role: 'Songwriter / Producer / Arranger',
      description: 'Writing, arrangement and production across the band’s EP and recorded material.',
    },
    {
      year: '2023',
      title: 'UK Tour — One Revolution Reggae Band',
      role: 'Touring Musician / Band Member',
      description: 'Live arrangements, rehearsals and stage performance across the UK tour.',
    },
    {
      year: '2022',
      title: 'Signed as a songwriter at AT PUBLISHING',
      role: 'Songwriter',
      description: 'Original writing and creative material for music projects.',
    },
  ],

  coaching: [
    { title: 'Artist Positioning', text: 'Clarify identity, audience, story and creative direction.' },
    { title: 'Release Planning', text: 'Plan singles, campaigns, timelines, assets and rollout strategy.' },
    { title: 'Funding Proposals', text: 'Shape project ideas into structured grant or sponsorship proposals.' },
    { title: 'Music Business Basics', text: 'Understand goals, opportunities, income streams and next steps.' },
  ],

  education: [
    { title: 'Songwriting Workshops', text: 'Lyrics, melody, structure, storytelling and creative confidence.' },
    { title: 'Production Lessons', text: 'Demos, arrangement, recording and production workflow.' },
    { title: 'Performance Coaching', text: 'Stage presence, live arrangement, rehearsal planning and preparation.' },
    { title: 'School & Community', text: 'Custom workshops for schools, youth groups and arts organisations.' },
  ],

  contact: {
    email: 'Alexhaak@fastmail.fm',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/alexandrh/' },
      { label: 'Spotify', href: 'https://open.spotify.com/playlist/26lPrnGUkfW2sEfDr6IWiK' },
    ],
  },
}
