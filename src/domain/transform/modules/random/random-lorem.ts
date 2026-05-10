const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed',
  'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna',
  'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis',
  'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum',
  'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
  'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
  'est', 'laborum', 'perspiciatis', 'unde', 'omnis', 'iste', 'natus', 'error',
  'voluptatem', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem', 'aperiam',
  'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis', 'quasi',
  'architecto', 'beatae', 'vitae', 'dicta', 'explicabo', 'nemo', 'ipsam',
  'quias', 'aspernatur', 'odit', 'consequuntur', 'magni', 'dolores', 'eos',
  'ratione', 'sequi', 'nesciunt', 'neque', 'porro', 'quisquam', 'numquam',
  'eius', 'modi', 'tempora', 'magnam', 'quaerat', 'minima', 'nostrum',
  'exercitationem', 'corporis', 'suscipit', 'laboriosam', 'aliquid', 'commodi',
  'consequatur', 'autem', 'vel', 'iure', 'nihil', 'molestiae', 'illum', 'quo',
  'atvero', 'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
  'praesentium', 'voluptatum', 'deleniti', 'corrupti', 'quos', 'quas', 'molestias',
  'excepturi', 'cupiditate', 'provident', 'similique', 'mollitia', 'animi', 'dolor',
  'fuga', 'harum', 'quidem', 'rerum', 'facilis', 'expedita', 'distinctio', 'nam',
  'libero', 'tempore', 'cum', 'soluta', 'nobis', 'eligendi', 'optio', 'cumque',
  'impedit', 'minus', 'maxime', 'placeat', 'facere', 'possimus', 'voluptas',
  'assumenda', 'repellendus', 'temporibus', 'quibusdam', 'officiis', 'debitis',
  'necessitatibus', 'saepe', 'eveniet', 'voluptates', 'repudiandae', 'recusandae',
  'itaque', 'earum', 'hic', 'tenetur', 'sapiente', 'delectus', 'reiciendis',
  'voluptatibus', 'maiores', 'alias', 'perferendis', 'doloribus', 'asperiores',
  'repellat', 'integer', 'felis', 'massa', 'justo', 'cursus', 'metus', 'ultricies',
  'praesent', 'lectus', 'tortor', 'condimentum', 'lacinia', 'vel', 'eros', 'donec',
  'sollicitudin', 'tellus', 'cras', 'blandit', 'mi', 'porta', 'sapien', 'quisque',
  'nisl', 'eget', 'eleifend', 'pellentesque', 'diam', 'arcu', 'curabitur', 'aliquam',
  'nibh', 'suscipit', 'semper', 'interdum', 'malesuada', 'fames', 'ante', 'primis',
  'faucibus', 'orci', 'luctus', 'ultrices', 'posuere', 'cubilia', 'curae', 'mauris',
  'viverra', 'morbi', 'tincidunt', 'lacus', 'nunc', 'molestie', 'elementum',
  'tempus', 'risus', 'facilisi', 'fermentum', 'pretium', 'hendrerit', 'suspendisse',
  'potenti', 'leo', 'feugiat', 'adipisci',
];

const STANDARD_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',

  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',

  'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',

  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',

  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',

  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',

  'At vero eos et accusamus iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.',

  'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',

  'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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

function generateStandardSentences(count: number): string[] {
  const sentences: string[] = [];
  const allSentences = STANDARD_PARAGRAPHS.flatMap((p) =>
    p.split(/(?<=[.!?])\s+/).filter((s) => s.trim()),
  );

  const shuffled = [...allSentences].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  for (let i = 0; i < count; i++) {
    if (i < selected.length) {
      sentences.push(selected[i]);
    } else {
      let sentence = generateWords(8);
      sentence = sentence.replace(/\.$/, '') + '.';
      sentences.push(sentence);
    }
  }

  return sentences;
}

export interface LoremOptions {
  paragraphs: number;
  sentencesPerParagraph: number;
  wordsPerSentence: number;
  startWithClassic?: boolean;
  outputFormat?: 'paragraph' | 'list';
}

export function generateLorem(options: Partial<LoremOptions> = {}): string {
  const {
    paragraphs = 1,
    sentencesPerParagraph = 3,
    wordsPerSentence = 8,
    startWithClassic = false,
    outputFormat = 'paragraph',
  } = options;

  const paragraphsArr: string[] = [];

  for (let p = 0; p < paragraphs; p++) {
    let sentences: string[];

    if (startWithClassic && p === 0) {
      const classicText = STANDARD_PARAGRAPHS[0];
      const classicWords = classicText.split(/\s+/).slice(0, wordsPerSentence).join(' ');
      const firstSentence = classicWords.charAt(0).toUpperCase() + classicWords.slice(1);
      const firstSentenceWithPeriod = firstSentence.endsWith('.')
        ? firstSentence
        : firstSentence + '.';

      const remainingSentences = generateStandardSentences(sentencesPerParagraph - 1);
      sentences = [firstSentenceWithPeriod, ...remainingSentences];
    } else {
      sentences = generateStandardSentences(sentencesPerParagraph);
    }

    if (outputFormat === 'list') {
      sentences.forEach((s) => paragraphsArr.push('- ' + s));
    } else {
      paragraphsArr.push(sentences.join(' '));
    }
  }

  return paragraphsArr.join('\n\n');
}