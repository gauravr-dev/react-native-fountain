import React from "react";
import { Platform } from "react-native";

export class BaseComponent extends React.Component {
  /**
   * {string} Name of component. Should be overridden in inherited component.
   */
  componentName = "";

  /**
   * {object} Mapping which used for defining predefined properties such as `color` in `Button`. Can be overridden in inherited component
   */
  typeMapping = {};

  /**
   * {string} Default component style name. Can be overridden in inherited component
   */
  baseStyle = "_base";

  /**
   * {string} Default type name for component. Can be overridden in inherited component.
   */
  defaultType = "basic";

  /**
   * {string} Default typeMappingElement for component. Will be taken first element if not defined. Can be overridden in inherited component.
   */
  defaultTypeMappingElement = undefined;

  componentTypes = {};

  /**
   * Used to collect and compile all types into styles. Returns object with styles for all internal components.
   * @param {string} additionalTypes - Sometimes inherited component need to apply additional type implicitly.
   * For example - if component state is `selected` component may ask about `selected` type.
   * @returns {object} styles - Object with compiled styles for each internal component.
   */
  defineStyles(additionalTypes) {
    let typesString = this._getTypesString(this.props.type || "");
    additionalTypes = this._getTypesString(additionalTypes);
    let types = this._getTypesString([
      this.defaultType,
      typesString,
      additionalTypes
    ]);
    types = types && types.length ? types.split(" ") : [];
    return this._getTypes(types);
  }

  /**
   * Extracts property value from type. Often used if need to control non-style properties using types.
   * Example: `placeholderTextColor` of `TextInput` component. For some reason this setting should be passed separately from `style` prop.
   * So we keep `placeholderTextColor` as style property of `textInput` but before applying to internal `TextInput` - we extract this value and pass it to according prop. For more details, see Customization section.
   *
   * @param {object} style - Style which contains non-style property
   * @param {string} property - name of property that should be extracted.
   * @returns {object} value of extracted property
   */
  extractNonStyleValue(style, property) {
    let val = style.find(e => e.hasOwnProperty(property));
    if (val) {
      style.splice(style.indexOf(val), 1);
    } else {
      return val;
    }
    return val[property];
  }

  _getTypesString(types) {
    let typesString = types;
    if (Array.isArray(types)) {
      typesString = types.join(" ");
    }
    return typesString;
  }

  _getStyleValue(value) {
    if (typeof value === "object" && value !== null) {
      if (value.hasOwnProperty(Platform.OS)) {
        value = this._getStyleValue(value[Platform.OS]);
      }
    } else if (typeof value === "function") {
      value = value(theme.current);
    }
    return value;
  }

  _getTypes(types) {
    let usedTypes = this._getUsedTypes(types);
    // let componentTypes = TypeManager.types(theme.current)[this.componentName] || [];
    let styles = {};
    let baseStyle = componentTypes[this.baseStyle];

    if (baseStyle) {
      usedTypes = [baseStyle, ...usedTypes];
    }

    usedTypes.forEach(usedType => {
      for (let key in usedType) {
        if (this.typeMapping.hasOwnProperty(key)) {
          this.fillElementStyles(styles, key, usedType[key]);
        } else {
          let element =
            this.findTypeMappingElementByKey(key, this.typeMapping) ||
            this.defaultTypeMappingElement ||
            this.typeMapping.keys()[0];
          this.fillElementStyle(styles, element, key, usedType[key]);
        }
      }
    });

    return styles;
  }

  fillElementStyle(styles, element, key, value) {
    this.createStyleIfNotExists(styles, element);
    let styleKey = this.typeMapping[element][key];
    if (!styleKey) styleKey = key;
    let styleValue = this._getStyleValue(value);
    this._mergeStyles(styles[element], styleKey, styleValue);
  }

  fillElementStyles(styles, element, value) {
    for (let styleKey in value) {
      this.fillElementStyle(styles, element, styleKey, value[styleKey]);
    }
  }

  createStyleIfNotExists(styles, key) {
    styles[key] === undefined && (styles[key] = []);
  }

  findTypeMappingElementByKey(key, typeMapping) {
    let resultComplexStyle;
    for (let complexStyle in typeMapping) {
      if (typeMapping[complexStyle].hasOwnProperty(key)) {
        resultComplexStyle = complexStyle;
        break;
      }
    }
    return resultComplexStyle;
  }

  _mergeStyles(element, styleKey, value) {
    //merge styles in order to have only one value for each property
    let index = element.findIndex(e => e.hasOwnProperty(styleKey));
    if (index >= 0) element[index][styleKey] = value;
    else element.push({ [styleKey]: value });
  }

  _getUsedTypes(types) {
    let usedTypes = [];
    // let componentTypes = TypeManager.types(theme.current)[this.componentName] || [];
    types.forEach(type => {
      if (componentTypes[type]) usedTypes.push(componentTypes[type]);
    });
    return usedTypes;
  }
}
