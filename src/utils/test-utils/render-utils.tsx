import { render as testingLibraryRender } from "@testing-library/react";
import {
  createTheme,
  Drawer,
  MantineProvider,
  Menu,
  mergeThemeOverrides,
  Modal,
  Popover,
} from "@mantine/core";
import { theme } from "@/provider/theme-provider";

const testTheme = mergeThemeOverrides(
  theme,
  createTheme({
    components: {
      Modal: Modal.extend({
        defaultProps: {
          transitionProps: { duration: 0 },
        },
      }),
      Drawer: Drawer.extend({
        defaultProps: {
          transitionProps: { duration: 0 },
        },
      }),
      Popover: Popover.extend({
        defaultProps: {
          transitionProps: { duration: 0 },
        },
      }),
      Menu: Menu.extend({
        defaultProps: {
          transitionProps: { duration: 0 },
        },
      }),
    },
  })
);

export function customRender(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={testTheme} defaultColorScheme="dark">
        {children}
      </MantineProvider>
    ),
  });
}
