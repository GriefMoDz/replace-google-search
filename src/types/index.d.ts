import type { AnyFunction, ModuleExports } from 'replugged/dist/types';
import type { Store } from 'replugged/dist/renderer/modules/common/flux';

type SearchEngine = keyof SearchEngineSettings;

type SearchWithGoogleModule = ModuleExports & {
  exports: {
    [key: string]: AnyFunction;
  };
};

interface PopoutWindowStore extends Store {
  getWindow: (windowKey: string) => Window;
  getIsAlwaysOnTop: (windowKey: string) => boolean;
}

interface PopoutWindowProps {
  withTitleBar?: boolean;
  windowKey: string;
  title?: string;
  children?: React.ReactNode;
}

interface SearchEngineSettings {
  ask?: boolean;
  bing?: boolean;
  brave?: boolean;
  dogpile?: boolean;
  duckduckgo?: boolean;
  ecosia?: boolean;
  github?: boolean;
  google?: boolean;
  googleScholar?: boolean;
  quora?: boolean;
  qwant?: boolean;
  urbanDictionary?: boolean;
  searx?: boolean;
  stackOverflow?: boolean;
  startpage?: boolean;
  whoogle?: boolean;
  wolframAlpha?: boolean;
  yandex?: boolean;
  yahoo?: boolean;
  youtube?: boolean;
}

interface RGSSettings extends SearchEngineSettings {
  hideIcons?: boolean;
  forcePopoutWindow?: boolean;
  preferred?: SearchEngine | '';
}
