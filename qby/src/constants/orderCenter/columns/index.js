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
   const Columns = [{
        title:'商品编码',
        dataIndex: 'code',
        render:(text,record,index)=>{
          if(record.youcode){
            return{
              children:<span>
                <span className='product_code'>订单：<a href="javascript:;" className="theme-color">{record.zicode}</a></span><br/>
                <span>子订单：{record.youcode}</span>
              </span>,
              props:{
                colSpan:3
              },
            };
          }else{
            return(
              <span>{text}</span>
            )
          };
        }
      },{
        title:'商品名称',
        dataIndex: 'name',
        render:(text,record,index)=>{
          if(record.name){
            return(<span>{text}</span>)
          }else{
            return{
              props:{
                colSpan:0
              },
            };
          };
        }
      },{
        title:'规格',
        dataIndex:"size",
        render:(text,record,index)=>{
          if(record.name){
            return(<span>{text}</span>)
          }else{
            return{
              props:{
                colSpan:0
              },
            };
          };
        }
      }, {
        title:'数量',
        dataIndex:"qty",

      },{
        title:'售价',
        dataIndex:"sellprice",
        render:(text,record,index)=>{
          if(record.name){
            return(<span>{text}</span>)
          }else{
            return{
              props:{
                colSpan:5
              },
            };
          };
        }
      },{
        title:'金额',
        dataIndex:"price",
        render:(text,record,index)=>{
          if(record.name){
            return(<span>{text}</span>)
          }else{
            return{
              props:{
                colSpan:0
              },
            };
          };
        }
      },{
        title:'商品实付金额',
        dataIndex:"payAmount",
        render:(text,record,index)=>{
          if(record.name){
            return(<span>{text}</span>)
          }else{
            return{
              props:{
                colSpan:0
              },
            };
          };
        }
      },{
        title:'订单金额',
        dataIndex:"orderMoney",
        render:(text,record,index)=>{
          if(record.name){
            const obj = {
              children:<span>{text}</span>,
              props:{
                rowSpan:0
              },
            };
            if(index==0){
              obj.props.rowSpan = 3;  //dataSource的长度
            }else{
              obj.props.rowSpan = 0;
            };
            return obj;
          }else{
            return{
              props:{
                colSpan:0,
              },
            };
          };
        }
      },{
        title:'订单实付金额',
        dataIndex: 'actmoney',
        render:(text,record,index)=>{
          if(record.name){
            const obj = {
              children:<span>{text}</span>,
              props:{
                rowSpan:0
              },
            };
            if(index==0){
              obj.props.rowSpan = 3;  //dataSource的长度
            }else{
              obj.props.rowSpan = 0;
            };
            return obj;
          }else{
            return{
              props:{
                colSpan:0
              },
            };
          };
        }
      },{
        title:'操作',
        render:(text,record,index)=>{
          const obj = {
            children:<div>
              <Button className='audit' type="primary">审核通过</Button><br/>
              <Button>取消订单</Button>
            </div>,
            props:{
              rowSpan:3
            },
          };
          if(record.name){
            if(index == 0){
              obj.props.rowSpan = 3;  //dataSource的长度
            }else{
              obj.props.rowSpan = 0;
            };
            return obj;
          }else{
            return{
              children:<span>下单时间：{record.time}</span>,
            };
          };
        }
      }];


   export  default Columns
