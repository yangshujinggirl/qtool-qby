import React, { Component } from "react";
import { Table, Form, Button, message } from "antd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import DragableBodyRow from "./components/BodyRow";
import { getColumns } from "./columns";
import {
  searchThemeApi,
  saveThemeApi
} from "../../../../services/cConfig/homeConfiguration/themeSet";
import "./index.less";
class ThemeSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeList: [],
      showThemeList: [],
      count: 0,
      loading:false,
    };
    this.components = {
      body: {
        row: DragableBodyRow
      }
    };
  }
  componentDidMount = () => {
    const { homepageModuleId } = this.props;
    searchThemeApi({ homepageModuleId }).then(res => {
      if (res.code == "0") {
        const showThemeList = this.formatList(res.themeListVo.showThemeList);
        this.setState({
          showThemeList,
          themeList: res.themeListVo.themeList,
          count: showThemeList.length
        });
      }
    });
  };
  formatList = showThemeList => {
    showThemeList &&
      showThemeList.map((item, index) => {
        item.key = index;
      });
    return showThemeList;
  };
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
  handleDelete = key => {
    const showThemeList = [...this.state.showThemeList];
    this.setState({
      showThemeList: showThemeList.filter(item => item.key !== key)
    });
  };
  //新增
  handleAdd = () => {
    let { showThemeList, count } = this.state;
    const newData = {
      key: count,
      frameDetailId: "",
      showThemeTitle: "",
      showSubtitle: "",
      showThemeStatusStr: ""
    };
    this.setState({
      showThemeList: [...showThemeList, newData],
      count: count + 1
    });
  };
  onSelectChange = (id, index) => {
    const { themeList, showThemeList } = this.state;
    const newList = themeList.filter(item => item.themeId == id);
    const newData = {
      frameDetailId: showThemeList[index].frameDetailId
        ? showThemeList[index].frameDetailId
        : null,
      showThemeTitle: newList[0].title,
      showSubtitle: newList[0].subtitle,
      showThemeStatusStr: newList[0].statusStr,
      showThemeId: id,
      key: showThemeList[index].key
    };
    showThemeList.splice(index, 1, newData);
    this.setState({
      showThemeList
    });
  };
  handleSubmit = () => {
    this.setState({
      loading:true
    });
    const { showThemeList } = this.state;
    const { homepageModuleId } = this.props;
    const list = [];
    showThemeList.map((item, index) => {
      list.push({
        themeId: item.showThemeId,
        frameDetailId: item.frameDetailId ? item.frameDetailId : null
      });
    });
    this.sendRequest(list, homepageModuleId);
  };
  sendRequest = (themeList, homepageModuleId) => {
    saveThemeApi({ homepageModuleId, themeList }).then(res => {
      if (res.code == "0") {
        message.success("保存成功");
        this.setState({
          loading:false
        });
      }
    });
  };
  render() {
    const { themeList, showThemeList,loading } = this.state;
    const columns = getColumns(
      this.props.form,
      this.handleDelete,
      themeList,
      this.onSelectChange
    );
    console.log(showThemeList);
    return (
      <div className="theme-list">
        <Table
          className="theme-list-table"
          bordered
          columns={columns}
          dataSource={showThemeList}
          components={this.components}
          pagination={false}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow,
            "data-row-key": record.key
          })}
          footer={
            showThemeList.length < 4
              ? () => (
                  <Button type="default" onClick={this.handleAdd}>
                    +新增
                  </Button>
                )
              : null
          }
        />
        <div className="save-btn">
          <Button loading={loading} type="primary" onClick={this.handleSubmit}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}
const ThemeSets = Form.create({
  mapPropsToFields(props) {
    return {
      showThemeId:Form.createFormField(props.showThemeList),
    };
  }
})(ThemeSet);
export default DragDropContext(HTML5Backend)(ThemeSets);
