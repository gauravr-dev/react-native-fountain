import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";

import { Provider, Consumer, themes } from "../../ThemeProvider";
import { GridTypes } from "./types";
import { BaseComponent } from "../../BaseComponent";

/**
 * TODO:
 * Right now this is a basic implementation with multiple themes.
 * We can have other type of button like with icon, loading etc
 */

export default class Grid extends BaseComponent {
  componentName = "Grid";
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
    this.componentName = "Grid";
  }

  render() {
    const { title, type } = this.props;

    // resolve types
    // type can have multiple values depend on need
    return (
      <View style={{ flex: 1, backgroundColor: "#f22" }}>
        <Consumer>
          {({ theme, toggleTheme }) => {
            // Get the styles from defined types
            componentTypes = GridTypes(theme);

            let { container, content, loading } = super.defineStyles();
            let { style, rows, cols, ...touchableProps } = this.props;

            let hitSlop = this.extractNonStyleValue(container, "hitSlop");

            if (hitSlop) touchableProps.hitSlop = hitSlop;

            return (
              <FlatList
                numColumns={cols}
                extraData={[
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20
                ]}
                data={[
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20
                ]}
                keyExtractor={item => item}
                renderItem={item => {
                  <Text
                    style={{ backgroundColor: "#ecc", color: "#fe2" }}
                    key={item}
                  >
                    {item}
                  </Text>;
                }}
                style={{ flex: 1, backgroundColor: "#2ff", height: 300 }}
              />
            );
          }}
        </Consumer>
      </View>
    );
  }
  _renderText = (text, style) => (
    <Text style={[style, this.props.contentStyle]}>{text}</Text>
  );

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

const styles = StyleSheet.create({});

/**
 * JSON.stringify(style)
 */
