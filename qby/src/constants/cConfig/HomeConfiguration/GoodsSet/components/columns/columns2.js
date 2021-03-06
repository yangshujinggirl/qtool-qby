import { Input, Form, Select, Button, Tooltip, Icon } from 'antd';
import moment from 'moment';
import UpLoadImg from '../../../components/UpLoadImgMod';
const FormItem = Form.Item;

let tagsTit = <span>
  选填项，如填写则前端将会展示标签。效果如下：
  <img src={require('../../../../../../assets/tag.png')} style={{'width':'80px'}}/>
</span>;

const sellingPoints = <Tooltip placement="top" title='选填项，如填写则前端将会展示卖点，而不是商品名称'>
                商品卖点&nbsp;<Icon type="exclamation-circle-o" />
              </Tooltip>;
const pdSpuInv = <Tooltip placement="top" title='即为仓库库存。若库存不为0，则所有用户都可以买这个商品。'>
                B端在售库存&nbsp;<Icon type="exclamation-circle-o" />
              </Tooltip>;
const outOfStockShopNum = <Tooltip placement="top" title='即为该门店没有此商品，若B端在售库存为0，则选择此门店的用户会看到补货中'>
              缺货门店&nbsp;<Icon type="exclamation-circle-o" />
              </Tooltip>;
const tags = <Tooltip placement="top" title={tagsTit}>
              商品标签&nbsp;<Icon type="exclamation-circle-o" />
              </Tooltip>;
export function columnsNewFun(form,handleBlur){
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
      width:'8%',
      render:(text,record,index)=> {
        const { getFieldDecorator } = form;
        return <FormItem>
                {getFieldDecorator(`fieldsOne[${index}].pdSpuId`,{
                  initialValue:record.pdSpuId,
                  getValueFromEvent: (event) => {
                    return event.target.value.replace(/\D/g,'')
                  },
                })(
                  <Input
                    style={record.highlight?{color:'red'}:{color:'#555'} }
                    onBlur={(e)=>handleBlur(e,record,'pdSpuId')}
                    maxLength='15'
                    placeholder="请输入Spuid"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
        title: '商品编码',
        dataIndex: 'pdCode',
        key: 'pdCode',
        width:'8%',
        render:(text,record,index)=> {
          const { getFieldDecorator } = form;
          return <FormItem>
                  {getFieldDecorator(`fieldsOne[${index}].pdCode`,{
                    initialValue:record.pdCode,
                    rules:[],
                  })(
                    <Input
                      onBlur={(e)=>handleBlur(e,record,'pdCode')}
                      maxLength='15'
                      placeholder="请输入pdCode"
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
       const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
       return <div className="img-wrap">
                {
                  record.pdSpuPic&&
                  <img src={`${fileDomain}${record.pdSpuPic}`}/>
                }
             </div>
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
      title: sellingPoints,
      dataIndex: 'sellingPoints',
      key: 'sellingPoints',
      align:'center',
      width:'8%',
      render:(text,record,index)=> {
        const { getFieldDecorator } = form;
        return <FormItem>
                {getFieldDecorator(`fieldsOne[${index}].sellingPoints`,{
                  initialValue:record.sellingPoints,
                  rules:[],
                })(
                  <Input
                    maxLength='8'
                    placeholder="8个字符以内"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },{
      title: tags,
      dataIndex: 'tags',
      key: 'tags',
      align:'center',
      width:'8%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`fieldsOne[${index}].tags`,{
                  initialValue:record.tags,
                  rules:[],
                })(
                  <Input
                    maxLength='8'
                    placeholder="8个字符以内"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
      title: '商品状态',
      dataIndex: 'isLineStr',
      key: 'isLineStr',
      width:'10%',
    },
    {
      title: '是否预售',
      dataIndex: 'isPresellStr',
      key: 'isPresellStr',
      width:'10%',
    },
    {
      title: '参与活动',
      dataIndex: 'activitys',
      key: 'activitys',
      width:'10%',
      render:(text,record,index)=>{
        return(
            record.activitys&&record.activitys.map((item,index)=>
              <p>{item.activityName}{record.activitys.length-1==index?'':'、'}</p>
            )
          )
      }
    },
    {
      title: pdSpuInv,
      dataIndex: 'pdSpuInv',
      key: 'pdSpuInv',
      width:'10%',
    },
    {
      title: outOfStockShopNum,
      dataIndex: 'outOfStockShopNum',
      key: 'outOfStockShopNum',
      width:'8%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width:'4%',
      render:(text,record,index) => {
        return <span onClick={()=>record.onOperateClick('delete')} className="cr">删除</span>
      }
    },
  ];
}
export function columnsNewTwoFun(form, handleBlur){
  return [
    {
      title: '以下为替补商品',
      dataIndex: 'key',
      key: 'key',
      align:'center',
      width:'3%',
      colSpan:14,
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
      width:'8%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`fieldsTwo[${index}].pdSpuId`,{
                  initialValue:record.pdSpuId,
                  getValueFromEvent:(event)=>{
                    return event.target.value.replace(/\D/g,'')
                  }
                })(
                  <Input
                    style={record.highlight?{color:'red'}:{color:'#555'} }
                    onBlur={(e)=>handleBlur(e,record,'pdSpuId')}
                    maxLength='15'
                    placeholder="请输入Spuid"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
        colSpan:0,
        title: '商品编码',
        dataIndex: 'pdCode',
        key: 'pdCode',
        width:'8%',
        render:(text,record,index)=> {
          const { getFieldDecorator } =form;
          return <FormItem>
                  {getFieldDecorator(`fieldsTwo[${index}].pdCode`,{
                    initialValue:record.pdCode,
                    rules:[],
                  })(
                    <Input
                      onBlur={(e)=>handleBlur(e,record,'pdCode')}
                      maxLength='15'
                      placeholder="请输入pdCode"
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
        const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
        return <div className="img-wrap">
                 {
                   record.pdSpuPic&&
                   <img src={`${fileDomain}${record.pdSpuPic}`}/>
                 }
              </div>
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
                    placeholder="8个字符以内"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },{
      title: '商品标签',
      dataIndex: 'tags',
      key: 'tags',
      align:'center',
      width:'8%',
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
                    placeholder="8个字符以内"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
      title: '商品状态',
      dataIndex: 'isLineStr',
      key: 'isLineStr',
      colSpan:0,
      width:'10%',
    },
    {
      title: '是否预售',
      dataIndex: 'isPresellStr',
      key: 'isPresellStr',
      colSpan:0,
      width:'10%',
    },
    {
      colSpan:0,
      title: '参与活动',
      dataIndex: 'activitys',
      key: 'activitys',
      width:'10%',
      render:(text,record,index)=>{
        return(
            record.activitys&&record.activitys.map((item)=>
              <p>{item.activityName},</p>
            )
          )
      }
    },
    {
      title: 'B端在售库存',
      dataIndex: 'pdSpuInv',
      key: 'pdSpuInv',
      colSpan:0,
      width:'10%',
    },
    {
      title: '缺货门店',
      dataIndex: 'outOfStockShopNum',
      key: 'outOfStockShopNum',
      colSpan:0,
      width:'8%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      colSpan:0,
      width:'4%',
      render:(text,record,index) => {
        return <span onClick={()=>record.onOperateClick('delete')} className="cr">删除</span>
      }
    },
  ];
}
