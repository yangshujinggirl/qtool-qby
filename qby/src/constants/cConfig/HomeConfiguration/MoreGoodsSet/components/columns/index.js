import { Input, Form, Select, Button, DatePicker } from 'antd';
import moment from 'moment';
import UpLoadImg from '../../../components/UpLoadImgMod';
const FormItem = Form.Item;

export function columnsFun(form, handleChange){
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align:'center',
      width:'3%',
      render:(text,record,index)=> {
        index++;
        return <span>{index}</span>
      }
    },
    {
      title: 'Spuid',
      dataIndex: 'Spuid',
      key: 'Spuid',
      width:'10%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].title`,{
                  initialValue:record.title,
                  rules:[{
                    required:true,message:'请输入banner名称'
                  }],
                  onChange:(e)=>handleChange('input','title',e,index)
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入名称"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
     title: '商品图片',
     dataIndex: 'picUrl',
     key: 'picUrl',
     align:'center',
     width:'8%',
     render:(text,record,index)=> {
       return <img src=""/>
     }
   },
   {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width:'8%',
    },
    {
      title: '商品分类',
      dataIndex: 'classify',
      key: 'classify',
      width:'8%',
    },
    {
      title: '商品卖点',
      dataIndex: 'point',
      key: 'point',
      align:'center',
      width:'10%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].title`,{
                  initialValue:record.title,
                  rules:[{
                    required:true,message:'请输入banner名称'
                  }],
                  onChange:(e)=>handleChange('input','title',e,index)
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入名称"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },{
      title: '商品标签',
      dataIndex: 'label',
      key: 'label',
      align:'center',
      width:'10%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].title`,{
                  initialValue:record.title,
                  rules:[{
                    required:true,message:'请输入banner名称'
                  }],
                  onChange:(e)=>handleChange('input','title',e,index)
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入名称"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
      title: '商品价格',
      dataIndex:'price',
      key: 'price',
      width:'10%',
    },
    {
      title: 'B端在售库存',
      dataIndex: 'qty',
      key: 'qty',
      width:'6%',
    },
    {
      title: '缺货门店',
      dataIndex: 'shop',
      key: 'shop',
      width:'4%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width:'8%',
      render:(text,record,index) => {
        return <span onClick={()=>record.onOperation('delete')} className="cr">删除</span>
      }
    },
  ];
}
export function columnsTwoFun(form, handleChange){
  return [
    {
      title: '以下为替补商品',
      dataIndex: 'key',
      key: 'key',
      align:'center',
      width:'3%',
      colSpan:11,
      render:(text,record,index)=> {
        index++;
        return <span>{index}</span>
      }
    },
    {
      colSpan:0,
      title: 'Spuid',
      dataIndex: 'Spuid',
      key: 'Spuid',
      width:'10%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].title`,{
                  initialValue:record.title,
                  rules:[{
                    required:true,message:'请输入banner名称'
                  }],
                  onChange:(e)=>handleChange('input','title',e,index)
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入名称"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
      colSpan:0,
      title: '商品图片',
      dataIndex: 'picUrl',
      key: 'picUrl',
      align:'center',
      width:'8%',
      render:(text,record,index)=> {
        return <img src=""/>
      }
    },{
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      colSpan:0,
      width:'8%',
    },
    {
      title: '商品分类',
      dataIndex: 'classify',
      key: 'classify',
      colSpan:0,
      width:'8%',
    },
    {
      title: '商品卖点',
      dataIndex: 'point',
      key: 'point',
      align:'center',
      width:'10%',
      colSpan:0,
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].title`,{
                  initialValue:record.title,
                  rules:[{
                    required:true,message:'请输入banner名称'
                  }],
                  onChange:(e)=>handleChange('input','title',e,index)
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入名称"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },{
      title: '商品标签',
      dataIndex: 'label',
      key: 'label',
      align:'center',
      width:'10%',
      colSpan:0,
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].title`,{
                  initialValue:record.title,
                  rules:[{
                    required:true,message:'请输入banner名称'
                  }],
                  onChange:(e)=>handleChange('input','title',e,index)
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入名称"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
      title: '商品价格',
      dataIndex:'price',
      key: 'price',
      colSpan:0,
      width:'10%',
    },
    {
      title: 'B端在售库存',
      dataIndex: 'qty',
      key: 'qty',
      colSpan:0,
      width:'6%',
    },
    {
      title: '缺货门店',
      dataIndex: 'shop',
      key: 'shop',
      colSpan:0,
      width:'4%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      colSpan:0,
      width:'4%',
      render:(text,record,index) => {
        return <span onClick={()=>record.onOperation('delete')} className="cr">删除</span>
      }
    },
  ];
}
