import React from "react";
import {
  Text,
  TextInput,
  ViewPropTypes,
  Platform,
  View
} from "react-native";
import PropTypes from "prop-types";
import { BaseComponent } from "../BaseComponent";
import { Provider, Consumer, themes } from "../ThemeProvider";
import { TextInputTypes } from "./types";

export default class FTTextInput extends BaseComponent {
  static propTypes = {
    editable: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    style: ViewPropTypes.style,
    inputStyle: ViewPropTypes.style
  };
  static defaultProps = {
    editable: true,
    label: null,
    style: null,
    inputStyle: null
  };
  componentName = "TextInput";
  typeMapping = {
    container: {
      underlineWidth: "borderBottomWidth",
      underlineColor: "borderBottomColor"
    },
    input: {
      color: "color",
      inputBackgroundColor: "backgroundColor",
      placeholderTextColor: "placeholderTextColor"
    },
    label: {
      labelColor: "color",
      labelFontSize: "fontSize"
    }
  };

  _focusInput = () => {
    if (this.props.editable) {
      this.inputRef.focus();
    }
  };

  // renderLabel(label, labelStyle) {
  //   if (typeof label === "string") {
  //     return (
  //       <Text style={labelStyle} onPress={this._focusInput}>
  //         {label}
  //       </Text>
  //     );
  //   }
  //   return React.cloneElement(label, {
  //     onPress: e => {
  //       if (label.props.onPress) {
  //         label.props.onPress(e);
  //       } else {
  //         this.inputRef.focus();
  //       }
  //     },
  //     style: [labelStyle, label.props.style]
  //   });
  // }

  render() {
      // Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <View>
        <Consumer>
          {/*({ theme, toggleTheme }) => {
            // Get the styles from defined types
            componentTypes = TextInputTypes(theme);

            const { style, label, inputStyle, ...inputProps } = this.props;
            const {
              container: boxStyle,
              input,
              label: labelS
            } = this.defineStyles();
            const placeholderColor = this.extractNonStyleValue(
              input,
              "placeholderTextColor"
            );
            inputProps.labelStyle = [labelS, inputProps.labelStyle];
            inputProps.style = [input, inputStyle];
            inputProps.placeholderTextColor = placeholderColor;
            boxStyle.push(style);

            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={this._focusInput}
                style={boxStyle}
              >
                {label && this.renderLabel(label, inputProps.labelStyle)}
                <TextInput
                  underlineColorAndroid="transparent"
                  ref={inputValue => {
                    this.inputRef = inputValue;
                  }}
                  {...inputProps}
                />
              </TouchableOpacity>
            );
          }}
          */}
        </Consumer>
      </View>
    );
  }
}
