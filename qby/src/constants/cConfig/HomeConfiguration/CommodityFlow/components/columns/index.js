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
      width:'6%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`spuList[${index}].pdSpuId`,{
                  initialValue:record.pdSpuId,
                  rules:[{
                    required:true,message:'请输入Spuid'
                  }],
                })(
                  <Input
                    onBlur={(e)=>handleBlur(e,index)}
                    maxLength='15'
                    placeholder="请输入Spuid"
                    autoComplete="off"/>
                )}
              </FormItem>
      }
    },
    {
      title: '商品名称',
      dataIndex: 'cname',
      key: 'cname',
      width:'10%',
    },
    {
      title: '商品分类',
      dataIndex: 'classifyName',
      key: 'classifyName',
      width:'8%',
    },
    {
      title: '商品价格',
      dataIndex:'price',
      key: 'price',
      width:'10%',
    },
    {
      title: 'B端在售库存',
      dataIndex: 'pdInvQty',
      key: 'pdInvQty',
      width:'6%',
    },
    {
      title: '缺货门店',
      dataIndex: 'outOfStackQty',
      key: 'outOfStackQty',
      width:'6%',
    },
    {
      title: '固定位置',
      dataIndex: 'fixed',
      key: 'fixed',
      width:'18%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        let mod;
        if(record.isFixed) {
          mod = <span onClick={()=>record.onOperateClick('toggle')} className="cr">解除固定</span>
        } else {
          mod = <div>该商品固定在
                    <FormItem className="row-input-item">
                      {getFieldDecorator(`spuList[${index}].fixPosition`,{
                        initialValue:record.fixPosition,
                        rules:[{
                          pattern:/^([1-9]$)|(^[1-3][0-9]$)|(^[4][0-5]$)/,message:'请输入1-40'
                        }],
                      })(
                        <Input
                          maxLength='2'
                          placeholder="请输入Spuid"
                          autoComplete="off"/>
                      )}
                    </FormItem>
                    位置
                    <FormItem className="row-input-item">
                      {getFieldDecorator(`spuList[${index}].fixDay`,{
                        initialValue:record.fixDay,
                        rules:[],
                      })(
                        <Input
                          maxLength='15'
                          placeholder="请输入Spuid"
                          autoComplete="off"/>
                      )}
                    </FormItem>
                    天
                  </div>
        }
        return  mod;
      }
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