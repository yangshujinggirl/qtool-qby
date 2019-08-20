import { Input, Form, Select, Button, DatePicker } from 'antd';
const FormItem = Form.Item;

const columnsIndex=[
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
  },{
    title: '活动ID',
    dataIndex: 'mktActivityId',
    key: 'mktActivityId',
  },{
    title: '活动名称',
    dataIndex: 'name',
    key: 'name',
  },{
    title: '活动类型',
    dataIndex: 'type',
    key: 'type',
  },{
    title: '活动时间',
    dataIndex: 'time',
    key: 'time',
  },{
    title: '活动状态',
    dataIndex: 'status',
    key: 'status',
  },{
    title: '发起人',
    dataIndex: 'createUser',
    key: 'createUser',
  },{
    title: '操作',
    dataIndex: 'opreation',
    key: 'opreation',
    render:(text,record,index) => {
      return(
        <div className="list-handle-opreation">
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('info')}>查看</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('edit')}>编辑</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('delete')}>删除</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('cancel')}>撤销审核</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('zuofei')}>作废</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('forcedEnd')}>强制结束</span>
        </div>
      )
    }
  },];
const columnsCreat =(form,validator)=>{
  return [{
      title: '活动预算',
      dataIndex: 'budget',
      width:'20%',
      render:(text,record,index) => {
        const { getFieldDecorator } =form;
        let chldrnDom = <FormItem>
                {getFieldDecorator(`cost[${index}].budget`,{
                  initialValue:record.budget,
                  rules:[{pattern:/^\d+$/,message:'请输入数字'}]
                })(
                  <Input
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
          obj.props.rowSpan = 2;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    },{
      title: '承担方',
      dataIndex: 'bearer',
      width:'10%',
    },{
      title: '承担比例',
      dataIndex: 'ratio',
      width:'30%',
      render:(text,record,index) => {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`cost[${index}].ratio`,{
                  initialValue:record.ratio,
                  rules:[{pattern:/^\d+$/,message:'请输入数字'},{
                    validator:validator
                  }]
                })(
                  <Input
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
                {getFieldDecorator(`cost[${index}].remark`,{
                  initialValue:record.title,
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
  columnsIndex,
  columnsCreat
}
