import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

import { Provider, Consumer, themes } from "../ThemeProvider";
import { ButtonTypes } from "./types";

export default class Button extends Component {
  constructor(props) {
    super(props);
    getTypeStyles = this.getTypeStyles.bind(this);
  }

  getTypeStyles(theme, typesString) {
    let types = ButtonTypes(theme);
    let typesArr = typesString.split(" ");
    let styles = [];
    typesArr.forEach(ele => {
      styles.push(types[ele]);
    });
    return styles;
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
            let typeStyles = getTypeStyles(theme, type);
            return (
              <View
                style={[
                  styles.button,
                  { backgroundColor: theme.colors.button.primary },
                  StyleSheet.flatten([styles.text, typeStyles])
                ]}
              >
                <Text style={StyleSheet.flatten([styles.text, typeStyles])}>
                  {formattedTitle}
                </Text>
              </View>
            );
          }}
        </Consumer>
      </Touchable>
    );
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

// Button.contextType = ThemeProvider.childContextTypes;
