import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";

import Button from "./lib/Button";
import {
  Provider as ThemeProvider,
  Consumer,
  themes
} from "./lib/ThemeProvider";
import Grid from "./lib/complex_components/Grid";
import EventCalender from "./lib/complex_components/EventCalender";

export default class App extends Component {
  state = {
    theme: themes.default
  };

  toggleTheme = () => {};

  _renderItem = key => {
    let cellKey = "cell" + key;
    return (
      <View
        key={cellKey}
        style={{
          flex: 1,
          backgroundColor: "#ff4",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1
        }}
      >
        <Text style={{ textAlign: "center" }}>{cellKey}</Text>
      </View>
    );
  };

  render() {
    return (
      <ThemeProvider
        value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
      >
        <SafeAreaView style={styles.container}>
          {/* <Text>Welcome to React Native!</Text>
          <Button type={"outline"} loading>
            Primary
          </Button> */}
          <View style={{ height: 10 }} />

          <Grid
            cols={2}
            rows={6}
            renderCell={(key) => {
              let cellKey = "cell" + key;
              return (
                <View
                  key={cellKey}
                  style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ textAlign: "center" }}>{cellKey}</Text>
                </View>
              );
            }}
          />

          {/* <Grid cols={5} rows={6} /> */}
          {/* 
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

          <Button type={"outline"} title={"Success"} />
          <View style={{ height: 10 }} />

          <Button type={"info"} title={"Fail"} /> */}

          {/* <ThemeContext.Consumer>
            {({ toggleTheme }) => (
              <ThemedButton title="Toggle theme" onPress={toggleTheme} />
            )}
          </ThemeContext.Consumer> */}
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
