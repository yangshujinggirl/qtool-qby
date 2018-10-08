import {Button,Icon} from 'antd'
   const Columns = [{
        title:'商品编码',
        dataIndex: 'code',
        render:(text,record,index)=>{
          if(record.youcode){
            return{
              children:<span>
                <span className='product_code'>子订单号：
                  <a href="javascript:;" className="theme-color">{record.zicode}</a>
                  <span title='ewqe' className='audit_remark'><Icon type="caret-up" theme="outlined" /></span>
                  <span title='喵喵' className='audit_remark_star'><Icon type="star" theme="filled" /></span>
                </span><br/>
                <span>有赞订单号：{record.youcode}</span>
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
