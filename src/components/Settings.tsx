import type { SearchEngine, SearchEngineSettings } from '@types';

import { DefaultSettings, PRETTY_SEARCH_ENGINES, SEARCH_ENGINES } from '@lib/constants';
import { common, components, util, webpack } from 'replugged';
import { getEnabledEngines } from '@lib/util';
import { prefs } from '@index';

import { Icon } from '@components';

const { Button, Divider, SelectItem, SwitchItem, Text, Tooltip } = components;
const { lodash: Lodash, React } = common;
const { Messages } = common.i18n;

const states = new Map<string, boolean>();

const BetaTag: React.FunctionComponent<{ className?: string }> = webpack.getBySource('Messages.BETA')!;
const BetaTagClasses: {
  betaTagIcon: string;
  betaTagContainer: string;
} = webpack.getByProps('betaTagIcon', 'betaTagContainer')!;

function EngineSettings(): React.ReactElement[] {
  const items: React.ReactElement[] = [];
  const [_, forceUpdate] = React.useState({});

  for (const engine of Object.keys(SEARCH_ENGINES) as SearchEngine[]) {
    const setting = Lodash.camelCase(engine) as SearchEngine;
    const useEngine = util.useSetting(prefs, setting);
    const engineName = PRETTY_SEARCH_ENGINES[engine];

    items.push(
      <SwitchItem
        hideBorder={true}
        value={states.get(setting) ?? useEngine.value}
        onChange={(newValue) => {
          states.set(setting, newValue);
          useEngine.onChange(newValue);

          forceUpdate({});
        }}>
        <span style={{ verticalAlign: 'top', marginRight: 8 }}>
          <Icon name={engine} />
        </span>
        {Messages.RGS_SHOW_ENGINE.format({ engine: engineName })}
      </SwitchItem>
    );
  }

  return items;
}

function ResetIcon(props: { onClick: () => void }): React.ReactElement {
  return (
    <Tooltip text={Messages.FORUM_CHANNEL_RESET_ALL}>
      <svg className='rgs-settings-revert-icon' width='16' height='16' viewBox='0 0 24 24' onClick={props.onClick}>
        <path
          fill='currentColor'
          d='M12,5 L12,1 L7,6 L12,11 L12,7 C15.31,7 18,9.69 18,13 C18,16.31 15.31,19 12,19 C8.69,19 6,16.31 6,13 L4,13 C4,17.42 7.58,21 12,21 C16.42,21 20,17.42 20,13 C20,8.58 16.42,5 12,5 L12,5 Z'
        />
      </svg>
    </Tooltip>
  );
}

const checkDefaultSettings = (condition?: 'enable' | 'disable'): boolean =>
  Object.keys(SEARCH_ENGINES).some((engine) => {
    const setting = Lodash.camelCase(engine) as SearchEngine;
    return prefs.get(setting) !== (condition === 'enable' ? true : condition === 'disable' ? false : DefaultSettings[setting]);
  });

function ActionButtons({ onReset }: { onReset: (action?: 'enable' | 'disable') => void }): React.ReactElement {
  const EnabledAll = checkDefaultSettings('enable');
  const DisabledAll = checkDefaultSettings('disable');

  return (
    <div className='rgs-settings-action-buttons'>
      <Text color='text-normal' variant='text-sm/semibold'>
        {Messages.ACTIONS}:
      </Text>
      <Button disabled={!EnabledAll} size={Button.Sizes.MIN} onClick={() => onReset('enable')}>
        {Messages.RGS_ENABLE_ALL}
      </Button>
      <Button disabled={!DisabledAll} size={Button.Sizes.MIN} onClick={() => onReset('disable')}>
        {Messages.RGS_DISABLE_ALL}
      </Button>
    </div>
  );
}

const marginBottom15 = Object.freeze({ marginBottom: 15 });

function Settings(): React.ReactElement {
  const [_, forceUpdate] = React.useState({});

  const usePopoutWindow = util.useSetting(prefs, 'forcePopoutWindow');
  const usePreferredEngine = util.useSetting(prefs, 'preferred');
  const useHideIcons = util.useSetting(prefs, 'hideIcons');

  const defaultEngine = usePreferredEngine.value;
  const enabledEngines = getEnabledEngines();

  const handleVisibilityReset = React.useCallback(
    (action?: 'enable' | 'disable'): void => {
      Object.keys(SEARCH_ENGINES).forEach((engine) => {
        const setting = Lodash.camelCase(engine) as SearchEngine;
        const value = action === 'enable' ? true : action === 'disable' ? false : DefaultSettings[setting];

        prefs.set(setting, value);
        states.set(setting, value!);

        forceUpdate({});
      });
    },
    [prefs, states]
  );

  return (
    <React.Fragment>
      {ActionButtons({ onReset: handleVisibilityReset })}
      <Text.Eyebrow style={marginBottom15} color='header-secondary'>
        {Messages.RGS_VISIBILITY}
        {checkDefaultSettings() && <ResetIcon onClick={handleVisibilityReset} />}
      </Text.Eyebrow>
      <div className='rgs-settings-visibility-container'>{EngineSettings()}</div>
      <Divider style={marginBottom15} />
      <SelectItem
        clearable={true}
        popoutPosition='top'
        note={Messages.RGS_PREFERRED_SEARCH_ENGINE_NOTE}
        value={defaultEngine}
        options={[
          (defaultEngine !== '' ? defaultEngine : false) as keyof SearchEngineSettings,
          ...enabledEngines.filter((engine) => engine !== defaultEngine)
        ]
          .filter(Boolean)
          .map((engine) => ({
            label: PRETTY_SEARCH_ENGINES[Lodash.snakeCase(engine).toUpperCase()],
            value: engine
          }))}
        onClear={() => usePreferredEngine.onChange('')}
        onSelect={(value) => usePreferredEngine.onChange(value as SearchEngine)}>
        {Messages.RGS_PREFERRED_SEARCH_ENGINE}
      </SelectItem>
      <SwitchItem {...useHideIcons} note={Messages.RGS_HIDE_ICONS_NOTE}>
        {Messages.RGS_HIDE_ICONS}
      </SwitchItem>
      <SwitchItem {...usePopoutWindow} note={Messages.RGS_FORCE_POPOUT_WINDOW_NOTE}>
        <div className={BetaTagClasses.betaTagContainer}>
          {Messages.RGS_FORCE_POPOUT_WINDOW}
          <BetaTag className={BetaTagClasses.betaTagIcon} />
        </div>
      </SwitchItem>
    </React.Fragment>
  );
}

export default Settings;
