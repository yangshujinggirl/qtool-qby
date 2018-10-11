import {Button,Icon} from 'antd'
   const Columns = [{
        title:'商品编码',
        dataIndex: 'skuCode',
        render:(text,record,index)=>{
          if(record.outNo){
            return{
              children:<span className="testtttt">
                <span className='product_code'>子订单号：
                  <a href="javascript:;" className="theme-color">{record.ecSuborderNo}</a>
                  <span title='ewqe' className='audit_remark'><Icon type="caret-up" /></span>
                  <span title='喵喵' className='audit_remark_star'><Icon type="star" /></span>
                </span><br/>
                <span>有赞订单号：{record.outNo}</span>
              </span>,
              props:{
                colSpan:3
              },
            };
          }else{
            return(
              <span >{text}</span>
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
        dataIndex:"displayName",
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
        render:(text,record)=>{
          if(record.sumQty){
            return(<span>{record.sumQty}</span>)
          }else{
            return(<span>{text}</span>)
          }
        }

      },{
        title:'售价',
        dataIndex:"price",
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
        dataIndex:"amount",
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
              children:<span>下单时间：{record.payTime}</span>,
            };
          };
        }
      }];


   export  default Columns
