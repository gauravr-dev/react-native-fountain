import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

import Button from "./lib/Button";
import {
  Provider as ThemeProvider,
  Consumer,
  themes
} from "./lib/ThemeProvider";

export default class App extends Component {
  state = {
    theme: themes.default
  };

  toggleTheme = () => {};

  render() {
    return (
      <ThemeProvider
        value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
      >
        <View style={styles.container}>
          <Text>Welcome to React Native!</Text>

          <Button title={"Primary"} />
          <Button title={"Danger"} />
          <Button title={"Cancel"} />
          <Button title={"Info"} />
          <Button title={"Success"} />
          <Button title={"Fail"} />

          {/* <ThemeContext.Consumer>
            {({ toggleTheme }) => (
              <ThemedButton title="Toggle theme" onPress={toggleTheme} />
            )}
          </ThemeContext.Consumer> */}
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

// class ThemedButton extends React.Component {
//   render() {
//     let { title, ...props } = this.props;
//     return (
//       <TouchableOpacity {...props}>
//         <ThemeContext.Consumer>
//           {({ theme }) => (
//             <Text style={{ color: theme.fontColor }}>{title}</Text>
//           )}
//         </ThemeContext.Consumer>
//       </TouchableOpacity>
//     );
//   }
// }
