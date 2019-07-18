import React, { Component } from "react";
import {message} from 'antd'
import {saveApi,getInfoApi} from "../../../../services/cConfig/homeConfiguration/newUser";
import Content from './components/NewUserSet'
import moment from "moment";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList1: [],
      fileList2: [],
      optionList: [],
      couponList: []
    };
  }
  componentDidMount = () => {
    this.getCouponList();
  };
  //选择框的优惠券
  getOptionList = () => {
    getListApi({ couponUseScene: 3, status: 1 }).then(res => {
      if (res.code == 0) {
        this.setState({
          optionList: res.iPdCoupon
        });
      }
    });
  };
  //初始化数据
  getCouponList = () => {
    getInfoApi({ homepageModuleId: this.props.data.homepageModuleId }).then(
      res => {
        if (res.code == "0") {
          let {
            couponList,
            newComerPicUrl,
            backgroupColor,
            couponPopUpPicUrl,
            receiveTimeInterval,
            beginTime,
            endTime
          } = res.newUserGiftVo;
          const optionList = _.cloneDeep(couponList);
          const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
          let [fileList1, fileList2] = [[], []];
          if (newComerPicUrl) {
            fileList1 = [
              {
                uid: "-1",
                status: "done",
                url: fileDomain + newComerPicUrl
              }
            ];
          };
          if (couponPopUpPicUrl) {
            fileList2 = [
              {
                uid: "-1",
                status: "done",
                url: fileDomain + couponPopUpPicUrl
              }
            ];
          }
          if(!res.newUserGiftVo.newUserGiftId){//如果是第一次就为空
            couponList = []
          };
          couponList[0] && couponList.map((item, index) => (item.key = index));
          this.setState({
            optionList,
            couponList,
            newComerPicUrl,
            backgroupColor,
            couponPopUpPicUrl,
            receiveTimeInterval,
            beginTime,
            endTime,
            fileList1,
            fileList2
          });
        }
      }
    );
  };
  //修改新人礼图片
  changeUserImg = fileList => {
    let newComerPicUrl = "";
    if (
      fileList[0] &&
      fileList[0].status == "done" &&
      fileList[0].response.code == "0"
    ) {
      newComerPicUrl = fileList[0].response.data[0];
    }
    this.setState({
      newComerPicUrl,
      fileList1: fileList
    });
  };
  //修改优惠券图片
  changeCouponImg = fileList => {
    let couponPopUpPicUrl = "";
    if (
      fileList[0] &&
      fileList[0].status == "done" &&
      fileList[0].response.code == "0"
    ) {
      couponPopUpPicUrl = fileList[0].response.data[0];
    }
    this.setState({
      couponPopUpPicUrl,
      fileList2: fileList
    });
  };
  //发送保存请求
  sendRequest = values => {
    saveApi(values).then(res => {
      if (res.code == "0") {
        message.success("保存成功");
      }
    });
  };
  handleSubmit = (form) => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const _values = this.formateValues(values);
        if (_values) {
          this.sendRequest(_values);
        }
      }
    });
  };
  //格式化数据
  formateValues = values => {
    const { newComerPicUrl, couponPopUpPicUrl } = this.state;
    if (!newComerPicUrl) {
      message.error("请先上传新人礼图片", 0.8);
      return null;
    }
    if (!couponPopUpPicUrl) {
      message.error("请先上传优惠券弹窗背景图", 0.8);
      return null;
    }
    const { time, ..._values } = values;
    _values.homepageModuleId = this.props.data.homepageModuleId;
    _values.couponPopUpPicUrl = couponPopUpPicUrl;
    _values.newComerPicUrl = newComerPicUrl;
    _values.couponIds = _values.couponIds.join(",");
    if (time && time[0]) {
      _values.beginTime = moment(time[0]).format("YYYY-MM-DD HH:mm");
      _values.endTime = moment(time[1]).format("YYYY-MM-DD HH:mm");
    }
    return _values;
  };
  //更改优惠券列表
  handleCallback = couponList => {
    this.setState({
      couponList
    });
  };
  //优惠券发生变化
  onSelectChange = (couponId, currentIndex) => {
    const { optionList, couponList } = this.state;
    optionList.map((item, index) => {
      if (item.couponId == couponId) {
        couponList[currentIndex].couponId = optionList[index].couponId;
        couponList[currentIndex].couponName = optionList[index].couponName;
        couponList[currentIndex].couponMoney = optionList[index].couponMoney;
        couponList[currentIndex].couponGiveCount = optionList[index].couponGiveCount;
        couponList[currentIndex].couponFullAmount = optionList[index].couponFullAmount;
      }
    });
    this.setState({
      couponList
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  lookExa = () => {
    this.setState({
      visible: true
    });
  };
  render() {
    const {
      fileList1,
      fileList2,
      optionList,
      couponList,
      backgroupColor,
      receiveTimeInterval,
      beginTime,
      endTime,
      visible
    } = this.state;
    return (
     <Content 
      fileList1={fileList1}
      fileList2={fileList2}
      optionList={optionList}
      couponList={couponList}
      backgroupColor={backgroupColor}
      receiveTimeInterval={receiveTimeInterval}
      beginTime={beginTime}
      endTime={endTime}
      visible={visible}
      changeUserImg={this.changeUserImg}
      changeCouponImg={this.changeCouponImg}
      lookExa={this.lookExa}
      handleCallback={this.handleCallback}
      handleSubmit={this.handleSubmit}
      onCancel={this.onCancel}
      onSelectChange={this.onSelectChange}
     />
    )
  }
}

export default Index;
