import type { PopoutWindowProps, PopoutWindowStore } from '@types';

import { common, webpack } from 'replugged';

const { React } = common;

const PopoutWindowStore = webpack.getByStoreName<PopoutWindowStore>('PopoutWindowStore')!;

async function getPopoutWindowComponent(): Promise<React.ForwardRefExoticComponent<PopoutWindowProps>> {
  const PopoutWindow: React.ForwardRefExoticComponent<PopoutWindowProps> = await webpack.waitForModule(
    webpack.filters.bySource(/defaultProps={withTitleBar:!0/)
  );

  return PopoutWindow;
}

let PopoutWindow: React.ForwardRefExoticComponent<PopoutWindowProps>;

/**
 * This component is used to create a custom popout window.
 * Upon render, it will apply all Replugged styles and also copy the same classes as the HTML tag from the main window.
 *
 * @param {PopoutWindowProps} props - Properties to be passed to the component
 * @returns PopoutWindow
 */
export const CustomPopoutWindow = React.memo((props: PopoutWindowProps) => {
  const [_, forceUpdate] = React.useState({});

  React.useEffect(() => {
    if (!PopoutWindow) {
      void getPopoutWindowComponent().then((component) => {
        PopoutWindow = component;

        forceUpdate({});
      });
    }

    const guestWindow = PopoutWindowStore.getWindow(props.windowKey);
    if (guestWindow) {
      // Apply all Replugged styles to the guest window
      document.querySelectorAll('link[href^="replugged://"]').forEach((style) => {
        guestWindow.document.head.innerHTML += style.outerHTML;
      });

      // Apply the same classes as the HTML tag from the main window to the guest window
      guestWindow.document.documentElement.className = document.documentElement.className;
    }
  }, []);

  if (!props.withTitleBar) {
    // Enforce the title bar if the "withTitleBar" prop is missing
    props.withTitleBar = true;
  }

  return PopoutWindow && <PopoutWindow {...props} />;
});

export default await getPopoutWindowComponent();
