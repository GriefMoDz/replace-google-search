import type { RGSSettings, SearchWithGoogleModule } from '@types';

import { Injector, Logger, components, i18n, settings, webpack } from 'replugged';
import { DefaultSettings } from '@lib/constants';
import { makeMenuItem } from '@lib/util';

import translations from '@i18n';
import './main.css';

const { ContextMenu } = components;

export const prefs = await settings.init<RGSSettings, keyof typeof DefaultSettings>('xyz.griefmodz.ReplaceGoogleSearch', DefaultSettings);

const logger = Logger.plugin('ReplaceGoogleSearch');
const inject = new Injector();

import { Settings } from '@components';
export { Settings };

export function start(): void {
  i18n.loadAllStrings(translations);

  void patchSearchWithGoogle();
  void patchTextAreaContextMenu();
}

export function stop(): void {
  inject.uninjectAll();
}

async function patchSearchWithGoogle(): Promise<void> {
  const start = performance.now();
  const SearchWithGoogleModule = await webpack.waitForModule<SearchWithGoogleModule>(webpack.filters.bySource('search-google'), { raw: true });

  inject.after(SearchWithGoogleModule.exports, 'Z', ([text], res) => (res ? makeMenuItem(text) : null));

  const end = performance.now();

  logger.log(`“SearchWithGoogle” patched, took ${(end - start).toFixed(3)} ms`);
}

async function patchTextAreaContextMenu(): Promise<void> {
  const TextAreaContextModule = await webpack.waitForModule<SearchWithGoogleModule>(webpack.filters.bySource('navId:"textarea-context"'), {
    raw: true
  });

  const timing = {
    start: 0,
    end: 0
  };

  inject.after(TextAreaContextModule.exports, 'default', ([props], res) => {
    timing.start = performance.now();

    const { children } = res.props;

    if (props?.text && !children?.find?.((child: React.ReactElement) => child.props.id === 'search-google')) {
      children.splice(3, 0, <ContextMenu.MenuGroup children={makeMenuItem(props.text)} />);
    }

    timing.end = performance.now();
  });

  logger.log(`“TextAreaContext” patched, took ${(timing.end - timing.start).toFixed(3)} ms`);
}
