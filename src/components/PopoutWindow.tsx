import type { PopoutWindowProps, PopoutWindowStore } from '@types';

import { common, webpack } from 'replugged';

const { React } = common;

const PopoutWindowStore = webpack.getByStoreName<PopoutWindowStore>('PopoutWindowStore')!;
const PopoutWindow: React.ForwardRefExoticComponent<PopoutWindowProps> = await webpack.waitForModule(
  webpack.filters.bySource(/defaultProps={withTitleBar:!0/)
);

/**
 * This component is used to create a custom popout window.
 * Upon render, it will apply all Replugged styles and also copy the same classes as the HTML tag from the main window.
 *
 * @param {PopoutWindowProps} props - Properties to be passed to the component
 * @returns PopoutWindow
 */
export const CustomPopoutWindow = React.memo((props: PopoutWindowProps) => {
  React.useEffect(() => {
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

  return <PopoutWindow {...props} />;
});

export default PopoutWindow;
