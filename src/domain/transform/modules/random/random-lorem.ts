const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'ac', 'Integer', 'libero',
  'felis', 'massa', 'justo', 'odio', 'cursus', 'metus', 'vitae', 'ultricies',
  'praesent', 'lectus', 'tortor', 'condimentum', 'lacinia', 'quis', 'vel',
  'eros', 'donec', 'odio', 'justo', 'sollicitudin', 'tellus', 'cras', 'blandit',
  'mi', 'nisi', 'porta', 'a', 'lacinia', 'sapien', 'quisque', 'porta', 'nisl',
  'eget', 'eleifend', 'quam', 'donec', 'pellentesque', 'diam', 'quis', 'arcu',
  'curabitur', 'aliquam', 'quam', 'quis', 'nibh', 'cras', 'suscipit', 'massa',
  'at', 'zara', 'semper', 'interdum', 'malesuada', 'fames', 'ac', 'ante',
  'ipsum', 'primis', 'faucibus', 'orci', 'luctus', 'ultrices', 'posuere', 'cubilia',
  'curae', 'mauris', 'viverra', 'diam', 'vitae', 'quam', 'hendrerit', 'lectus',
  'morbi', 'quis', 'eros', 'nam', 'tincidunt', 'lacus', 'nunc', 'molestie',
  'massa', 'sed', 'elementum', 'tempus', 'semper', 'est', 'ligula', 'vitae',
  'risus', 'nulla', 'facilisi', 'cras', 'fermentum', 'odio', 'feugiat', 'pretium',
  'libero', 'nunc', 'hendrerit', 'ante', 'Suspendisse', 'potenti', 'sed',
  'leo', 'eget', 'magna', 'semper', 'vitae', 'porta', 'lorem', 'ipsum',
];

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateWords(count: number): string {
  const words = getRandomElements(LOREM_WORDS, count);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ');
}

const CLASSIC_START = 'Lorem ipsum dolor sit amet';

export interface LoremOptions {
  paragraphs: number;
  sentencesPerParagraph: number;
  wordsPerSentence: number;
  startWithClassic?: boolean;
}

export function generateLorem(options: Partial<LoremOptions> = {}): string {
  const {
    paragraphs = 1,
    sentencesPerParagraph = 3,
    wordsPerSentence = 8,
    startWithClassic = false,
  } = options;

  const paragraphsArr: string[] = [];

  for (let p = 0; p < paragraphs; p++) {
    const sentences: string[] = [];
    for (let i = 0; i < sentencesPerParagraph; i++) {
      let sentence: string;
      if (p === 0 && i === 0 && startWithClassic) {
        const remainingWords = wordsPerSentence - CLASSIC_START.split(' ').length;
        if (remainingWords > 0) {
          const extraWords = getRandomElements(LOREM_WORDS, remainingWords).join(' ');
          sentence = CLASSIC_START + ' ' + extraWords;
        } else {
          sentence = CLASSIC_START;
        }
      } else {
        sentence = generateWords(wordsPerSentence);
      }
      sentence = sentence.replace(/\.$/, '') + '.';
      if (p === 0 && i === 0 && startWithClassic) {
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      }
      sentences.push(sentence);
    }
    const paragraph = sentences.join(' ');
    paragraphsArr.push(paragraph);
  }

  return paragraphsArr.join('\n\n');
}