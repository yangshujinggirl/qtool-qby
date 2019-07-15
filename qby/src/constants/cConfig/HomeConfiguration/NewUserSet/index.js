import React, { Component } from "react";
import {
  Button,
  Form,
  Select,
  Input,
  DatePicker,
  Tooltip,
  Icon,
  message,
  Modal
} from "antd";
import UploadNew from "../components/UploadImg";
import UploadCoupon from "../components/UploadImg";
import BaseDelTable from "../components/BaseDelTable";
import {
  saveApi,
  getInfoApi
} from "../../../../services/cConfig/homeConfiguration/newUser";
import {
  getListApi,
  getCouponInfoApi
} from "../../../../services/activity/coupon";
import { getColumns } from "./columns";
const { RangePicker } = DatePicker;
import moment from "moment";
const FormItem = Form.Item;
const Option = Select.Option;
import "./index.less";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComerPicUrl: "",
      couponPopUpPicUrl: "",
      optionList: [],
      couponList: []
    };
  }
  componentDidMount = () => {
    this.getOptionList();
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
    getInfoApi({ homepageModuleId: 1 }).then(res => {
      if (res.code == "0") {
        const {
          couponList,
          newComerPicUrl,
          backgroupColor,
          couponPopUpPicUrl,
          receiveTimeInterval,
          beginTime,
          endTime
        } = res.newUserGiftVo;
        couponList.map((item, index) => (item.key = index));
        this.setState({
          couponList,
          newComerPicUrl,
          backgroupColor,
          couponPopUpPicUrl,
          receiveTimeInterval,
          beginTime,
          endTime
        });
      }
    });
  };
  //修改新人礼图片
  changeUserImg = newComerPicUrl => {
    this.setState({
      newComerPicUrl
    });
  };
  //修改优惠券图片
  changeCouponImg = couponPopUpPicUrl => {
    this.setState({
      couponPopUpPicUrl
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
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
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
  onSelectChange = (couponId, key) => {
    const { couponList } = this.state;
    const index = couponList.findIndex(item => item.key == key);
    couponList[index].couponId = couponId;
    getCouponInfoApi({ couponId }).then(res => {
      if (res.code == "0") {
        couponList[index].couponId = couponId;
        couponList[index].couponName = res.couponName;
        couponList[index].couponMoney = res.couponMoney;
        couponList[index].couponGiveCount = res.couponGiveCount;
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
  lookExa=()=>{
    this.setState({
      visible:true
    })
  }
  render() {
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 }
    };
    const {
      newComerPicUrl,
      couponPopUpPicUrl,
      optionList,
      couponList,
      backgroupColor,
      receiveTimeInterval,
      beginTime,
      endTime,
      visible
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = getColumns(
      this.props.form,
      optionList,
      this.onSelectChange
    );
    return (
      <div className="new_user">
        <div className="title">新人礼设置</div>
        <Form>
          <FormItem className="must-pic" label="新人礼图片" {...formLayout}>
            <UploadNew
              describe="686*114"
              imageUrl={newComerPicUrl}
              changeImg={this.changeUserImg}
              exampleImg={require("../../../../assets/1.jpg")}
              width={686}
              height={114}
            />
          </FormItem>
          <FormItem
            className="must-pic"
            label="优惠券弹窗背景图"
            {...formLayout}
          >
            <div className='coupon-img'>
              <UploadCoupon
                describe="686*114"
                imageUrl={couponPopUpPicUrl}
                changeImg={this.changeCouponImg}
                exampleImg={require("../../../../assets/bg.png")}
                width={686}
                height={114}
              />
              <a onClick={this.lookExa} className="look-exa">查看示例</a>
            </div>
          </FormItem>
          <FormItem {...formLayout} label={timeTips}>
            {getFieldDecorator("time", {
              initialValue: beginTime
                ? [moment(beginTime), moment(endTime)]
                : null,
              rules: [{ required: true, message: "请选择展示时间" }]
            })(<RangePicker showTime format="YYYY-MM-DD HH:mm" />)}
          </FormItem>
          <FormItem {...formLayout} label={liquTips}>
            {getFieldDecorator("receiveTimeInterval", {
              initialValue: receiveTimeInterval,
              rules: [{ required: true, message: "请填写领取间隔" }]
            })(<Input style={{ width: "80px" }} />)}
            　天
          </FormItem>
          <FormItem className="must-pic" {...formLayout} label="选择优惠券">
            <BaseDelTable
              callback={this.handleCallback}
              columns={columns}
              dataSource={couponList}
            />
          </FormItem>
          <div className="title">模块设置</div>
          <FormItem label="设置模块背景色号" {...formLayout}>
            {getFieldDecorator("backgroupColor", {
              initialValue: backgroupColor,
              rules: [{ required: true, message: "请填写领取间隔" }]
            })(
              <Input
                placeholder="标题颜色的色号，常用色号可在示例中查看"
                style={{ width: "266px" }}
              />
            )}
            　<span className="suffix_tips">请填写#+六位数字</span>
          </FormItem>
          <Button
            className="btn"
            size="large"
            type="primary"
            onClick={this.handleSubmit}
          >
            保存
          </Button>
          <Modal visible={visible} onCancel={this.onCancel} footer={null}>
            <img
              src={require("../../../../assets/ex4.png")}
              style={{ width: "472px" }}
            />
          </Modal>
        </Form>
      </div>
    );
  }
}
const timeTips = (
  <span>
    <span style={{ paddingRight: "5px" }}>模块展示时间</span>
    <Tooltip title="在模块展示时间内，新用户首页将出现领取优惠券的入口">
      <Icon style={{ color: "#35BAB0" }} type="question-circle" />
    </Tooltip>
  </span>
);
const liquTips = (
  <span>
    <span style={{ paddingRight: "5px" }}>新人每次领取时间间隔</span>
    <Tooltip title="新人领取时间间隔为，新用户两次领取新人礼之间的间隔，间隔期内，新用户将无法领取新人优惠券。">
      <Icon style={{ color: "#35BAB0" }} type="question-circle" />
    </Tooltip>
  </span>
);

const NewUser = Form.create({})(Index);
export default NewUser;
