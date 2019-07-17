import { Input, Form, Select, Button } from 'antd';
import moment from 'moment';
import UpLoadImg from '../../../components/UpLoadImgMod';
const FormItem = Form.Item;

export function columnsFun(form,handleBlur){
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
      dataIndex: 'pdSpuId',
      key: 'pdSpuId',
      width:'10%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`fieldsOne[${index}].pdSpuId`,{
                  initialValue:record.pdSpuId,
                  rules:[{
                    required:true,message:'请输入Spuid'
                  }],
                })(
                  <Input
                    onBlur={(e)=>handleBlur('listOne',e,index)}
                    maxLength='15'
                    placeholder="请输入Spuid"
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
      dataIndex: 'pdSpuName',
      key: 'pdSpuName',
      width:'8%',
    },
    {
      title: '商品分类',
      dataIndex: 'pdCategory',
      key: 'pdCategory',
      width:'8%',
    },
    {
      title: '商品卖点',
      dataIndex: 'sellingPoints',
      key: 'sellingPoints',
      align:'center',
      width:'10%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`fieldsOne[${index}].sellingPoints`,{
                  initialValue:record.sellingPoints,
                  rules:[],
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入商品卖点"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },{
      title: '商品标签',
      dataIndex: 'tags',
      key: 'tags',
      align:'center',
      width:'10%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`fieldsOne[${index}].tags`,{
                  initialValue:record.tags,
                  rules:[{
                    required:true,message:'请输入商品标签'
                  }],
                })(
                  <Input
                    maxLength='15'
                    placeholder="请输入商品标签"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
      title: '商品价格',
      dataIndex:'pdSpuPrice',
      key: 'pdSpuPrice',
      width:'10%',
    },
    {
      title: 'B端在售库存',
      dataIndex: 'wsInv',
      key: 'wsInv',
      width:'6%',
    },
    {
      title: '缺货门店',
      dataIndex: 'outOfStockShopNum',
      key: 'outOfStockShopNum',
      width:'6%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width:'4%',
      render:(text,record,index) => {
        return <span onClick={()=>record.onOperateClick('listOne','delete')} className="cr">删除</span>
      }
    },
  ];
}
export function columnsTwoFun(form, handleBlur){
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
      dataIndex: 'pdSpuId',
      key: 'pdSpuId',
      width:'10%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`fieldsTwo[${index}].pdSpuId`,{
                  initialValue:record.pdSpuId,
                  rules:[],
                })(
                  <Input
                    onBlur={(e)=>handleBlur('listTwo',e,index)}
                    maxLength='15'
                    placeholder="请输入Spuid"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
      colSpan:0,
      title: '商品图片',
      dataIndex: 'pdSpuPic',
      key: 'pdSpuPic',
      align:'center',
      width:'8%',
      render:(text,record,index)=> {
        return <img src=""/>
      }
    },{
      title: '商品名称',
      dataIndex: 'pdSpuName',
      key: 'pdSpuName',
      colSpan:0,
      width:'8%',
    },
    {
      title: '商品分类',
      dataIndex: 'pdCategory',
      key: 'pdCategory',
      colSpan:0,
      width:'8%',
    },
    {
      title: '商品卖点',
      dataIndex: 'sellingPoints',
      key: 'sellingPoints',
      align:'center',
      width:'8%',
      colSpan:0,
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`fieldsTwo[${index}].sellingPoints`,{
                  initialValue:record.sellingPoints,
                  rules:[],
                })(
                  <Input
                    maxLength='8'
                    placeholder="请输入商品卖点"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },{
      title: '商品标签',
      dataIndex: 'tags',
      key: 'tags',
      align:'center',
      width:'10%',
      colSpan:0,
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`fieldsTwo[${index}].tags`,{
                  initialValue:record.tags,
                  rules:[],
                })(
                  <Input
                    maxLength='8'
                    placeholder="请输入商品标签"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
      title: '商品价格',
      dataIndex:'pdSpuPrice',
      key: 'pdSpuPrice',
      colSpan:0,
      width:'10%',
    },
    {
      title: 'B端在售库存',
      dataIndex: 'wsInv',
      key: 'wsInv',
      colSpan:0,
      width:'6%',
    },
    {
      title: '缺货门店',
      dataIndex: 'outOfStockShopNum',
      key: 'outOfStockShopNum',
      colSpan:0,
      width:'6%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      colSpan:0,
      width:'4%',
      render:(text,record,index) => {
        return <span onClick={()=>record.onOperateClick('listTwo','delete')} className="cr">删除</span>
      }
    },
  ];
}
