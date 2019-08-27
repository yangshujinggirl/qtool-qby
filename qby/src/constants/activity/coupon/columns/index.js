import { Input, Form, Select, Button, DatePicker } from 'antd';
const FormItem = Form.Item;
const Columns = [
  {
     title: '优惠券批次号',
     dataIndex: 'couponCode',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,"info")}>{text}</a>
         </div>
     )}
   },{
     title: '优惠券名称',
     dataIndex: 'couponName'
   }, {
     title: '发放方式',
     dataIndex: 'couponUseSceneStr'
   },{
     title: '优惠券金额',
     dataIndex: 'couponMoney'
   },{
     title: '使用门槛',
     dataIndex: 'couponFullAmount'
   },{
     title: '优惠券总数',
     dataIndex: 'couponCount'
   },{
     title: '已经发放数量',
     dataIndex: 'couponGiveCount',
     render:(text, record)=>{
       return(
           record.injectRecord
           ?
             <div>
               <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,"inject")}>{text}</a>
             </div>
           :
             <span>{text}</span>
       )
   }
   },{
     title: '已使用数',
     dataIndex: 'couponUsedQty'
   },{
     title: '优惠券状态',
     dataIndex: 'statusStr'
   },{
     title: '创建人',
     dataIndex: 'creater'
   },{
     title: '创建时间',
     dataIndex: 'createTime'
   },{
     title: '操作',
     dataIndex: '',
     render:(text,record,index)=>{
       return(
         <div>
           {((record.status==1||record.status==2) && record.addCoupon)&&
           <a className='theme-color' onClick={record.onOperateClick.bind(this,'edit')}>修改</a>}
           &nbsp;
           <a className='theme-color' onClick={record.onOperateClick.bind(this,'supplyAgain')}>补发</a>
         </div>
       )
     }
   }];

const columnsCreat =(form,validator,changeProportion,dataSource)=>{
 return [{
     title: '活动预算',
     dataIndex: 'budget',
     width:'20%',
     render:(text,record,index) => {
       const { getFieldDecorator } =form;
       let chldrnDom = <FormItem>
               {getFieldDecorator(`bearers[${index}].budget`,{
                 initialValue:record.budget,
                 rules:[{pattern:/^\d+$/,message:'请输入数字'}]
               })(
                 <Input
                   suffix="万元"
                   maxLength='15'
                   placeholder="请输入活动预算"
                   autoComplete="off"/>
               )}
             </FormItem>
       const obj = {
         children: chldrnDom,
         props: {},
       };
       if (index === 0) {
         obj.props.rowSpan = dataSource.length;
       } else {
         obj.props.rowSpan = 0;
       }
       return obj;
     }
   },{
     title: '承担方',
     dataIndex: 'bearerStr',
     width:'10%',
     // render:(text,record,index) => {
     //   const { getFieldDecorator } =form;
     //   return <FormItem>
     //           {getFieldDecorator(`bearers[${index}].bearer`,{
     //             initialValue:record.bearerStr,
     //           })(
     //             <Input
     //               disabled
     //               autoComplete="off"/>
     //           )}
     //         </FormItem>
     // }
   },{
     title: '*承担比例',
     dataIndex: 'ratio',
     width:'30%',
     render:(text,record,index) => {
       const { getFieldDecorator } =form;
       return <FormItem>
               {getFieldDecorator(`bearers[${index}].proportion`,{
                 initialValue:record.proportion,
                 rules:[{ required: true, message: '请输入承担比例'},{
                   pattern:/^\d+$/,message:'请输入数字'
                 },{
                   validator:validator
                 }],
                 onChange:changeProportion
               })(
                 <Input
                   suffix="%"
                   maxLength='15'
                   placeholder="请输入活动预算"
                   autoComplete="off"/>
               )}
             </FormItem>
     }
   },{
     title: '备注说明',
     dataIndex: 'remark',
     width:'40%',
     render:(text,record,index) => {
       const { getFieldDecorator } =form;
       return <FormItem>
               {getFieldDecorator(`bearers[${index}].remark`,{
                 initialValue:record.remark,
               })(
                 <Input
                   maxLength='30'
                   placeholder="请输入备注说明"
                   autoComplete="off"/>
               )}
             </FormItem>
     }
   },
 ]
}

export {
 columnsCreat,Columns
}
