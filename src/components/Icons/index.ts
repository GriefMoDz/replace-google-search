import Ask from './Ask';
import Bing from './Bing';
import Brave from './Brave';
import DogPile from './DogPile';
import DuckDuckGo from './DuckDuckGo';
import Ecosia from './Ecosia';
import GitHub from './GitHub';
import Google from './Google';
import GoogleScholar from './GoogleScholar';
import Quora from './Quora';
import Qwant from './Qwant';
import Searx from './Searx';
import StackOverflow from './StackOverflow';
import Startpage from './Startpage';
import UrbanDictionary from './UrbanDictionary';
import Whoogle from './Whoogle';
import WolframAlpha from './WolframAlpha';
import Yahoo from './Yahoo';
import Yandex from './Yandex';
import YouTube from './YouTube';

export default {
  Ask,
  Bing,
  Brave,
  DogPile,
  DuckDuckGo,
  Ecosia,
  GitHub,
  Google,
  GoogleScholar,
  Quora,
  Qwant,
  Searx,
  StackOverflow,
  Startpage,
  UrbanDictionary,
  Whoogle,
  WolframAlpha,
  Yahoo,
  Yandex,
  YouTube
} as unknown as Record<string, () => React.ReactElement>;
