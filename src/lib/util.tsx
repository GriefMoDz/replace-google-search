import type { ModuleExportsWithProps, ObjectExports } from 'replugged/dist/types';
import type { PopoutWindowStore, SearchEngine, UseStateFromStores } from '@types';

import { POPOUT_WINDOW_ID, PRETTY_SEARCH_ENGINES, SEARCH_ENGINES } from './constants';
import { common, components, webpack } from 'replugged';
import { Icon, Icons } from '@components';
import { prefs } from '@index';

const { Button, ContextMenu, ErrorBoundary, Loader, Text } = components;
const { lodash: Lodash, parser, React } = common;
const { Messages } = common.i18n;

import PopoutManager from './popout';
import { CustomPopoutWindow } from '@components/PopoutWindow';

const HeaderBarContainer = webpack.getByProps(['Title', 'Divider'], { all: true })[0] as ModuleExportsWithProps<'Title' | 'Divider'> & {
  Title: React.ComponentType<{
    children?: React.ReactNode;
    wrapperClassName?: string;
    className?: string;
    onContextMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }>;
  Icon: React.ComponentType<{
    icon: React.FC;
    tooltip?: string;
    tooltipPosition?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }>;
} & React.ComponentType<{ className?: string; innerClassName?: string; children?: React.ReactNode; toolbar?: React.ReactNode }>;

const PopoutWindowStore = webpack.getByStoreName<PopoutWindowStore>('PopoutWindowStore')!;

const useStateFromStoresMod = await webpack.waitForModule<ObjectExports>(webpack.filters.bySource('useStateFromStores'));
const useStateFromStores: UseStateFromStores = webpack.getFunctionBySource(useStateFromStoresMod, 'useStateFromStores')!;

const { DiscordNative } = window as Window &
  typeof globalThis & {
    DiscordNative: {
      clipboard: {
        copy: (text?: string) => void;
      };
      process: { platform: string };
    };
  };

const IFrameLoader = (props: { engine: string; url: string }): React.ReactElement => {
  const [engine, setEngine] = React.useState(props.engine);

  const isUnsupported = ['dogPile', 'stackOverflow', 'yahoo'].includes(Lodash.camelCase(engine));

  const [loading, setLoading] = React.useState(!isUnsupported);

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const { guestWindow, alwaysOnTop } = useStateFromStores(
    [PopoutWindowStore],
    () => ({
      guestWindow: PopoutWindowStore.getWindow(POPOUT_WINDOW_ID),
      alwaysOnTop: PopoutWindowStore.getIsAlwaysOnTop(POPOUT_WINDOW_ID)
    }),
    [],
    (
      oldState: { guestWindow: Window | null; alwaysOnTop: boolean },
      newState: { guestWindow: Window | null; alwaysOnTop: boolean },
      dependencies?: string[]
    ): boolean => {
      if (oldState === newState) {
        return true;
      }

      const oldKeys = Object.keys(oldState);
      const newKeys = Object.keys(newState);

      if (oldKeys.length !== newKeys.length) {
        return false;
      }

      for (let index = 0; index < oldKeys.length; index++) {
        let key = oldKeys[index] as keyof typeof oldState;
        if (oldState[key] !== newState[key] && !dependencies?.includes(key)) {
          return false;
        }
      }

      if (oldState.guestWindow?.document.title === newState.guestWindow?.document.title) {
        setEngine(newState.guestWindow?.document.title.split(' | ')?.[1] ?? engine);

        return true;
      }

      return true;
    }
  );

  const url = guestWindow?.document?.querySelector('iframe')?.src ?? props.url;
  const upperEngine = Lodash.snakeCase((guestWindow?.document?.title?.split(' | ')?.[1] ?? engine).toLowerCase()).toUpperCase();
  const query = decodeURI(url.slice(SEARCH_ENGINES[upperEngine].length));

  const handleEngineContextMenu = (event: React.MouseEvent): void =>
    common.contextMenu.open(event, (props) => (
      <ContextMenu.ContextMenu
        {...props}
        navId='rgs-engine-context-menu'
        className='rgs-engine-context-menu'
        children={makeMenuItem(query, { forcePopout: true, nested: false })}
        onClose={() => common.contextMenu.close()}
      />
    ));

  const handleCopyContextMenu = (event: React.MouseEvent): void =>
    common.contextMenu.open(event, (props) => (
      <ContextMenu.ContextMenu
        {...props}
        navId='rgs-copy-link-context-menu'
        children={[
          <ContextMenu.MenuItem
            id='copy-link'
            label={Messages.COPY}
            hint={DiscordNative.process.platform === 'darwin' ? '⌘C' : 'Ctrl+C'}
            action={() =>
              DiscordNative.clipboard.copy(guestWindow.getSelection()!.toString?.()?.length > 0 ? guestWindow.getSelection()?.toString() : url)
            }
          />
        ]}
        onClose={() => common.contextMenu.close()}
      />
    ));

  const handleAlwaysOnTop = React.useCallback((): void => {
    PopoutManager.setAlwaysOnTop(POPOUT_WINDOW_ID, !alwaysOnTop);
  }, [alwaysOnTop]);

  React.useEffect(() => {
    iframeRef.current?.contentWindow?.focus();
  });

  console.debug(`Loading IFrame from ${engine} @ ${url}`, loading);

  return (
    <ErrorBoundary>
      {!loading && (
        <HeaderBarContainer
          className='rgs-popout-header'
          innerClassName='rgs-popout-header-inner'
          toolbar={[
            <HeaderBarContainer.Icon
              icon={alwaysOnTop ? Icons.Unpin : Icons.Pin}
              tooltip={alwaysOnTop ? 'Unpin' : 'Pin'}
              tooltipPosition='left'
              onClick={handleAlwaysOnTop}
            />,
            <HeaderBarContainer.Icon
              icon={Icons.ExternalLink}
              tooltip={Messages.OPEN_LINK}
              tooltipPosition='left'
              onClick={() => window.open(url, '_blank', 'noopener, noreferrer')}
            />
          ]}
          children={[
            <HeaderBarContainer.Icon
              icon={Icons[engine.replace(' ', '')]}
              tooltip={PRETTY_SEARCH_ENGINES[upperEngine]}
              tooltipPosition='right'
              onClick={handleEngineContextMenu}
            />,
            <HeaderBarContainer.Title wrapperClassName='rgs-popout-title' className='rgs-popout-title-text' onContextMenu={handleCopyContextMenu}>
              {url}
            </HeaderBarContainer.Title>
          ]}
        />
      )}
      {isUnsupported && (
        <div className='rgs-unsupported-container'>
          <Text.H2 className='rgs-unsupported-container-title' variant='heading-xxl/semibold'>
            {parser.parse(Messages.RGS_UNSUPPORTED_SEARCH_ENGINE_TITLE)}
          </Text.H2>
          <Text.Normal>{Messages.RGS_UNSUPPORTED_SEARCH_ENGINE_SUB_TEXT}</Text.Normal>
          <div className='rgs-unsupported-container-buttons'>
            <Button
              color={Button.Colors.GREEN}
              size={Button.Sizes.MEDIUM}
              className='rgs-unsupported-container-button'
              onClick={handleEngineContextMenu}>
              {Messages.RGS_CHANGE_SEARCH_ENGINE}
            </Button>
            <Button
              color={Button.Colors.BRAND}
              size={Button.Sizes.MEDIUM}
              className='rgs-unsupported-container-button'
              onClick={() => window.open(url, '_blank', 'noopener, noreferrer')}>
              {Messages.OPEN_LINK} <Icon name='ExternalLink' width='16' height='16' style={{ verticalAlign: 'top', marginLeft: 3 }} />
            </Button>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        width='100%'
        height='100%'
        src={props.url}
        style={{ display: loading || isUnsupported ? 'none' : 'block' }}
        onLoad={() => setLoading(false)}
        allowTransparency={true}
        referrerPolicy='no-referrer'
        sandbox='allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation'
      />
      {loading && <Loader animated={true} type={Loader.Type.WANDERING_CUBES} style={{ width: '50%', height: '50%' }} />}
    </ErrorBoundary>
  );
};

export function openLink(
  event: React.MouseEvent<HTMLDivElement>,
  options: { text: string; engine: SearchEngine; forcePopout?: boolean }
): Window | null {
  const key = Lodash.snakeCase(options.engine).toUpperCase();
  const url = `${SEARCH_ENGINES[key]}`.concat(encodeURIComponent(options.text ?? ''));

  if ((options.forcePopout && !event.shiftKey) || (!options.forcePopout && event.shiftKey)) {
    const engine = PRETTY_SEARCH_ENGINES[key];
    const guestWindow = PopoutWindowStore.getWindow(POPOUT_WINDOW_ID);

    PopoutManager.openPopout(POPOUT_WINDOW_ID, (windowKey) => {
      return (
        <CustomPopoutWindow windowKey={windowKey} title={`Search Engine Popout | ${engine}`}>
          <IFrameLoader engine={engine} url={url} />
        </CustomPopoutWindow>
      );
    });

    if (guestWindow) {
      guestWindow.document.title = `Search Engine Popout | ${engine}`;
      guestWindow.document.querySelector('iframe')!.src = url;

      PopoutWindowStore.emitChange();
    }

    return guestWindow;
  } else {
    return window.open(url, '_blank', 'noopener, noreferrer');
  }
}

export function getEnabledEngines(): SearchEngine[] {
  const engines = Object.keys(SEARCH_ENGINES).map((engine) => Lodash.camelCase(engine)) as SearchEngine[];

  return engines.filter((engine) => prefs.get(engine));
}

export function makeMenuItem(
  text: string,
  options: { forcePopout?: boolean; nested?: boolean } = { forcePopout: prefs.get('forcePopoutWindow'), nested: true }
): React.ReactElement | [] {
  const EngineIcon = (engine: string): React.ComponentType<unknown> | undefined => {
    if (prefs.get('hideIcons')) {
      return undefined;
    }

    const Icon = Icons[PRETTY_SEARCH_ENGINES[engine].replace(' ', '')] as React.ComponentType<unknown>;
    const theme = document.querySelector('html[class*=theme-dark]') ? 'dark' : 'light';

    Icon.defaultProps = {
      'data-theme': theme
    };

    return Icon ?? undefined;
  };

  const enabledEngines = getEnabledEngines();
  if (!enabledEngines.length) return [];

  if (enabledEngines.length === 1) {
    return (
      <ContextMenu.MenuItem
        id='search-google'
        label={Messages.RGS_SEARCH_WITH_ENGINE.format({
          engine: PRETTY_SEARCH_ENGINES[Lodash.snakeCase(enabledEngines[0]).toUpperCase()]
        })}
        icon={EngineIcon(Lodash.snakeCase(enabledEngines[0]).toUpperCase())}
        action={(event) => openLink(event, { text, engine: enabledEngines[0], forcePopout: options?.forcePopout })}
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
        action={(event) => openLink(event, { text, engine, forcePopout: options?.forcePopout })}
      />
    );

    if (isPreferred) {
      items.splice(1, 0, <ContextMenu.MenuSeparator key={`divider-${kebabEngine}`} />);
    }
  }

  return options?.nested ? (
    <ContextMenu.MenuItem
      id='search-google'
      color='brand'
      label={Messages.RGS_SEARCH_WITH}
      action={(event) => openLink(event, { text, engine: preferredEngine, forcePopout: options.forcePopout })}>
      {items}
    </ContextMenu.MenuItem>
  ) : (
    <ContextMenu.MenuGroup>{items}</ContextMenu.MenuGroup>
  );
}
