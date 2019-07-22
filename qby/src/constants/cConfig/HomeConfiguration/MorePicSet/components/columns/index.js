
import UpLoadImg from '../../../components/UpLoadImgMod';
import { Input, Form, Select, Button, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

export function columns(form, categoryList, activiKey){
  const linkChange=(index)=> {
    let goodVal = form.getFieldsValue(['goods']);
    let { goods } =goodVal;
    goods = goods.map((el,idx) => {
      if(index == idx) {
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
        rules=[{ required:true, message:'请输入页面编码'}]
        break;
      case 2:
        disabled=false;
        placeholder = '请输入URL链接';
        rules=[{ required:true, message:'请输入URL链接'}]
        break;
      case 3:
        disabled=false;
        placeholder = '请输入商品SPUID';
        rules=[{ required:true, message:'请输入商品SPUID'}]
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
      title: '图片',
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
                  rules:[{
                    required:true,message:'请输入banner名称'
                  }],
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入名称"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },{
      title: '跳转链接',
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
                 <Select.Option
                   value={1}
                   key={1}>去配置页面</Select.Option>
                 <Select.Option
                   value={2}
                   key={2}>去H5页面</Select.Option>
                 <Select.Option
                   value={3}
                   key={3}>去商品详情页</Select.Option>
                 <Select.Option
                   value={4}
                   key={4}>去上新尖货页</Select.Option>
                 <Select.Option
                   value={5}
                   key={5}>去热卖爆款页</Select.Option>
                 <Select.Option
                   value={6}
                   key={6}>去保税专区页</Select.Option>
                 <Select.Option
                   value={7}
                   key={7}>去品牌馆页</Select.Option>
                 <Select.Option
                   value={8}
                   key={8}>去商品分类</Select.Option>
               </Select>
           )}
           </FormItem>
      }
    },  {
      title: 'URL链接',
      dataIndex: 'linkInfo',
      key: 'linkInfo',
      align:'center',
      width:'15%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        let linkAgeObj= renderUrl(record);
        if(record.linkInfoType&&record.linkInfoType==8){
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
        } else {
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
        }
      }
    }, {
      title: '开始时间',
      dataIndex: 'beginTime',
      key: 'beginTime',
      align:'center',
      width:'14%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].beginTime`,{
                  initialValue:record.beginTime?moment(record.beginTime,"YYYY-MM-DD HH:mm"):null,
                  rules:[{ required:true, message:'请选择分类'}],
                  })(
                    <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    allowClear={false}
                    showTime={{
                      hideDisabledOptions: true,
                      defaultValue: moment('00:00:00', 'HH:mm:ss'),
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
