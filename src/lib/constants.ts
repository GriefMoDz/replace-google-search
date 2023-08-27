import { RGSSettings } from '@types';

export const POPOUT_WINDOW_ID = 'DISCORD_REPLUGGED_RGS_LINK';

export const SEARCH_ENGINES: Record<string, string> = {
  ASK: 'https://ask.com/web?q=',
  BING: 'https://www.bing.com/search?q=',
  BRAVE: 'https://search.brave.com/search?q=',
  DOGPILE: 'https://www.dogpile.com/search/web?q=',
  DUCKDUCKGO: 'https://duckduckgo.com/?q=',
  ECOSIA: 'https://www.ecosia.org/search?q=',
  GITHUB: 'https://github.com/search?q=',
  GOOGLE: 'https://www.google.com/search?q=',
  GOOGLE_SCHOLAR: 'https://scholar.google.com/scholar?q=',
  QUORA: 'https://www.quora.com/search?q=',
  QWANT: 'https://www.qwant.com/?t=web&q=',
  URBAN_DICTIONARY: 'https://www.urbandictionary.com/define.php?term=',
  SEARX: 'https://searx.info/search?q=',
  STACK_OVERFLOW: 'https://stackoverflow.com/search?q=',
  STARTPAGE: 'https://www.startpage.com/sp/search?q=',
  WHOOGLE: 'https://search.sethforprivacy.com/search?q=',
  WOLFRAM_ALPHA: 'https://www.wolframalpha.com/input/?i=',
  YANDEX: 'https://yandex.com/search/?text=',
  YAHOO: 'https://search.yahoo.com/search?p=',
  YOUTUBE: 'https://www.youtube.com/results?q='
};

export const PRETTY_SEARCH_ENGINES: Record<string, string> = {
  ASK: 'Ask',
  BING: 'Bing',
  BRAVE: 'Brave',
  DOGPILE: 'DogPile',
  DUCKDUCKGO: 'DuckDuckGo',
  ECOSIA: 'Ecosia',
  GITHUB: 'GitHub',
  GOOGLE: 'Google',
  GOOGLE_SCHOLAR: 'Google Scholar',
  QUORA: 'Quora',
  QWANT: 'Qwant',
  URBAN_DICTIONARY: 'Urban Dictionary',
  SEARX: 'Searx',
  STACK_OVERFLOW: 'Stack Overflow',
  STARTPAGE: 'Startpage',
  WHOOGLE: 'Whoogle',
  WOLFRAM_ALPHA: 'Wolfram Alpha',
  YANDEX: 'Yandex',
  YAHOO: 'Yahoo',
  YOUTUBE: 'YouTube'
};

export const DefaultSettings: Partial<RGSSettings> = {
  /* Search Engines */
  ask: true,
  bing: true,
  brave: true,
  dogpile: false,
  duckduckgo: true,
  ecosia: false,
  github: false,
  google: true,
  googleScholar: false,
  quora: true,
  qwant: false,
  urbanDictionary: false,
  searx: false,
  stackOverflow: true,
  startpage: false,
  whoogle: false,
  wolframAlpha: false,
  yandex: true,
  yahoo: true,
  youtube: false,

  /* Other */
  forcePopoutWindow: false,
  hideIcons: false,
  preferred: ''
};
