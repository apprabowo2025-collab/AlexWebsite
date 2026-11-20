// All the words and lists on the home page, in English (en) and Dutch (nl).
// Both languages have the same shape: when you change one, change the other to match.
// Titles written as ['plain ', 'italic', ' plain'] show the middle part in italics.
// Live dates and contact links are shared by both languages (bottom of the file).
// The productions grid has its own file: productions.js.

const en = {
  meta: {
    title: 'Alex Haak — Touring musician, Producer, Writer, Coach',
  },

  nav: {
    about: 'About',
    music: 'Music',
    productions: 'Productions',
    live: 'Live',
    coaching: 'Coaching',
    education: 'Education',
    contact: 'Contact',
    menu: 'Menu',
    main: 'Main',
    footer: 'Footer',
    workWithMe: 'Work with me',
    language: 'Language',
  },

  // Cover carousel: one slide per photo. "feature" is the "ft." line, "note" the small frosted card.
  cover: {
    side: 'Issue 01 — Music & Mentorship',
    hearTheWork: 'Hear the work ↗',
    photos: 'Photos',
    showPhoto: (number, label) => `Show photo ${number}: ${label}`,
    nextStop: 'Next stop',
    chip: 'Touring musician · Producer · Coach',
    body: 'Freelance musician on stage and in the studio — touring, production and writing, plus teaching, funding proposals and artist business coaching.',
    booking: ['Now taking on ', 'songwriting sessions', ''],
    listen: 'Listen / Watch',
    slides: [
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
  },

  servicesLabel: 'Services',
  marquee: ['Touring', 'Session work', 'Production', 'Songwriting', 'Artist coaching', 'Workshops', 'Funding proposals'],

  about: {
    kicker: 'From the desk — About',
    title: ['A freelance ', 'touring and studio', ' musician who also teaches and coaches artists.'],
    // The first letter becomes the large drop cap
    paragraphs: [
      'I play live with artists and bands on tour, produce and write in the studio, and work alongside that on teaching and music business strategy. Being a working musician helps me understand the creative process, while my project work helps artists turn ideas into structured outcomes.',
      'Whether it is building a song, shaping an artist profile, preparing a funding proposal or running a workshop, my focus is helping creative people move from idea to execution.',
    ],
  },

  music: {
    title: ['Music & ', 'performance', ''],
    kicker: '01 — Music',
    intro: 'Touring and live work, studio production and songwriting — as a freelance musician for other artists.',
    cards: [
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
  },

  credits: {
    kicker: 'Contents',
    title: ['Selected ', 'credits', ''],
    intro: 'Releases, tours and writing deals — the full list is in the resume.',
    download: 'Download resume',
    items: [
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
  },

  productions: {
    title: ['In the ', 'studio', ''],
    kicker: 'Productions',
    intro: 'Records Alex produced for other artists — from remixes for R3HAB and Arcando to singles, EPs and albums.',
    stats: { tracks: 'Tracks', releases: 'Releases', artists: 'Artists' },
    // Shown above every title unless a release in productions.js has its own role
    role: 'Produced by Alex Haak',
    tracks: (count) => `${count} tracks`,
    showTracks: (count, title) => `Show all ${count} tracks of ${title}`,
    play: (title) => `Play preview of ${title}`,
    stop: (title) => `Stop preview of ${title}`,
    coverAlt: (title, artist) => `Cover of ${title} by ${artist}`,
    footNote: 'Press play on a cover for a 30-second preview. Titles open the track on Spotify.',
    showAll: (count) => `Show all ${count}`,
    playlist: 'Full playlist on Spotify ↗',
    close: 'Close tracklist',
  },

  live: {
    title: ['On ', 'tour', ''],
    kicker: 'Live — Freelance touring musician',
    intro: (names) =>
      names.length
        ? `On stage as a hired musician for other artists — most recently with ${names.join(' and ')}.`
        : 'On stage as a hired musician for other artists.',
    labels: { date: 'Date', location: 'Location', with: 'Touring with', tickets: 'Tickets' },
    next: 'Next',
    doors: 'Doors',
    tour: 'tour',
    tickets: 'Tickets',
    ticketsLabel: (show) => `Tickets for ${show.with} at ${show.venue}, ${show.city}, ${show.full} (opens in a new tab)`,
    empty: 'No upcoming shows right now. New dates will appear here first.',
    recent: 'Recently on stage',
    played: 'Played',
  },

  coaching: {
    title: ['Artist ', 'business', ' coaching'],
    kicker: '02 — Coaching',
    intro: 'Practical guidance for emerging artists: positioning, release planning, live strategy, content direction, bios and proposals.',
    cta: 'Enquire about coaching',
    items: [
      { title: 'Artist Positioning', text: 'Clarify identity, audience, story and creative direction.' },
      { title: 'Release Planning', text: 'Plan singles, campaigns, timelines, assets and rollout strategy.' },
      { title: 'Funding Proposals', text: 'Shape project ideas into structured grant or sponsorship proposals.' },
      { title: 'Music Business Basics', text: 'Understand goals, opportunities, income streams and next steps.' },
    ],
  },

  education: {
    kicker: '03 — Education',
    title: ['Teach the', 'Craft.'],
    intro: 'Workshops and learning programmes for individuals, schools, youth programmes, arts organisations and community groups.',
    cta: 'Book a workshop',
    items: [
      { title: 'Songwriting Workshops', text: 'Lyrics, melody, structure, storytelling and creative confidence.' },
      { title: 'Production Lessons', text: 'Demos, arrangement, recording and production workflow.' },
      { title: 'Performance Coaching', text: 'Stage presence, live arrangement, rehearsal planning and preparation.' },
      { title: 'School & Community', text: 'Custom workshops for schools, youth groups and arts organisations.' },
    ],
  },

  contact: {
    kicker: '04 — Contact',
    title: ['Let’s build something ', 'in music.', ''],
    body: 'Writing, production, teaching, funding proposals, artist business coaching, collaborations or music-related projects.',
  },

  footer: {
    tagline: 'Touring musician · Producer · Writer · Coach',
  },
}

const nl = {
  meta: {
    title: 'Alex Haak — Tourmuzikant, Producer, Schrijver, Coach',
  },

  nav: {
    about: 'Over',
    music: 'Muziek',
    productions: 'Producties',
    live: 'Live',
    coaching: 'Coaching',
    education: 'Educatie',
    contact: 'Contact',
    menu: 'Menu',
    main: 'Hoofdmenu',
    footer: 'Voettekst',
    workWithMe: 'Samenwerken',
    language: 'Taal',
  },

  cover: {
    side: 'Editie 01 — Muziek & Mentorschap',
    hearTheWork: 'Luister naar het werk ↗',
    photos: 'Foto’s',
    showPhoto: (number, label) => `Toon foto ${number}: ${label}`,
    nextStop: 'Volgende stop',
    chip: 'Tourmuzikant · Producer · Coach',
    body: 'Freelance muzikant op het podium en in de studio — touren, produceren en schrijven, plus lesgeven, subsidieaanvragen en businesscoaching voor artiesten.',
    booking: ['Nu beschikbaar voor ', 'songwritingsessies', ''],
    listen: 'Luister / Kijk',
    slides: [
      {
        image: '/images/alex_haak.jpeg',
        alt: 'Alex Haak live op het podium met een elektrische gitaar',
        position: '50% 20%',
        label: 'Live',
        feature: 'UK-tour, One Revolution',
        note: 'Op het podium met One Revolution Reggae Band, tijdens de UK-tour.',
      },
      {
        image: '/images/tour-photo.webp',
        alt: 'Op het podium tijdens de Evenings Are For Falling In Love-tour, in blauw podiumlicht',
        position: '50% 12%',
        label: 'Evenings Are For Falling In Love-tour',
        feature: 'Live in Amsterdam & Rotterdam',
        note: 'Op het podium in Amsterdam en Rotterdam — speeldata hieronder.',
      },
      {
        image: '/images/studio-session.webp',
        alt: 'Alex Haak speelt gitaar in de studio, omringd door keyboards en monitoren',
        position: '30% 35%',
        label: 'Studio',
        feature: 'In de studio',
        note: 'Schrijven, arrangeren en produceren — gitaar, synths en sessiewerk.',
      },
    ],
  },

  servicesLabel: 'Diensten',
  marquee: ['Touren', 'Sessiewerk', 'Productie', 'Songwriting', 'Artiestencoaching', 'Workshops', 'Subsidieaanvragen'],

  about: {
    kicker: 'Van het bureau — Over',
    title: ['Een freelance ', 'tour- en studiomuzikant', ' die ook lesgeeft en artiesten coacht.'],
    paragraphs: [
      'Ik speel live met artiesten en bands op tour, produceer en schrijf in de studio, en werk daarnaast aan lesgeven en strategie voor de muziekbusiness. Als werkende muzikant begrijp ik het creatieve proces, en met mijn projectwerk help ik artiesten hun ideeën om te zetten in concrete resultaten.',
      'Of het nu gaat om een nummer bouwen, een artiestenprofiel vormgeven, een subsidieaanvraag voorbereiden of een workshop geven: ik help creatieve mensen van idee naar uitvoering.',
    ],
  },

  music: {
    title: ['Muziek & ', 'optreden', ''],
    kicker: '01 — Muziek',
    intro: 'Touren en livewerk, studioproductie en songwriting — als freelance muzikant voor andere artiesten.',
    cards: [
      {
        title: 'Touren & live',
        type: 'Freelance muzikant',
        description: 'Liveoptredens, repetities en live-arrangementen voor artiesten en bands op tour, van het Verenigd Koninkrijk tot Nederland.',
        image: '/images/tour-photo.webp',
        position: '50% 15%',
        link: '#live',
        linkLabel: 'Bekijk de speeldata',
      },
      {
        title: 'Productie',
        type: 'Studio',
        description: '44 tracks voor 26 artiesten — productie, arrangement, demo’s en samenwerking in de studio.',
        image: '/images/studio-session.webp',
        position: '50% 40%',
        link: '#productions',
        linkLabel: 'Luister naar de producties',
      },
      {
        title: 'Songwriting',
        type: 'Schrijven',
        description: 'Songwriter met een contract bij AT Publishing; schrijft met en voor andere artiesten.',
        image: '/images/alex_haak.jpeg',
        position: '50% 25%',
        link: '#contact',
        linkLabel: 'Boek een sessie',
      },
    ],
  },

  credits: {
    kicker: 'Inhoud',
    title: ['Geselecteerde ', 'credits', ''],
    intro: 'Releases, tours en schrijfcontracten — de volledige lijst staat in het cv.',
    download: 'Download cv',
    items: [
      {
        year: '2023–24',
        title: 'Schrijven en productie voor CHARLOT',
        role: 'Songwriter / Producer / Arrangeur',
        description: 'Schrijven, arrangeren en produceren van de EP en ander opgenomen materiaal van de band.',
      },
      {
        year: '2023',
        title: 'UK-tour — One Revolution Reggae Band',
        role: 'Tourmuzikant / Bandlid',
        description: 'Live-arrangementen, repetities en optredens tijdens de tour door het Verenigd Koninkrijk.',
      },
      {
        year: '2022',
        title: 'Getekend als songwriter bij AT PUBLISHING',
        role: 'Songwriter',
        description: 'Origineel schrijfwerk en creatief materiaal voor muziekprojecten.',
      },
    ],
  },

  productions: {
    title: ['In de ', 'studio', ''],
    kicker: 'Producties',
    intro: 'Platen die Alex produceerde voor andere artiesten — van remixes voor R3HAB en Arcando tot singles, EP’s en albums.',
    stats: { tracks: 'Tracks', releases: 'Releases', artists: 'Artiesten' },
    role: 'Geproduceerd door Alex Haak',
    tracks: (count) => `${count} tracks`,
    showTracks: (count, title) => `Toon alle ${count} tracks van ${title}`,
    play: (title) => `Speel fragment van ${title}`,
    stop: (title) => `Stop fragment van ${title}`,
    coverAlt: (title, artist) => `Hoes van ${title} door ${artist}`,
    footNote: 'Druk op play bij een hoes voor een fragment van 30 seconden. Titels openen het nummer op Spotify.',
    showAll: (count) => `Toon alle ${count}`,
    playlist: 'Volledige playlist op Spotify ↗',
    close: 'Sluit de tracklijst',
  },

  live: {
    title: ['Op ', 'tour', ''],
    kicker: 'Live — Freelance tourmuzikant',
    intro: (names) =>
      names.length
        ? `Op het podium als ingehuurde muzikant voor andere artiesten — onlangs nog met ${names.join(' en ')}.`
        : 'Op het podium als ingehuurde muzikant voor andere artiesten.',
    labels: { date: 'Datum', location: 'Locatie', with: 'Op tour met', tickets: 'Tickets' },
    next: 'Volgende',
    doors: 'Deuren',
    tour: 'tour',
    tickets: 'Tickets',
    ticketsLabel: (show) => `Tickets voor ${show.with} in ${show.venue}, ${show.city}, ${show.full} (opent in een nieuw tabblad)`,
    empty: 'Er staan nu geen shows gepland. Nieuwe data verschijnen hier als eerste.',
    recent: 'Onlangs op het podium',
    played: 'Gespeeld',
  },

  coaching: {
    title: ['Coaching voor ', 'artiesten', ''],
    kicker: '02 — Coaching',
    intro: 'Praktische begeleiding voor opkomende artiesten: positionering, releaseplanning, livestrategie, contentrichting, bio’s en voorstellen.',
    cta: 'Vraag naar coaching',
    items: [
      { title: 'Positionering', text: 'Maak je identiteit, publiek, verhaal en creatieve richting helder.' },
      { title: 'Releaseplanning', text: 'Plan singles, campagnes, tijdlijnen, materiaal en de uitrol.' },
      { title: 'Subsidieaanvragen', text: 'Vorm projectideeën om tot gestructureerde subsidie- of sponsorvoorstellen.' },
      { title: 'Basis van de muziekbusiness', text: 'Krijg zicht op doelen, kansen, inkomstenbronnen en volgende stappen.' },
    ],
  },

  education: {
    kicker: '03 — Educatie',
    title: ['Leer het', 'Vak.'],
    intro: 'Workshops en leerprogramma’s voor individuen, scholen, jongerenprogramma’s, kunstorganisaties en buurtgroepen.',
    cta: 'Boek een workshop',
    items: [
      { title: 'Songwritingworkshops', text: 'Teksten, melodie, structuur, verhalen vertellen en creatief zelfvertrouwen.' },
      { title: 'Productielessen', text: 'Demo’s, arrangement, opnemen en een productieworkflow.' },
      { title: 'Podiumcoaching', text: 'Podiumpresentatie, live-arrangement, repetitieplanning en voorbereiding.' },
      { title: 'School & community', text: 'Workshops op maat voor scholen, jongerengroepen en kunstorganisaties.' },
    ],
  },

  contact: {
    kicker: '04 — Contact',
    title: ['Laten we samen iets bouwen ', 'in muziek.', ''],
    body: 'Schrijven, produceren, lesgeven, subsidieaanvragen, businesscoaching voor artiesten, samenwerkingen of andere muziekprojecten.',
  },

  footer: {
    tagline: 'Tourmuzikant · Producer · Schrijver · Coach',
  },
}

export default { en, nl }

// Live dates, one row each: date // location // touring with // tickets.
// "with" is the artist Alex is playing for; "tour" is optional.
// A show moves from the upcoming list to "Recently on stage" the day after it happens,
// and the cover's "Next stop" tag always points at the next one.
// Add a tickets URL to show a ticket link (only on upcoming shows).
export const shows = [
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
]

export const contact = {
  email: 'Alexhaak@fastmail.fm',
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/alexandrh/' },
    { label: 'Spotify', href: 'https://open.spotify.com/playlist/26lPrnGUkfW2sEfDr6IWiK' },
  ],
}
