
import UpLoadImg from '../../../components/UpLoadImgMod';
import { Input, Form, Select, Button, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
import {
  linkIconOption,
} from '../../../components/optionMap.js';

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

export function columns(form, categoryList, activiKey){
  const linkChange=(index)=> {
    let goodVal = form.getFieldsValue(['goods']);
    let { goods } =goodVal;
    goods = goods.map((el,idx) => {
      if(index == idx&&el.linkInfo) {
        el.linkInfo = null;
      }
      return el;
    })
    form.setFieldsValue({ goods: goods })
  }
  //url地址
  const renderUrl=(record,index)=> {
    let placeholder='',disabled, rules=[];
    switch(record.linkInfoType) {
      case 1:
        disabled=false;
        placeholder = '请输入页面编码';
        rules=[{ required:true, message:'请输入页面编码'},{ pattern:/^\S+$/g,message:'不可输入空格'}]
        break;
      case 2:
        disabled=false;
        placeholder = '请输入URL链接';
        rules=[{ required:true, message:'请输入URL链接'},{ pattern:/^\S+$/g,message:'不可输入空格'}]
        break;
      case 3:
        disabled=false;
        placeholder = '请输入商品SPUID';
        rules=[{ required:true, message:'请输入商品SPUID'},{ pattern:/^\S+$/g,message:'不可输入空格'}]
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        disabled=true;
        break;
      case 8:
        disabled=false;
        placeholder = '请选择分类'
        break;
      default:
        disabled=true;
        break;
    }
    return { placeholder, disabled, rules };

  }
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align:'center',
      width:'4%',
      render:(text,record,index)=> {
        index++;
        return <span>{index}</span>
      }
    }, {
      title: '图片*',
      dataIndex: 'picUrl',
      key: 'picUrl',
      align:'center',
      width:'10%',
      render:(text,record,index)=> {
        let width,height;
        if(activiKey == 1) {
          width = 313;
          height = 400;
        } else {
          width = 357;
          height = 192;
        }
        return <UpLoadImg
                width={width}
                height={height}
                fileList={record.picUrl}
                form={form}
                index={index}/>
      }
    },{
      title: '图片ID',
      dataIndex: 'frameDetailId',
      key: 'frameDetailId',
      align:'center',
      width:'4%',
      render:(text,record,index)=> {
        return <span>{record.frameDetailId?record.frameDetailId:''}</span>
      }
    }, {
      title: '图片名称',
      dataIndex: 'title',
      key: 'title',
      align:'center',
      width:'15%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].title`,{
                  initialValue:record.title,
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入名称"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },{
      title: '跳转链接*',
      dataIndex: 'linkInfoType',
      key: 'linkInfoType',
      align:'center',
      width:'12%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
           {getFieldDecorator(`goods[${index}].linkInfoType`,{
               initialValue:record.linkInfoType,
               rules:[{
                 required:true,message:'请选择跳转链接'
               }],
               onChange:()=>linkChange(index)
             })(
               <Select
                 placeholder="请选择跳转链接">
                 {
                   linkIconOption.map((el,index) => (
                     <Select.Option
                       value={el.key}
                       key={el.key}>{el.value}</Select.Option>
                   ))
                 }
               </Select>
           )}
           </FormItem>
      }
    },  {
      title: '跳转内容*',
      dataIndex: 'linkInfo',
      key: 'linkInfo',
      align:'center',
      width:'15%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        let linkAgeObj= renderUrl(record);
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
    }, {
      title: '开始时间*',
      dataIndex: 'beginTime',
      key: 'beginTime',
      align:'center',
      width:'14%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
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
    },{
      title: '结束时间',
      dataIndex: 'etime',
      key: 'etime',
      align:'center',
      width:'6%',
      render:()=> {
        return <span>结束时间为下一张开始时间</span>
      }
    }];
}
