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
import DayItem from "./DayItem";
import WeekLegend from "./WeekLegend";

// import { range } from "moment-range";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

// let itemSize = { width: width / 7, height: height / 9 };

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

    this.itemSize = this.getItemSize();
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

  getItemSize = () => {
    let cols = this.weeksInMonth() + 1;
    return { width: width / cols, height: width / cols };
  };

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("YYYY");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };

  currentMonth = () => {
    return this.state.dateObject.format("MMMM");
  };

  weeksInMonth = () => {
    // this.daysInMonth();
    let firstday = this.firstDayOfMonth();
    let inmonth = this.daysInMonth();

    let days = parseInt(firstday) + parseInt(inmonth);
    let weeks = Math.floor(days / 7);
    if (days % 7 != 0) {
      weeks = weeks + 1;
    }
    return weeks;
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
    // this.setYear(e.target.value);
  };

  onMonthChange = e => {
    // this.setYear(e.target.value);
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
    this.itemSize = this.getItemSize();

    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(this._renderBlank({ key: "blank" + i }, this.itemSize));
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      daysInMonth.push(this._renderItem({ key: d }, this.itemSize));
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
                {this._renderWeekdays(this.itemSize)}
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
      <View
        style={{
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Button onPress={this.onPrev} title={"Prev"} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button onPress={this.onMonthChange()} title={this.currentMonth()} />
          <Button onPress={this.onYearChange()} title={this.year()} />
        </View>
        <View>
          <Button onPress={this.onNext} title={"Next"} />
        </View>
      </View>
    );
  };

  _renderRow = items => {
    return <View style={{ flexDirection: "row" }}>{items}</View>;
  };

  _renderColumns = items => {
    return <View style={{ flexDirection: "column" }}>{items}</View>;
  };

  _renderItem = (item, size) => {
    return <DayItem item={item} size={size} />;
  };

  _renderBlank = (item, size) => {
    return <DayItem item={item} size={size} blank/>;
  };

  _renderWeekdays = itemSize => {
    weekdayshort = moment.weekdaysShort();

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        {weekdayshort.map(day => {
          return <WeekLegend day={day} size={itemSize} />;
        })}
      </View>
    );
  };
}

let styles = StyleSheet.create({
  dayItem: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});
