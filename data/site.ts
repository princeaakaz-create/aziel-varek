interface JournalPost {
  title: string;
  category: string;
  date: string;
  excerpt: string;
}

export const site = {
  name: 'Aziel Varek',
  tagline: 'Stories across worlds.',
  email: 'princeaakaz@gmail.com',
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/aziel_varek/' }
  ],
  nav: [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Books', href: '#books' },
    { label: 'Worlds', href: '#worlds' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' }
  ],
  intro: {
    heading: 'I write stories that belong to more than one world.',
    body: 'My work moves between science fiction, romance, fantasy, adventure, and fairytale — different worlds bound by the same belief: a story is only as powerful as the feeling it leaves behind.'
  },
  about: {
    heading: 'About Aziel',
    body: [
      'Aziel Varek is a fiction writer drawn to the places where imagination has no boundaries. His work moves between science fiction, romance, fantasy, adventure, and fairytale — exploring unfamiliar worlds, extraordinary circumstances, and the quiet human emotions that give them meaning.',
      'He is fascinated by the possibilities that exist beyond the ordinary: worlds shaped by wonder, journeys born from impossible questions, characters searching for meaning, and connections that endure when everything around them changes. Rather than being bound to a single genre, Aziel writes wherever an idea leads him — toward distant futures, enchanted realms, forgotten kingdoms, or places that exist only for as long as someone is willing to imagine them.',
      'At the heart of his writing is a simple belief: a world is only as powerful as the feeling it leaves behind. Aziel Varek is building stories for readers who still believe there are places beyond the page worth discovering.'
    ],
    linkLabel: 'More about me',
    linkHref: '#'
  },
  journal: [] as JournalPost[]
};
