import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Initial color mode of webpage is dark
const config: ThemeConfig = {
  initialColorMode: "dark",
};

// Extends the default Chakra UI theme with customizations
const theme = extendTheme({
  config,
  colors: { //Custom colors for various shades of gray
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "111",
    },
  },
  // Custom shadow for dark mode
  shadows: {
    customDark: '0px 8px 24px 20px rgba(0, 0, 0, 0.8)' 
  }
});

export default theme;
