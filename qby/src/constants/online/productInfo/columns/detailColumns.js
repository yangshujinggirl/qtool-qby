import Imgmodel from '../../../../components/model/modelimg';
import {Input} from 'antd'
//sku
const DetailSizeColumns = [{
     title: '商品规格',
     dataIndex: 'name',
   },{
     title: '商品编码',
     dataIndex: 'code',
   },{
     title: '商品条码',
     dataIndex: 'barcode'
   }, {
     title: '售价',
     dataIndex: 'salePrice'
   },{
     title: '到货价',
     dataIndex: 'receivePrice'
   },{
     title: '出库价',
     dataIndex: 'deliveryPrice'
   },{
     title: 'SKU图片',
     dataIndex: 'picUrl',
     render:(text, record, index)=> {
       return <div>
                {
                  record.picUrl !=''?
                  <div className="table-img-wrap">
                    <Imgmodel picUrl={record.picUrl}/>
                  </div>
                 :
                 null
               }
             </div>
     }
   },{
     title: '商品提示',
     dataIndex:"goodsExplain",
     render:(text,record,index)=>{
       if(record.type=='detail'){
        return (<span>{text}</span>)
       };
       return (
         <div><Input value={text} placeholder="30字以内，C端展示谨慎填写" autoComplete="off" maxLength='30' onChange={(e)=>record.onOperateClick(e)}/></div>
       )
     }
 }];
//spu
const DetailColumns = [{
     title: '商品编码',
     dataIndex: 'code',
   },{
     title: '商品条码',
     dataIndex: 'barcode'
   }, {
     title: '售价',
     dataIndex: 'salePrice'
   },{
     title: '到货价',
     dataIndex: 'receivePrice'
   },{
     title: '出库价',
     dataIndex: 'deliveryPrice'
   },{
     title: '商品提示',
     dataIndex:"goodsExplain",
     render:(text,record,index)=>{
        if(record.type=='detail'){
         return (<span>{text}</span>)
        };
        return (
          <div><Input value={text} placeholder="30字以内，C端展示谨慎填写" autoComplete="off" maxLength='30' onChange={(e)=>record.onOperateClick(e)}/></div>
        )
    }
   }];

   export default { DetailSizeColumns, DetailColumns };
