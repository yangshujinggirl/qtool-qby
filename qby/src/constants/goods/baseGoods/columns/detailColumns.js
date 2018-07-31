
const OnLineDetailSizeColumns = [{
     title: '商品规格',
     dataIndex: 'actionTypeStr',
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
     title: '采购价',
     dataIndex: 'purchasePrice'
   },{
     title: '到货价',
     dataIndex: 'receivePrice'
   },{
     title: '出库价',
     dataIndex: 'deliveryPrice'
   }];
const OnLineDetailColumns = [{
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
const OutLineDetailSizeColumns = [{
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
   }];
const OutLineDetailColumns = [{
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
   }];

   export default {
     OnLineDetailSizeColumns,
     OnLineDetailColumns,
     OutLineDetailColumns,
     OutLineDetailSizeColumns
    };
