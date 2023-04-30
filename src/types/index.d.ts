import type { AnyFunction, ModuleExports } from 'replugged/dist/types';

type SearchEngine = keyof SearchEngineSettings;

type SearchWithGoogleModule = ModuleExports & {
  exports: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: (args: any, res: React.ReactElement) => React.ReactElement;
    Z: AnyFunction;
  };
};

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
  preferred?: SearchEngine | '';
}
