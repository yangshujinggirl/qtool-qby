import React, { Component } from 'react';
import {connect} from 'dva';
import {Button,Form,Select,Input,DatePicker,Tooltip,Icon,Modal,Table,message} from "antd";
import UploadNew from "../components/UploadImg";
import UploadCoupon from "../components/UploadImg";
import {saveApi,getInfoApi} from "../../../../services/cConfig/homeConfiguration/newUser";
import { getColumns } from "./components/columns";
import moment from "moment";
import "./index.less";
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList1: [],
      fileList2: [],
      optionList: [],
      couponList: [],
      loading:false,
      moduleBackColor:'',
      count:0
    };
  }
  componentDidMount = () => {
    this.getCouponList();
  };
  //初始化数据
  getCouponList = () => {
    this.props.dispatch({type: 'tab/loding',payload:true})
    getInfoApi({ homepageModuleId: this.props.data.homepageModuleId }).then(
      res => {
        if (res.code == "0") {
          let {
            couponList,
            newComerPicUrl,
            moduleBackColor,
            couponPopUpPicUrl,
            receiveTimeInterval,
            beginTime,
            endTime
          } = res.newUserGiftVo;
          const optionList = res.newUserGiftVo.couponSourceList;
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
            moduleBackColor,
            couponPopUpPicUrl,
            receiveTimeInterval,
            beginTime,
            endTime,
            fileList1,
            fileList2,
            count: couponList.length
          });
          this.props.dispatch({type: 'tab/loding',payload:false});
        }else{
          this.props.dispatch({type: 'tab/loding',payload:false});
        };
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
    this.setState({
      loading:true
    });
    saveApi(values).then(res => {
      if (res.code == "0") {
        message.success("保存成功");
        this.getCouponList()
        this.setState({
          loading:false
        });
      }else{
        this.setState({
          loading:false
        });
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
    };
    if(!values.couponIds||!values.couponIds[0]){
      message.error('至少有一张发放中的、领取方式为一键领取的优惠券')
      return null;
    };
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
    if(couponList.findIndex(item=>item.couponId == couponId)!==-1){//已经存在则去重
      message.error('该优惠券重复',.8)
      couponList.splice(currentIndex,1)
    }else{
      optionList.map((item, index) => {
        if (item.couponId == couponId) {
          couponList[currentIndex].couponId = optionList[index].couponId;
          couponList[currentIndex].couponName = optionList[index].couponName;
          couponList[currentIndex].couponMoney = optionList[index].couponMoney;
          couponList[currentIndex].couponGiveCount = optionList[index].couponGiveCount;
          couponList[currentIndex].couponFullAmount = optionList[index].couponFullAmount;
        }
      });
    };
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
  //新增
  handleAdd = () => {
    let { couponList,count} = this.state;
    const newData = {
      key: count,
    };
    this.setState({
      couponList: [...couponList, newData],
      count: count + 1
    });
  };
  //删除
  handleDelete = key => {
    this.props.form.resetFields(['couponIds'])
    const couponList = [...this.state.couponList];
    this.setState({
      couponList: couponList.filter(item => item.key !== key)
    });
  };
  render() {
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 }
    };
    const {
      fileList1,
      fileList2,
      optionList,
      couponList,
      moduleBackColor,
      receiveTimeInterval,
      beginTime,
      endTime,
      visible,
      loading
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = getColumns(
      this.props.form,
      optionList,
      this.onSelectChange,
      this.handleDelete
    );
    return (
      <div className="new_user">
        <div className="title">新人礼设置</div>
        <Form>
          <FormItem className="must-pic" label="新人礼图片" {...formLayout}>
            <UploadNew
              describe="686*142"
              fileList={fileList1}
              changeImg={this.changeUserImg}
              exampleImg={require("../../../../assets/1.jpg")}
              width={686}
              height={142}
            />
          </FormItem>
          <FormItem
            className="must-pic"
            label="优惠券弹窗背景图"
            {...formLayout}
          >
            <div className="coupon-img">
              <UploadCoupon
                describe="690*700"
                fileList={fileList2}
                changeImg={this.changeCouponImg}
                exampleImg={require("../../../../assets/bg.png")}
                width={690}
                height={700}
              />
              <a onClick={this.lookExa} className="look-exa">
                查看示例
              </a>
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
          <FormItem className="must-pic" {...formLayout} label="选择优惠券">
            <Table
                className="theme-list-table"
                bordered
                columns={columns}
                dataSource={couponList}
                pagination={false}
                footer={()=>(
                  <Button type="default" onClick={this.handleAdd}>
                      +新增
                  </Button>)
                }
            />
          </FormItem>
          <div className="title">模块设置</div>
          <FormItem label="设置模块背景色号" {...formLayout}>
            {getFieldDecorator("moduleBackColor", {
              initialValue: moduleBackColor,
              rules: [
                {pattern:/^[a-zA-Z\d]+$/,message:'格式错误，请填写六位数字+字母组合'},
              ]
            })(
              <Input
                placeholder="请填写六位数字+字母组合"
                style={{ width: "266px" }}
                autoComplete='off'
                maxLength='6'
              />
            )}
          </FormItem>
          <Button
            className="btn"
            size="large"
            type="primary"
            loading={loading}
            onClick={()=>this.handleSubmit()}
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


const mapStateToProps=(state)=>{
  const {tab} = state;
  return tab
}
const Indexs = Form.create({})(Index)
export default connect(mapStateToProps)(Indexs);