import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

import { Provider, Consumer, themes } from "../../ThemeProvider";
import { GridTypes } from "./types";
import { BaseComponent } from "../../BaseComponent";


let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;


export default class Grid extends BaseComponent {
  componentName = "Grid";
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
    this.componentName = "Grid";
  }

  render() {
    // resolve types
    // type can have multiple values depend on need
    return (
      <Consumer>
        {({ theme, toggleTheme }) => {
          // Get the styles from defined types
          componentTypes = GridTypes(theme);

          let { container, content, loading } = super.defineStyles();
          let {
            style,
            rows,
            cols,
            mode,
            renderCell,
            ...touchableProps
          } = this.props;

          {
            /* let hitSlop = this.extractNonStyleValue(container, "hitSlop"); 
            if (hitSlop) touchableProps.hitSlop = hitSlop;
            */
          }

          return (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1}}>
                {this._renderGrid(rows, cols, this._renderCell)}
              </View>
            </View>
          );
        }}
      </Consumer>
    );
  }

  _renderGrid = (rowsCount, colsCount, renderCell) => {
    let rows = Array(rowsCount).fill("row");
    return rows.map((item, rowIndex) => {
      return this._renderRow(rowIndex, colsCount, renderCell);
    });
  };

  _renderRow = (rowIdx, columnsCount, renderCell) => {
    let columns = Array(columnsCount).fill("column");
    idx = 0;
    return (
      <View style={{ flex: 1, flexDirection: "row"}}>
        {columns.map((item, index) => {
          return renderCell(rowIdx + "" + index);
        })}
      </View>
    );
  };

  _renderColumn = (colIdx, rowsCount, renderCell) => {
    let rows = Array(rowsCount).fill(1);
    idx = 0;
    return (
      <View style={{ flex: 1, flexDirection: "column", padding: 1, backgroundColor: "#f44" }}>
        {rows.map((item, index) => {
          idx += 1;
          return renderCell(idx);
        })}
      </View>
    );
  };

  _renderCell = key => {
    let cellKey = "cell" + key;
    return (
      <View
        key={cellKey}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth:1
        }}
      >
        <Text style={{ textAlign: "center" }}>{cellKey}</Text>
      </View>
    );
  };

  /**
   * IndexPath is the cell identity in the Grid/Table.
   * For example: If cell is in 1 row and 2 column than indexPath = {row:1, column:2}
   */
  layoutForItemAtIndex = (indexPath)=>{
    let { row, column } = indexPath
    return {width:50, height:50}
  }
}

const styles = StyleSheet.create({});

/**
 * JSON.stringify(style)
 */
