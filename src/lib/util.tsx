import type { SearchEngine } from '@types';

import { PRETTY_SEARCH_ENGINES, SEARCH_ENGINES } from './constants';
import { common, components } from 'replugged';
import { Icons } from '@components';
import { prefs } from '@index';

const { ContextMenu } = components;
const { lodash: Lodash } = common;
const { Messages } = common.i18n;

export function openLink(text: string, engine: SearchEngine): Window | null {
  return window.open(`${SEARCH_ENGINES[Lodash.snakeCase(engine).toUpperCase()]}`.concat(encodeURIComponent(text)), '_blank');
}

export function getEnabledEngines(): SearchEngine[] {
  const engines = Object.keys(SEARCH_ENGINES).map((engine) => Lodash.camelCase(engine)) as SearchEngine[];

  return engines.filter((engine) => prefs.get(engine));
}

export function makeMenuItem(text: string): React.ReactElement | null {
  const EngineIcon = (engine: string): (() => React.ReactElement) | null => {
    if (prefs.get('hideIcons')) {
      return null;
    }

    const Icon = Icons[PRETTY_SEARCH_ENGINES[engine].replace(' ', '')];

    return Icon ?? null;
  };

  const enabledEngines = getEnabledEngines();
  if (!enabledEngines.length) return null;

  if (enabledEngines.length === 1) {
    return (
      <ContextMenu.MenuItem
        id='search-google'
        label={Messages.RGS_SEARCH_WITH_ENGINE.format({
          engine: PRETTY_SEARCH_ENGINES[Lodash.snakeCase(enabledEngines[0]).toUpperCase()]
        })}
        icon={EngineIcon(Lodash.snakeCase(enabledEngines[0]).toUpperCase())}
        action={() => openLink(text, enabledEngines[0])}
      />
    );
  }

  const items: React.ReactElement[] = [];
  const preferredEngine = Lodash.camelCase(prefs.get('preferred')) as SearchEngine;

  for (const engine of enabledEngines) {
    const kebabEngine = Lodash.kebabCase(engine);
    const isPreferred = preferredEngine === engine;

    items[isPreferred ? 'unshift' : 'push'](
      <ContextMenu.MenuItem
        id={`search-${kebabEngine}`}
        key={isPreferred ? 'preferred-engine' : kebabEngine}
        label={PRETTY_SEARCH_ENGINES[Lodash.snakeCase(engine).toUpperCase()]}
        icon={EngineIcon(Lodash.snakeCase(engine).toUpperCase())}
        action={() => openLink(text, engine)}
      />
    );

    if (isPreferred) {
      items.splice(1, 0, <ContextMenu.MenuSeparator key={`divider-${kebabEngine}`} />);
    }
  }

  return (
    <ContextMenu.MenuItem id='search-google' color='brand' label={Messages.RGS_SEARCH_WITH} action={() => openLink(text, preferredEngine)}>
      {items}
    </ContextMenu.MenuItem>
  );
}
