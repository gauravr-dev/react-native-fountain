import React from "react";
import defaultTheme from "./defaultTheme";

const themes = {
  default: {
    colors: {
      button: {
        primary: "#f00"
      }
    }
  },
  beans: {
    colors: {
      button: {
        primary: "#ff0"
      }
    }
  }
};

const { Provider, Consumer } = React.createContext(themes.beans);

export { Provider, Consumer, themes };
