import React, { Component } from 'react';
import React, { Component } from "react";
import { Table, Form, Button, message } from "antd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import DragableBodyRow from "./components/BodyRow";

class TemTable extends Component {
    moveRow = (dragIndex, hoverIndex) => {
        const { showThemeList } = this.state;
        const dragRow = showThemeList[dragIndex];
        this.setState(
          update(this.state, {
            showThemeList: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
            }
          })
        );
    };
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default TemTable;