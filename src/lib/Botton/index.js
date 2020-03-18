import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
// import Icon from '../Icon';
import {withTheme} from '../Theme';
import {StyleSheet} from 'react-native';

const Button = props => {
  const {
    theme,
    activeOpacity,
    disabled,
    children,
    style,
    textStyle,
    disabledStyle,
    disabledTextStyle,
    type,
    kind,
    uppercase,
    iconColor = StyleSheet.flatten(theme[`iconState_${type}`]).color,
    iconName,
    iconSize,
    iconActiveColor,
    iconPosition,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    // NOTE: injected by a Switcher
    selected,
    onChange,
    value,
  } = props;
  // NOTE: function onChange is injected by the Switcher component
  const switcherProp = onChange && {
    onPress: () => {},
    onPressOut: onChange.bind(null, value),
  };

  const touchableProps = {
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
  };

  const btnStyles = [
    theme.baseBtn,
    theme[`btn_kind_${kind}`],
    theme[`state_${type}`],
    style,
  ];

  const textStyles = [
    theme.baseText,
    theme[`text_kind_${kind}`],
    theme[`iconState_${type}`],
    textStyle,
    disabled ? disabledTextStyle : {},
  ];

  let leftIcon;
  let rightIcon;
  if (iconName) {
    const icon = (
      <Text
        name={iconName}
        size={iconSize}
        color={selected ? iconActiveColor : iconColor}
      />
    );
    leftIcon = iconPosition === 'left' && icon;
    rightIcon = iconPosition === 'right' && icon;
  }

  let content;
  if (children) {
    content = (
      <Text style={textStyles}>
        {uppercase ? children.toUpperCase() : children}
      </Text>
    );
  }
  delete btnStyles.color;
  return (
    <View style={[theme.container, disabled ? disabledStyle : {}]}>
      <TouchableOpacity
        {...touchableProps}
        {...switcherProp}
        disabled={disabled}
        style={btnStyles}
        activeOpacity={activeOpacity}
        accessibilityTraits="button"
        accessibilityComponentType="button">
        <View style={theme.innerContainer}>
          {leftIcon}
          {content}
          {rightIcon}
        </View>
      </TouchableOpacity>
    </View>
  );
};

Button.themeConfig = {
  props: {},
  style: {
    container: {flex: 1},
    baseBtn: {
      justifyContent: 'center',
      padding: 10,
      paddingHorizontal: 20,
    },
    baseText: {
      alignSelf: 'center',
      color: '@alternateTextColor',
      paddingHorizontal: 8,
      fontWeight: '600',
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn_kind_rounded: {
      borderRadius: 25,
      height: 40,
    },
    text_kind_rounded: {
      fontSize: 12,
      fontWeight: '600',
    },
    btn_kind_squared: {
      height: 40,
    },
    text_kind_squared: {
      fontSize: 12,
    },
    state_success: {
      backgroundColor: '@successLightColor',
    },
    state_danger: {
      backgroundColor: '@dangerLightColor',
    },
    state_primary: {
      backgroundColor: '@primaryLightColor',
    },
    state_naked: {
      backgroundColor: '@primaryLightColor',
    },

    iconState_success: {
      color: '@successColor',
    },
    iconState_danger: {
      color: '@dangerColor',
    },
    iconState_primary: {
      color: '@primaryColor',
    },
    iconState_naked: {
      color: '@primaryColor',
    },
  },
};

Button.propTypes = {
  activeOpacity: PropTypes.number,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabledStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabledTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.oneOf(['primary', 'danger', 'success', 'naked']),
  kind: PropTypes.oneOf(['rounded', 'squared']),
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onLongPress: PropTypes.func,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  iconActiveColor: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  uppercase: PropTypes.bool,
  theme: PropTypes.object,
  // NOTE: injected by a Switcher
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Button.defaultProps = {
  iconActiveColor: 'rgba(0, 0, 0, 0.5)',
  iconSize: 16,
  activeOpacity: 0.8,
  disabled: false,
  disabledStyle: {opacity: 0.3},
  type: 'primary',
  kind: 'rounded',
  onPress: () => {},
  onPressIn: () => {},
  onPressOut: () => {},
  onLongPress: () => {},
  iconPosition: 'right',
  uppercase: true,
};

export default withTheme('Button', Button);
