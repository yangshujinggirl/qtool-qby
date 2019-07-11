import React, { Component } from "react";
import { Table, Form, Button, message } from "antd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import DragableBodyRow from "./components/BodyRow";
import { getColumns } from "./columns";
import { searchThemeApi,saveThemeApi } from "../../../../services/cConfig/homeConfiguration/themeSet";
import "./index.less";
class ThemeSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeList: [],
      showThemeList: [],
      count: 0
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
        if (res.code == "0") {
          const showThemeList = this.formatList(res.showThemeList);
          this.setState({
            showThemeList,
            themeList: res.themeList,
            count: showThemeList.length
          });
        }
      }
    });
    // const res = {
    //   code: "0",
    //   themeList: [
    //     { themeId: 1, title: "skdjfld", subtitle: "范文芳", statusStr: "上线" },
    //     { themeId: 2, title: "skdjfld", subtitle: "范文芳", statusStr: "上线" },
    //     { themeId: 3, title: "skdjfld", subtitle: "范文芳", statusStr: "上线" },
    //     { themeId: 4, title: "skdjfld", subtitle: "范文芳", statusStr: "上线" }
    //   ],
    //   showThemeList: [
    //     {
    //       frameDetailId: 1,
    //       showThemeId: 1,
    //       showThemeTitle: "主标题",
    //       showSubtitle: "标题",
    //       showThemeStatusStr: "线"
    //     },
    //     {
    //       frameDetailId: 2,
    //       showThemeId: 2,
    //       showThemeTitle: "主题",
    //       showSubtitle: "标题",
    //       showThemeStatusStr: "上线"
    //     },
    //     {
    //       frameDetailId: 3,
    //       showThemeId: 3,
    //       showThemeTitle: "主标题",
    //       showSubtitle: "标题",
    //       showThemeStatusStr: "上"
    //     },
    //     {
    //       frameDetailId: 4,
    //       showThemeId: 4,
    //       showThemeTitle: "主题",
    //       showSubtitle: "标题",
    //       showThemeStatusStr: "上线"
    //     }
    //   ]
    // };
    
   
  };
  formatList = showThemeList => {
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
    const { showThemeList } = this.state;
    const {homepageModuleId} = this.props
    const list = [];
    const themeList = showThemeList.map(item => {
      return [
        ...list,
        {
          themeId: item.showThemeId,
          frameDetailId: item.frameDetailId ? item.frameDetailId : null
        }
      ];
    });
    this.sendRequest(themeList,homepageModuleId)
  };
  sendRequest=(themeList)=>{
    saveThemeApi({homepageModuleId,themeList}).then(res=>{
      if(res.code == '0'){
        message.success('保存成功')
      }
    })
  }
  render() {
    const { themeList, showThemeList } = this.state;
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
          footer={() => (
            <Button type="default" onClick={this.handleAdd}>
              +新增
            </Button>
          )}
        />
        <div className="save-btn">
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </div>
      </div>
    );
  }
}
const ThemeSets = Form.create({})(ThemeSet);
export default DragDropContext(HTML5Backend)(ThemeSets);
