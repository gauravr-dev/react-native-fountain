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
import FTTextInput from "./lib/TextInput/index";

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

          <FTTextInput label={"Placeholder"}></FTTextInput>

          <View style={{ height: 10 }} />

          <Button type={"text"} loading>Text</Button>

          <Button type={"Primary"} loading>
            Primary
          </Button>
          <View style={{ height: 10 }} />

          <Button type={"rounded"}>rounded</Button>
          <View style={{ height: 10 }} />

          <Button type={"circle"}>circle</Button>
          <View style={{ height: 10 }} />

          <Button type={"primary"} title={"Primary"} />
          <View style={{ height: 10 }} />

          <Button type={"danger"} title={"Danger"} />
          <View style={{ height: 10 }} />

          <Button type={"primary"} warning title={"Cancel"} />
          <View style={{ height: 10 }} />

          <Button type={"success"} title={"Info"} />
          <View style={{ height: 10 }} />

          <Button type={"outline"} title={"Outline"} loading/>
          <View style={{ height: 10 }} />

          <Button type={"info"} title={"Fail"} />

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


/// xcrun simctl list devices