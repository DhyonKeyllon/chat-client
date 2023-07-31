import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;

      background: string;
      backgroundSecondary: string;
      backgroundInfoPrimary: string;
      backgroundInfoSecondary: string;

      text: string;

      error: string;
      success: string;
      warning: string;

      white: string;
      gray200: string;
      secondary: string;
    };
  }
}
