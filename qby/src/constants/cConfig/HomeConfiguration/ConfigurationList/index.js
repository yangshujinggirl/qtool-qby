import React, { Component } from "react";
import { Button, Modal, message } from "antd";
import { connect } from "dva";
import Qtable from "../../../../components/Qtable";
import Qpagination from "../../../../components/Qpagination";
import { addVersionApi,versionBanApi } from "../../../../services/cConfig/homeConfiguration/configurationList";
import FilterForm from "./components/FilterForm";
import AddModal from "./components/AddModal";
import { IndexColumns } from "./columns";

import "./index.less";
class ConfigurationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataSource: [],
      versionList: [],
      inputValues: {},
      doubleVisible: false
    };
  }
  componentDidMount() {
    this.getList();
  }
  getList() {
    this.props.dispatch({
      type: "homeConfig/fetchList",
      payload: {}
    });
  }
  //点击搜索
  searchData = values => {
    console.log(this.props);
    this.props.dispatch({
      type: "homeConfig/fetchList",
      payload: values
    });
    this.setState({
      inputValues: values
    });
  };
  //操作区
  onOperateClick = (record, type) => {
    switch (type) {
      case "info":
        this.goInfo(record);
        break;
      case "edit":
        this.goEdit(record.key);
        break;
      case "ban":
        this.goBan(record);
        break;
      case "log":
        this.goLog(record);
        break;
    }
  };
  //查看详情
  goInfo(record) {
    const { componkey } = this.props;
    const paneitem = {
      title: "详情",
      key: `${componkey}homeinfo-search`,
      data: {}
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  }
  //编辑
  goEdit = key => {
    const { componkey } = this.props;
    const paneitem = {
      title: "商品编辑",
      key: `${componkey}home`,
      componkey: `${componkey}home`,
      data: {}
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  //禁用
  goBan(record) {
    this.setState({
      doubleVisible:true,
      status:record.status,
      homepageId:record.homepageId
    });
  }
  //确定禁用
  onBanOk =(record)=> {
    const {homepageId} = this.state;
    versionBanApi({homepageId}).then(res=>{
      if(res.code == 0){
        this.setState({
          doubleVisible:false
        });
        this.props.dispatch({
          type: "homeConfig/fetchList",
          payload: {...this.state.inputValues}
        });
      };
    })
  }
  onBanCancel =()=> {
    this.setState({
      doubleVisible:false
    })
  }
  //日志
  goLog(record) {
    console.log(record);
  }
  //新建
  goAdd = () => {
    this.setState({ visible: true });
  };
  //新增首页版本
  onOk = (values, resetForm) => {
    addVersionApi(values)
    .then(res => {
      if (res.code == "0") {
        debugger
        const { homepageId } =res;
        const { componkey } = this.props;
        const paneitem = {
          title: "商品编辑",
          key: `${componkey}home`,
          componkey: `${componkey}home`,
          data: {
            homepageId:homepageId
          }
        };
        this.props.dispatch({
          type: "tab/firstAddTab",
          payload: paneitem
        });
        this.setState({ visible: false });
        // resetForm();//报错
      }
    });
  };
  //取消新增首页版本
  onCancel = resetForm => {
    resetForm();
    this.setState({ visible: false });
  };
  render() {
    const { status,visible, versionList, doubleVisible } = this.state;
    const { dataList } = this.props;
    return (
      <div className="qtools-components-pages configuration-List-pages">
        <FilterForm submit={this.searchData} />
        <div className="handel-btn-lists">
          <Button size="large" type="primary" onClick={this.goAdd}>
            新增首页版本
          </Button>
        </div>
        <Qtable
          onOperateClick={this.onOperateClick}
          dataSource={dataList}
          columns={IndexColumns}
        />
        <AddModal
          versionList={versionList}
          onOk={this.onOk}
          onCancel={this.onCancel}
          visible={visible}
        />
        <Modal
          wrapClassName='model_center'
          title='版本禁用'
          visible={doubleVisible}
          onOk={this.onBanOk}
          onCancel={this.onBanCancel}>
          {status == 2 ? (
            <span>
              当前版本处于待发布状态，禁用后将不会发布到线上，您确定禁用此版本么？
            </span>
          ) : (
            <span>当前版本禁用后将不继续编辑，您确定禁用此版本么？</span>
          )}
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { homeConfig } = state;
  return homeConfig;
}
export default connect(mapStateToProps)(ConfigurationList);
