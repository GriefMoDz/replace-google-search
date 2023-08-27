import type { RGSSettings, SearchWithGoogleModule } from '@types';

import { Injector, Logger, components, i18n, settings, types, webpack } from 'replugged';
import { DefaultSettings } from '@lib/constants';
import { makeMenuItem } from '@lib/util';

import translations from '@i18n';
import './main.css';

const { ContextMenuTypes } = types;
const { ContextMenu } = components;

export const prefs = await settings.init<RGSSettings, keyof typeof DefaultSettings>('xyz.griefmodz.ReplaceGoogleSearch', DefaultSettings);

const logger = Logger.plugin('ReplaceGoogleSearch', '#3ba55c');
const inject = new Injector();

export { Settings } from '@components';

export function start(): void {
  i18n.loadAllStrings(translations);

  void patchSearchWithGoogle();
  void patchTextAreaContextMenu();
}

export function stop(): void {
  inject.uninjectAll();
}

async function patchSearchWithGoogle(): Promise<void> {
  const timing = {
    start: 0,
    end: 0
  };

  timing.start = performance.now();

  const SearchWithGoogleModule = await webpack.waitForModule<SearchWithGoogleModule>(webpack.filters.bySource('search-google'), { raw: true });
  const ModuleKey = webpack.getFunctionKeyBySource(SearchWithGoogleModule.exports, 'search-google')!;

  inject.after(SearchWithGoogleModule.exports, ModuleKey, ([text], res) => (res ? makeMenuItem(text) : null));

  timing.end = performance.now();

  logger.log(`“SearchWithGoogle” patched, took ${(timing.end - timing.start).toFixed(3)} ms`);
}

function patchTextAreaContextMenu(): void {
  const timing = {
    start: 0,
    end: 0
  };

  inject.utils.addMenuItem(
    ContextMenuTypes.TextareaContext,
    (data: { text: string }, menu) => {
      timing.start = performance.now();

      const { children } = menu ?? {};

      if (data?.text && Array.isArray(children) && !children.find((child: React.ReactElement) => child?.props?.id === 'search-google')) {
        return <ContextMenu.MenuGroup children={makeMenuItem(data.text)} />;
      }

      timing.end = performance.now();
    },
    2
  );

  logger.log(`“TextAreaContext” patched, took ${(timing.end - timing.start).toFixed(3)} ms`);
}
