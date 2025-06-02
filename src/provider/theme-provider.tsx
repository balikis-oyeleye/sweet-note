"use client";

import { STORE_KEYS } from "@/constants/store-keys";
import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from "@mantine/core";
import { ReactNode } from "react";

const colorSchemeManager = localStorageColorSchemeManager({
  key: STORE_KEYS.THEME,
});

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
      colorSchemeManager={colorSchemeManager}
    >
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;

export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#997C00",
      "#BB9800",
      "#DDB300",
      "#FFCF00",
      "#FFDD4A",
      "#FFE266",
      "#FFE988",
      "#FFF5CC",
      "#FFF9E6",
      "#FFFCF7",
    ],
    accent: [
      "#2C4C6D",
      "#355D86",
      "#3F6E9E",
      "#497FB6",
      "#3C6997",
      "#6190C0",
      "#79A1CA",
      "#92B2D3",
      "#AAC3DD",
      "#C2D4E7",
    ],
  },
  fontFamily: '"Manrope", sans-serif',
  white: "#F8F7FF",
  black: "#0A100D",
});
