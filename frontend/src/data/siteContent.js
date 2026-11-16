// All the words and lists on the home page, kept in one place so the page itself stays short.
// music and credits match backend/data/music.json and credit.json.

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
      feature: 'Evenings Are For Falling In Love tour',
      note: 'Two November nights in Amsterdam and Rotterdam — dates below.',
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

  // Tour dates. Shows drop off the page the day after they happen, and the cover's
  // "Next stop" tag always points at the next one. Add a tickets URL to make a row a link.
  tour: {
    name: 'Evenings Are For Falling In Love',
    artist: 'Charlot',
    shows: [
      {
        date: '2026-11-19',
        venue: 'Bitterzoet',
        city: 'Amsterdam',
        country: 'NL',
        doors: '19:30',
        tickets: 'https://www.paradiso.nl/programma/charlot/2889499',
      },
      {
        date: '2026-11-20',
        venue: 'Rotown',
        city: 'Rotterdam',
        country: 'NL',
        doors: '21:00',
        tickets: 'https://www.rotown.nl/agenda/charlot-1/',
      },
    ],
  },

  marquee: ['Songwriting', 'Production', 'Live performance', 'Artist coaching', 'Workshops', 'Funding proposals'],

  music: [
    {
      title: 'Charlot',
      type: 'Band',
      description: 'Original music, live shows, collaborative songwriting and performance work.',
      image: '/images/tour-photo.webp',
      position: '50% 15%',
      link: 'https://open.spotify.com/artist/4jwyHfEELByxcUm6JEP5yC?si=tclIKwcQS0-UmTr83fVD2A',
      linkLabel: 'Listen on Spotify',
    },
    {
      title: 'Live Sessions',
      type: 'Performance',
      description: 'Live recordings, performance clips and stage work from recent shows.',
      image: '/images/alex_haak.jpeg',
      position: '50% 25%',
      link: 'https://www.youtube.com/@charlotsmusic',
      linkLabel: 'Watch on YouTube',
    },
    {
      title: 'Production Work',
      type: 'Production',
      description: 'Songwriting, arrangement, demos, production direction and studio collaboration.',
      image: '/images/studio-session.webp',
      position: '50% 40%',
      link: '#contact',
      linkLabel: 'Start a project',
    },
  ],

  credits: [
    {
      year: '2024',
      title: 'Production and arrangement for CHARLOT',
      role: 'Producer / Arranger',
      description: 'Production direction, arrangement and creative development for the band’s recorded material.',
    },
    {
      year: '2023',
      title: 'UK Tour — One Revolution Reggae Band',
      role: 'Touring Musician / Band Member',
      description: 'Live arrangements, rehearsals and stage performance across the UK tour.',
    },
    {
      year: '2023',
      title: 'Released CHARLOT EP',
      role: 'Songwriter / Performer / Producer',
      description: 'Writing, recording, production and release of the band’s EP.',
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
      { label: 'SoundCloud', href: 'https://soundcloud.com/alexander-haak' },
    ],
  },
}
