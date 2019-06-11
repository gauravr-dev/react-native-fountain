import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Button
} from "react-native";

import { Provider, Consumer, themes } from "../../ThemeProvider";
import { GridTypes } from "./types";
import { BaseComponent } from "../../BaseComponent";

import moment from "moment";

// import { range } from "moment-range";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

let itemSize = { width: width / 7, height: height / 9 };

/**
 * TODO:
 * Right now this is a basic implementation with multiple themes.
 * We can have other type of button like with icon, loading etc
 */

export default class EventCalender extends Component {
  componentName = "EventCalender";
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
    this.componentName = "EventCalender";
    this.state = {
      showCalendarTable: true,
      showMonthTable: false,
      dateObject: moment(),
      allmonths: moment.months(),
      showYearNav: false,
      selectedDay: null
    };
  }

  componentDidMount() {
    this.setState({
      showCalendarTable: true,
      showMonthTable: false,
      dateObject: moment(),
      allmonths: moment.months(),
      showYearNav: false,
      selectedDay: null
    });
  }

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };

  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d");
    return firstDay;
  };

  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable
    });
  };

  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable
    });
  };

  onPrev = () => {
    let curr = "month";

    // if (this.state.showMonthTable == true) {
    //   curr = "year";
    // } else {
    //   curr = "month";
    // }

    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr)
    });
  };

  onNext = () => {
    let curr = "month";

    // if (this.state.showMonthTable == true) {
    //   curr = "year";
    // } else {
    //   curr = "month";
    // }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr)
    });
  };

  onYearChange = e => {
    this.setYear(e.target.value);
  };

  setYear = year => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearNav: !this.state.showYearNav,
      showMonthTable: !this.state.showMonthTable
    });
  };

  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }

  onDayClick = (e, d) => {
    this.setState(
      {
        selectedDay: d
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
      }
    );
  };

  render() {
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(this._renderItem({ key: "" }));
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      daysInMonth.push(this._renderItem({ key: d }));
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        rows.push(this._renderColumns(cells)); // when reach next week we contain all td in last week to rows
        cells = []; // empty container
        cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) {
        // when end loop we add remain date
        rows.push(this._renderColumns(cells));
      }
    });

    // resolve types
    // type can have multiple values depend on need
    return (
      <Consumer>
        {({ theme, toggleTheme }) => {
          return (
            <ScrollView
              style={{ backgroundColor: "#fff", width: width }}
              contentContainerStyle={{
                flexGrow: 1
              }}
            >
              {this._renderHeader()}
              <View
                style={{
                  backgroundColor: "#fff",
                  width: width,
                  flexDirection: "row"
                }}
              >
                {this._renderWeekdays()}
                {rows}
              </View>
            </ScrollView>
          );
        }}
      </Consumer>
    );
  }

  /// Header will have month name
  /// Pre-Next buttons
  /// Button to change year
  /// Other stuff
  _renderHeader = () => {
    return (
      <View style={{ height: 50, flexDirection: "row" }}>
        <Text>{this.state.dateObject.month}</Text>
        <Button onPress={this.onPrev} title={"Prev"} />
        <Button onPress={this.onNext} title={"Next"} />
      </View>
    );
  };

  _renderRow = items => {
    return <View style={{ flexDirection: "row" }}>{items}</View>;
  };

  _renderColumns = items => {
    return <View style={{ flexDirection: "column" }}>{items}</View>;
  };

  _renderItem = item => {
    return (
      <View
        key={item.key}
        style={{
          width: itemSize.width,
          height: itemSize.height,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#aff"
        }}
      >
        <Text
          style={{
            alignContent: "center"
          }}
        >
          {item.key}
        </Text>
      </View>
    );
  };

  _renderWeekdays = () => {
    weekdayshort = moment.weekdaysShort();

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        {weekdayshort.map(day => {
          return (
            <View
              key={day}
              style={{
                width: itemSize.width,
                height: itemSize.height,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff"
              }}
            >
              <Text
                style={{
                  backgroundColor: "#fff"
                }}
              >
                {day}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
}

let style = StyleSheet.create({
    dayItem:{

    },
    legend:{

    },
    day:{

    },
    currentDay:{
        
    }
})