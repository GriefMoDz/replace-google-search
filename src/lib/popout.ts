import { common } from 'replugged';

const { fluxDispatcher: FluxDispatcher } = common;

enum Feature {
  MENU_BAR = 'menubar',
  TOOLBAR = 'toolbar',
  LOCATION = 'location',
  DIRECTORIES = 'directories'
}

interface Features {
  [Feature.MENU_BAR]?: boolean;
  [Feature.TOOLBAR]?: boolean;
  [Feature.LOCATION]?: boolean;
  [Feature.DIRECTORIES]?: boolean;

  defaultWidth?: number;
  defaultHeight?: number;
  defaultAlwaysOnTop?: boolean;
}

export const DEFAULT_POPOUT_WIDTH = 854;
export const DEFAULT_POPOUT_HEIGHT = 480;
export const DEFAULT_FEATURES = {
  [Feature.MENU_BAR]: false,
  [Feature.TOOLBAR]: false,
  [Feature.LOCATION]: false,
  [Feature.DIRECTORIES]: false,

  defaultWidth: DEFAULT_POPOUT_WIDTH,
  defaultHeight: DEFAULT_POPOUT_HEIGHT
};

export function openPopout(windowKey: string, render: (windowKey: string) => React.ReactElement | null, features?: Features): void {
  FluxDispatcher.dispatch({
    type: 'POPOUT_WINDOW_OPEN',
    key: windowKey,
    features: { ...DEFAULT_FEATURES, ...features },
    render
  });
}

export function closePopout(windowKey: string): void {
  FluxDispatcher.dispatch({
    type: 'POPOUT_WINDOW_CLOSE',
    key: windowKey
  });
}

export function setAlwaysOnTop(windowKey: string, alwaysOnTop: boolean): void {
  FluxDispatcher.dispatch({
    type: 'POPOUT_WINDOW_SET_ALWAYS_ON_TOP',
    key: windowKey,
    alwaysOnTop
  });
}

export default { openPopout, closePopout, setAlwaysOnTop };
