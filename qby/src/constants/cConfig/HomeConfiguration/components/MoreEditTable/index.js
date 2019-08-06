import React, { Component } from 'react';
import { Table, Select, Input, Button, Form, InputNumber, Modal, DatePicker  } from 'antd';
import moment from 'moment';
import UpLoadImg from '../UpLoadImgMod';
import './index.less';

const FormItem = Form.Item;
const disabledDate = current => {
  // return current && current < moment().subtract(1,'days');
  return current && current < moment().endOf('day').subtract(1,'days');
};
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const formatHours =(date)=> {
  let hour = moment().hour();
  let selDat = moment(date).date();//设置日
  let currDat = moment().date();//当前日
  let selMon = moment(date).month();//设置月
  let currMon = moment().month();//当前月
  let disabledHours;
  if(selMon > currMon) {
    disabledHours = [];
    return disabledHours;
  }
  if(selDat > currDat) {
    disabledHours = [];
  } else if(selDat == currDat) {
    disabledHours = range(0, 24).splice(0,hour);
  } else {
    disabledHours = range(0, 24);
  }
  return disabledHours;
}
const formatMinutes =(date)=> {
  let minute = moment().minute();
  let selMon = moment(date).month();//设置月
  let currMon = moment().month();//当前月
  let selDat = moment(date).date();//设置日
  let currDat = moment().date();//当前日
  let selHour = moment(date).hour();//设置时
  let currHour = moment().hour();//当前时
  let disabledMinutes;
  if(selDat > currDat || selHour > currHour || selMon > currMon) {
    disabledMinutes = [];
    return disabledMinutes;
  }
  if(selDat == currDat) {
    if(selHour > currHour) {
      disabledMinutes = [];
    } else if(selHour == currHour){
      disabledMinutes = range(0, 60).splice(0, minute+1);
    } else {
      disabledMinutes = [];
    }
  } else {
    disabledMinutes = range(0, 60);
  }
  return disabledMinutes;
}
const disabledDateTime = (date) => {
  return {
    disabledHours: ()=> formatHours(date),
    disabledMinutes: ()=> formatMinutes(date),
  };
};
class BaseEditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstIn:true,
      key:this.props.addKey,
    }
  }
  componentWillReceiveProps(props) {
    if(this.state.firstIn) {
      this.setState({ key: props.addKey })
    }
  }
  //绑定方法
  processData(data) {
    if(!this.props.onOperateClick) {
      return data;
    }
    data && data.map((item, i) => {
        item.onOperateClick = (type) => { this.props.onOperateClick(item, type) };
    })
    return data;
  }
  //新增
  handleAdd=()=> {
    let { key } =this.state;
    let { dataSource} =this.props;
    dataSource.push({
      key,
      isFrame:true
    });
    key++;
    this.setState({ key, firstIn:false });
    this.props.callback(dataSource);
  }
  renderCode=(text, record, index)=> {
    index++;
    return <span>{index}</span>
  }
  renderPicUrl=(text,record,index)=> {
    let width,height;
    if(this.props.modName == 'banner') {
      width = 686;
      height =356;
    } else if(this.props.modName == 'icon') {
      width = 120;
      height =120;
    }
    return <UpLoadImg
            width={width}
            height={height}
            fileList={record.picUrl}
            form={this.props.form}
            index={index}/>
  }
  renderTitle=(text,record,index)=> {
    const { getFieldDecorator } =this.props.form;
    return <FormItem>
            {getFieldDecorator(`goods[${index}].title`,{
              initialValue:record.title,
              rules:[{
                required:true,message:'请输入名称'
              }],
            })(
              <Input
                maxLength='15'
                placeholder="请输入名称"
                autoComplete="off"/>
            )}
          </FormItem>
  }
  renderPlatForm=(text,record,index)=> {
    const { getFieldDecorator } =this.props.form;
    return <FormItem>
       {getFieldDecorator(`goods[${index}].platform`,{
         initialValue:record.platform,
         rules:[{
           required:true,message:'请选择平台'
         }],
       })(
         <Select
           placeholder="请选择平台">
           <Select.Option
             value={1}
             key={1}>小程序</Select.Option>
           <Select.Option
             value={2}
             key={2}>App</Select.Option>
           <Select.Option
             value={0}
             key={0}>小程序+App</Select.Option>
         </Select>
       )}
       </FormItem>
  }
  renderLinkType=(text,record,index)=> {
    const { getFieldDecorator } =this.props.form;
    return <FormItem>
       {getFieldDecorator(`goods[${index}].linkInfoType`,{
           initialValue:record.linkInfoType,
           rules:[{
             required:true,message:'请选择跳转链接'
           }],
           onChange:()=>this.linkChange(index)
         })(
           <Select
             placeholder="请选择跳转链接">
             {
               this.props.optionSource.map((el,index) => (
                 <Select.Option
                   value={el.key}
                   key={el.key}>{el.value}</Select.Option>
               ))
             }
           </Select>
       )}
       </FormItem>
  }
  renderLinkInfo=(text,record,index)=> {
    const { getFieldDecorator } =this.props.form;
    const { categoryList } =this.props;
    let linkAgeObj= this.contactLinkInfo(record);
    switch(record.linkInfoType) {
      case 8:
        return <FormItem>
                {getFieldDecorator(`goods[${index}].linkInfo`,{
                  initialValue:record.linkInfo,
                  rules:[{ required:true, message:'请选择分类'}],
                  })(
                    <Select
                      placeholder={linkAgeObj.placeholder}>
                      {
                        categoryList.map((el) => (
                          <Select.Option
                            value={el.categoryId}
                            key={el.categoryId}>{el.categoryName}</Select.Option>
                        ))
                      }
                    </Select>
                )}
        </FormItem>
        break;
      case 1:
      case 2:
      case 3:
        return <FormItem>
                {getFieldDecorator(`goods[${index}].linkInfo`,{
                  initialValue:record.linkInfo,
                  rules:linkAgeObj.rules,
                  })(
                    <Input
                      disabled={linkAgeObj.disabled}
                      placeholder={linkAgeObj.placeholder}
                      autoComplete="off"/>
                )}
          </FormItem>
        break;
      default:
        return <span></span>
    }
  }
  renderStartTime=(text,record,index)=> {
    const { getFieldDecorator } =this.props.form;
    return <FormItem>
            {getFieldDecorator(`goods[${index}].beginTime`,{
              initialValue:record.beginTime?moment(record.beginTime,"YYYY-MM-DD HH:mm"):null,
              rules:[{ required:true, message:'请选择开始时间'}],
              })(
                <DatePicker
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  format="YYYY-MM-DD HH:mm"
                  allowClear={false}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: moment('00:00', 'HH:mm'),
                  }}/>
            )}
          </FormItem>
  }
  renderEndTime=(text,record,index)=> {
    return <span>结束时间为下一张开始时间</span>
  }
  //联动清空表单中的值
  linkChange=(index)=> {
    let goodVal = this.props.form.getFieldsValue(['goods']);
    let { goods } =goodVal;
    goods = goods.map((el,idx) => {
      if(index == idx&&el.linkInfo) {
        el.linkInfo = null;
      }
      return el;
    })
    this.props.form.setFieldsValue({ goods: goods })
  }
  renderHandle=(text,record,index)=> {
    let disabled;
    if(record.linkInfoType==1||record.linkInfoType==2||record.linkInfoType==3) {
      disabled=!!record.picUrl&&!!record.title&&!!record.beginTime&&(record.platform!=undefined)&&!!record.linkInfoType&&!!record.linkInfo;
    } else {
      disabled=!!record.picUrl&&!!record.title&&!!record.beginTime&&(record.platform!=undefined)&&!!record.linkInfoType;
    }
    const { modName } =this.props;
    return <div className="handle-item-btn-list">
            <Button
              disabled={!disabled}
              type="primary"
              onClick={()=>record.onOperateClick('frame')}>
              {modName=='icon'?'变坑':'变帧'}
            </Button>
            <Button
              type="primary"
              onClick={()=>record.onOperateClick('delete')}>
              删除
            </Button>
          </div>
  }
  contactLinkInfo=(record,index)=> {
    let placeholder='',disabled, rules=[];
    switch(record.linkInfoType) {
      case 1:
        disabled=false;
        placeholder = '请输入页面编码';
        rules=[{ required:true, message:'请输入页面编码'},{ pattern:/^\S+$/g, message:'不可输入空格' }]
        break;
      case 2:
        disabled=false;
        placeholder = '请输入URL链接';
        rules=[{ required:true, message:'请输入URL链接'},{pattern:/^\S+$/g,message:'不可输入空格'}]
        break;
      case 3:
        disabled=false;
        placeholder = '请输入商品SPUID';
        rules=[{ required:true, message:'请输入商品SPUID'},{pattern:/^\S+$/g,message:'不可输入空格'}]
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        disabled=true;
        break;
      case 8:
        disabled=false;
        rules=[{ required:true, message:'请选择分类'}]
        placeholder = '请选择分类'
        break;
      default:
        disabled=true;
        break;
    }
    return { placeholder, disabled, rules };
  }
  render() {
    let { dataSource, modName } =this.props;
    dataSource = this.processData(dataSource);
    return (
      <Table
        className="banner-set-tables"
        footer={()=><Button type="default" onClick={this.handleAdd}>+新增</Button>}
        bordered
        pagination={false}
        onRow={(record)=> {
          return{
            'data-row-key':record.key
          }
        }}
        dataSource={dataSource}>
        <Table.Column title="序号" key ='key' dataIndex="key" width="4%"  render={this.renderCode}/>
        <Table.Column title={`${modName}图片*`} key ='picUrl' width="6%"  dataIndex="picUrl" render={this.renderPicUrl}/>
        <Table.Column title="ID" key ='frameDetailId' dataIndex="frameDetailId" width="6%"/>
        <Table.Column title={`${modName}名称*`} key ='title' width="14%" dataIndex="title" render={this.renderTitle}/>
        <Table.Column title="适用端*" key ='platform' width="10%" dataIndex="platform" render={this.renderPlatForm}/>
        <Table.Column title="跳转链接*" key ='linkInfoType' width="14%" dataIndex="linkInfoType" render={this.renderLinkType}/>
        <Table.Column title="跳转内容*" key ='linkInfo' width="16%" dataIndex="linkInfo" render={this.renderLinkInfo}/>
        <Table.Column title="开始时间*" key ='beginTime' width="16%" dataIndex="beginTime" render={this.renderStartTime}/>
        <Table.Column title="结束时间" key ='etime' dataIndex="etime" width="6%" render={this.renderEndTime}/>
        <Table.Column title="操作" key ='action' width="8%" dataIndex="action" render={this.renderHandle}/>
      </Table>
    )
  }
};
export default BaseEditTable;
