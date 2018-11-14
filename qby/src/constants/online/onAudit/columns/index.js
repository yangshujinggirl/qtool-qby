  import {Button,Icon} from 'antd'
   const Columns = [{
        title:'商品编码',
        dataIndex: 'code',
        key:"code",
        render:(text,record,index)=>{
          if("outNo" in record){
            return{
              children:<span>
                <span className='product_code remark_box'>子订单号：
                  <a href="javascript:;" className="theme-color remark_box" onClick={(type)=>record.onOperateClick("detail")}>{record.ecSuborderNo}</a>
                  {
                    record.iconType ? <span title={record.iconTypeRemark} className='audit_remark bei'>备</span> : null
                  }
                  {
                    record.nameSign ? <span title="姓名不规范" className='audit_remark name'>名</span> : null
                  }
                  {
                    record.paySign ? <span title="商品实付金额为0" className='audit_remark zero'>零</span> : null
                  }
                  {
                    record.sendingSign ? <span title="该用户有未发货订单" className='audit_remark ready'>待</span> : null
                  }
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
        key:"name",
        render:(text,record,index)=>{
          if("name" in record){
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
        key:"displayName",
        render:(text,record,index)=>{
          if("name" in record){
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
        key:"qty",
        render:(text,record)=>{
          if(record.sumQty){
            return(<span>{record.sumQty}</span>)
          }else{
            return(<span>{text}</span>)
          };
        },
      },{
        title:'售价',
        dataIndex:"price",
        key:"price",
        render:(text,record,index)=>{
          if("name" in record){
            return(<span>{text}</span>)
          }else{
            return{
              props:{
                colSpan:3
              },
            };
          };
        }
      },{
        title:'金额',
        dataIndex:"amount",
        key:"amount",
        render:(text,record,index)=>{
          if("name" in record){
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
        key:"payAmount",
        render:(text,record,index)=>{
          if("name" in record){
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
        key:"orderMoney",
        render:(text,record,index)=>{
          if("name" in record){
            const obj = {
              children:<span>{text}</span>,
              props:{
                rowSpan:0
              },
            };
            if(index==0){
              obj.props.rowSpan = record.len;  //dataSource的长度
            }else{
              obj.props.rowSpan = 0;
            };
            return obj;
          }else{
            return{
              children:<div>仓库: {record.warehouseStr}　下单时间：{record.payTime}</div>,
              props:{
                colSpan:3,
              },
            };
          };
        }
      },{
        title:'订单实付金额',
        dataIndex: 'actmoney',
        key:"actmoney",
        render:(text,record,index)=>{
          if("name" in record){
            const obj = {
              children:<span>{text}</span>,
              props:{
                rowSpan:0
              },
            };
            if(index==0){
              obj.props.rowSpan = record.len;  //dataSource的长度
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
        dataIndex:"sumQty",
        key:"sumQty",
        render:(text,record,index)=>{
          const obj = {
            children:record.auditPass ? <div>
              <Button onClick={(type)=>record.onOperateClick("audit")} className='audit' type="primary">审核通过</Button><br/>
              <Button onClick={(type)=>record.onOperateClick("cancel")}>取消订单</Button>
            </div>:null,
            props:{
              rowSpan:0
            },
          };
          if("name" in record){
            if(index == 0){
              obj.props.rowSpan = record.len;  //dataSource的长度
            }else{
              obj.props.rowSpan = 0;
            };
            return obj;
          }else{
            return{
              children:<span>下单时间：{record.payTime}</span>,
              props:{
                colSpan:0
              }
            };
          };
        }
      }];



   export  default Columns
