import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default (WeekLegend = props => {
  let { day, size } = props;
  return (
    <View
      key={"day" + day}
      style={StyleSheet.flatten([
        {
          width: size.width,
          height: size.height,
          padding: 1
        },
        styles.legend
      ])}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            textAlign: "center"
          }}
        >
          {day}
        </Text>
      </View>
    </View>
  );
});

let styles = StyleSheet.create({
  legend: {
    backgroundColor: "#a3f"
  }
});
