import {Button} from 'antd'
// const Columns = [{
//      title: '订单号',
//      dataIndex: 'orderNo',
//      render:(text, record)=>{
//        return(
//          <div>
//            <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>{text}</a>
//          </div>
//        )
//      }
//    },{
//      title: '门店名称',
//      dataIndex: 'spShopName'
//    },{
//      title: '用户昵称',
//      dataIndex: 'nickName'
//    }, {
//      title: '用户电话',
//      dataIndex: 'mobilePhone'
//    },{
//      title: '商品数量',
//      dataIndex: 'qtySum'
//    },{
//      title: '订单金额',
//      dataIndex: 'amountSum'
//    },{
//      title: '用户支付金额',
//      dataIndex: 'payAmount'
//    },{
//      title: '流程状态',
//      dataIndex: 'orderStatusStr'
//    },{
//      title: '订单时间',
//      dataIndex: 'createTime'
//    }];
    const  renderContent = ()=>{
      return{
        props:{
          colSpan:0
        }
      }
    }
   const Columns = [{
        title:'商品编码',
        dataIndex: 'code',
        render:(text,record,index)=>{
          return{
            children:<div>
              <p>{text}</p>
              <p>{record.youcode}</p>
            </div>,
            props:{
              colSpan:8
            }
          }
        }
      },{
        title:'商品名称',
        dataIndex: 'name',
        render:renderContent
      },{
        title:'规格',
        render:renderContent
      }, {
        title:'数量',
        render:renderContent
      },{
        title:'售价',
        render:renderContent
      },{
        title:'金额',
        render:renderContent
      },{
        title:'商品实付金额',
        render:renderContent
      },{
        title:'订单金额',
        render:renderContent
      },{
        title:'订单实付金额',
        dataIndex: 'actmoney',
        render:()=>{
          return{
            children:<a>订单编号：1111</a>,
            props:{
              colSpan:2
            }
          }
        }
      },{
        title:'操作',
        render:renderContent
      }];


   export  default Columns
