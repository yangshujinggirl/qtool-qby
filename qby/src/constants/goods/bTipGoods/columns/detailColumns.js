
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
     dataIndex: 'toBPrice'
   },{
     title: '零售价',
     dataIndex: 'toCPrice'
   },{
     title: '建议零售价',
     dataIndex: 'costPrice'
   },{
     title: '进货价',
     dataIndex: 'tagPrice'
   },{
     title: 'SKU图片',
     dataIndex: 'picUrl',
     render:(text, record, index)=> {
       return <div>
                {
                  record.picUrl !=''?
                  <div className="img-wrap" style={{'width':'105px','height':'105px'}}>
                    <img src={record.imgUrl} style={{'width':'100%'}}/>
                  </div>
                 :
                 null
               }
             </div>
     }
   }];
const DetailColumns = [{
     title: '商品编码',
     dataIndex: 'code',
   },{
     title: '商品条码',
     dataIndex: 'barcode'
   }, {
     title: '售价',
     dataIndex: 'toBPrice'
   },{
     title: '采购价',
     dataIndex: 'purchasePrice'
   },{
     title: '到货价',
     dataIndex: 'receivePrice'
   },{
     title: '出库价',
     dataIndex: 'deliveryPrice'
   }];

   export default { DetailSizeColumns, DetailColumns };
