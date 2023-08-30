import { common } from 'replugged';
import { logger } from '../../index';

const { lodash: Lodash, React } = common;

import Ask from './Ask';
import Bing from './Bing';
import Brave from './Brave';
import DogPile from './DogPile';
import DuckDuckGo from './DuckDuckGo';
import Ecosia from './Ecosia';
import ExternalLink from './ExternalLink';
import GitHub from './GitHub';
import Google from './Google';
import GoogleScholar from './GoogleScholar';
import Pin from './Pin';
import Quora from './Quora';
import Qwant from './Qwant';
import Searx from './Searx';
import StackOverflow from './StackOverflow';
import Startpage from './Startpage';
import Unpin from './Unpin';
import UrbanDictionary from './UrbanDictionary';
import Whoogle from './Whoogle';
import WolframAlpha from './WolframAlpha';
import Yahoo from './Yahoo';
import Yandex from './Yandex';
import YouTube from './YouTube';

const Icons = {
  Ask,
  Bing,
  Brave,
  DogPile,
  DuckDuckGo,
  Ecosia,
  ExternalLink,
  GitHub,
  Google,
  GoogleScholar,
  Pin,
  Quora,
  Qwant,
  Searx,
  StackOverflow,
  Startpage,
  Unpin,
  UrbanDictionary,
  Whoogle,
  WolframAlpha,
  Yahoo,
  Yandex,
  YouTube
} as Record<string, React.FC<{ 'data-theme'?: string }>>;

export function Icon(props: React.SVGProps<SVGElement> & { name: string }): React.ReactElement | null {
  const Icon = Icons[Object.keys(Icons).find((key) => key.toLowerCase() === props.name.replace(/_|-| /g, '').toLowerCase())!];
  const theme = document.querySelector('html[class*=theme-dark]') ? 'dark' : 'light';

  if (!Icon) {
    logger.error(`Icon “${props.name}” not found; skipping`);

    return null;
  }

  return React.createElement(Icon, {
    'data-theme': theme,
    ...Lodash.omit(props, 'name')
  });
}

Icon.Names = Object.keys(Icons);

export default Icons;
