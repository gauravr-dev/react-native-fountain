import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { Provider, Consumer, themes } from "../ThemeProvider";
import { ButtonTypes } from "./types";
import { BaseComponent } from "../BaseComponent";

/**
 * TODO:
 * Right now this is a basic implementation with multiple themes.
 * We can have other type of button like with icon, loading etc
 */

export default class Button extends BaseComponent {
  componentName = "Button";
  typeMapping = {
    container: {
      hitSlop: "hitSlop"
    },
    content: {
      color: "color",
      fontSize: "fontSize"
    },
    loading: {}
  };

  constructor(props) {
    super(props);
    this.componentName = "Button";
  }

  render() {
    const { title, type } = this.props;

    // resolve types
    // type can have multiple values depend on need

    const formattedTitle =
      Platform.OS === "android" ? title.toUpperCase() : title;
    const Touchable =
      Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <Touchable>
        <Consumer>
          {({ theme, toggleTheme }) => {
            // Get the styles from defined types
            componentTypes = ButtonTypes(theme);

            let { container, content, loading } = super.defineStyles();
            let { style, touchable, ...touchableProps } = this.props;
            let hitSlop = this.extractNonStyleValue(container, "hitSlop");
            if (hitSlop) touchableProps.hitSlop = hitSlop;
            let Touchable = touchable || TouchableOpacity;

            return (
              <Touchable style={[container, style]} {...touchableProps}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}
                >
                  {this.props.loading && this._renderLoading(loading[0])}
                  {this.props.children && this._renderChildren(content)}
                  {this.props.title &&
                    this._renderText(this.props.title, content)}
                </View>
              </Touchable>
            );
          }}
        </Consumer>
      </Touchable>
    );
  }

  _renderText = (text, style) => (
    <Text style={[style, this.props.contentStyle]}>{text}</Text>
  );

  _renderLoading = style => {
    return <ActivityIndicator size="small" color={style.color} />;
  };

  _renderIcon = () => {
    <Image source={{}} />;
  };

  _renderChildren(style) {
    let displayText = text => (
      <Text style={[style, this.props.contentStyle]}>{text}</Text>
    );
    if (typeof this.props.children === "string") {
      return displayText(this.props.children);
    }
    let babies =
      typeof this.props.children == "Array"
        ? this.props.children
        : [this.props.children];
    return React.Children.map(babies, baby => {
      if (typeof baby === "string") {
        return displayText(baby);
      } else {
        let { style: babyStyle, ...babyProps } = baby.props;
        return React.cloneElement(baby, {
          style: [this.props.contentStyle, babyStyle],
          ...babyProps
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      // backgroundColor: "#2196F3",
      // borderRadius: 2
    }
  }),
  text: {
    textAlign: "center",
    padding: 8,
    ...Platform.select({
      ios: {
        // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
        // color: "#007AFF",
        // fontSize: 18
      },
      android: {
        color: "white",
        fontWeight: "500"
      }
    })
  },
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: "#dfdfdf"
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: "#cdcdcd"
    },
    android: {
      color: "#a1a1a1"
    }
  })
});

/**
 * JSON.stringify(style)
 */
