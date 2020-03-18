import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import isObject from 'is-obj';

export const defaultBranding = {
  textColor: '#000',
  accentColor: 'red',
  alternateTextColor: '#fff',

  linkColor: '#7945ef',

  disabledColor: '#f9f9fa',
  disabledDarkColor: '#b1b2c1',

  successLightColor: '#e9f9f0',
  successColor: '#20cd68',

  passiveSuccessLightColor: '#d5dff7',
  passiveSuccessColor: '#2f61d5',

  dangerLightColor: '#ffe2dc',
  dangerColor: '#ff7052',
  primaryLightColor: '#e3d9fc',
  primaryColor: '#7540ee',
};

/*{
  primary: '#397edc',
  primaryActive: '#2d63ad',
  success: '#22c93d',
  successActive: '#1dab35',
  info: '#19bfe5',
  infoActive: '#17adcf',
  warning: '#feb401',
  warningActive: '#eba502',
  danger: '#ed1c4d',
  dangerActive: '#c2173f',
  foreground: '#000000dd',
  modalBackground: '#0000004d',
  background: '#fff',
  text: '#fff',
  textInverse: '#397edc',
  inverseBackground: '#000000',
  overlay: '#00000057',
  fontSize: 15,
  neutral: '#0000001A',
  hint: '#0000008e',
  highlight: '#ececec',
  transparent: '#00000000',
};*/

export const ThemeContext = React.createContext({
  theme: {},
});

export class Provider extends Component {
  themeConfigs = {};
  branding = defaultBranding;

  constructor(props) {
    super(props);
    if (props.branding) {
      this.branding = mergeDeep(this.branding, props.branding);
    }
  }

  updateThemeConfig = (name, themeConfig) => {
    if (this.props.theme && this.props.theme[name]) {
      themeConfig = mergeDeep(themeConfig, this.props.theme[name]);
    }

    // Turn the themeConfig object into a string, then replace and strings that start with @ with a value from the branding config
    // so `@darkColor` would pull the value of `this.branding.darkColor`
    // We then convert the result back into an object
    themeConfig = JSON.parse(
      JSON.stringify(themeConfig).replace(
        /@([\w_-]+)/gm,
        (match, key) => this.branding[key],
      ),
    );

    return (this.themeConfigs[name] = {
      computedStyle: themeConfig.style
        ? StyleSheet.create(themeConfig.style)
        : {},
      props: themeConfig.props,
    });
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.themeConfigs,
          updateThemeConfig: this.updateThemeConfig,
        }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export function withTheme(componentName, ThemedComponent) {
  const propTypes = {
    ...ThemedComponent.propTypes,
  };
  delete propTypes.theme;

  return class extends React.Component {
    static displayName = componentName;
    static propTypes = {
      ...propTypes,
    };
    static defaultProps = {
      ...ThemedComponent.defaultProps,
    };
    constructor() {
      super();
      try {
        if (ThemeContext._currentValue.updateThemeConfig) {
          ThemeContext._currentValue.updateThemeConfig(
            componentName,
            ThemedComponent.themeConfig,
          );
        }
      } catch (e) {
        console.warn(`failed to update theme for ${componentName}`, e);
      }
    }

    render() {
      return (
        <ThemeContext.Consumer>
          {({theme}) => {
            const computedTheme =
              (theme[componentName] || {}).computedStyle || {};

            const fullTheme = this.props.theme
              ? mergeDeep({}, computedTheme, this.props.theme)
              : computedTheme;

            return (
              <ThemedComponent
                {...((theme[componentName] || {}).props || {})}
                {...this.props}
                theme={fullTheme}
              />
            );
          }}
        </ThemeContext.Consumer>
      );
    }
  };
}

function mergeDeep(target, ...sources) {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {[key]: {}});
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {[key]: source[key]});
      }
    }
  }

  return mergeDeep(target, ...sources);
}
