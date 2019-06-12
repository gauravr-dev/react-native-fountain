import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

export default (DayItem = props => {
  
  let { item, size, isCurrent, blank } = props;

  const Touchable = blank ? View :
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
    
  return (
    <Touchable key={item.key}>
      <View
        style={StyleSheet.flatten([
          {
            width: size.width,
            height: size.height,
            padding:1
          },
          styles.day,
          isCurrent && styles.currentDay
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
            {blank ? "" : item.key}
          </Text>
        </View>
      </View>
    </Touchable>
  );
});

let styles = StyleSheet.create({
  dayItem: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  day: {
    backgroundColor: "#aff"
  },
  currentDay: {
    backgroundColor: "#eaf"
  }
});
