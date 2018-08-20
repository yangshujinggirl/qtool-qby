import Imgmodel from '../../../../components/model/modelimg';

const OnLineDetailSizeColumns = [{
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
     title: '采购价',
     dataIndex: 'purchasePrice'
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
                  <div className="img-wrap">
                    <Imgmodel picUrl={record.picUrl}/>
                  </div>
                 :
                 null
               }
             </div>
     }
   }];
const OnLineDetailColumns = [{
     title: '商品编码',
     dataIndex: 'code',
   },{
     title: '商品条码',
     dataIndex: 'barcode'
   }, {
     title: '售价',
     dataIndex: 'salePrice'
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
     dataIndex: 'tagPrice'
   },{
     title: '进货价',
     dataIndex: 'costPrice'
   },{
     title: 'SKU图片',
     dataIndex: 'picUrl',
     render:(text, record, index)=> {
       return <div>
                {
                  record.picUrl !=''?
                  <div className="img-wrap">
                    <Imgmodel picUrl={record.picUrl}/>
                  </div>
                 :
                 null
               }
             </div>
     }

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
     dataIndex: 'tagPrice'
   },{
     title: '进货价',
     dataIndex: 'costPrice'
   }];

   export default {
     OnLineDetailSizeColumns,
     OnLineDetailColumns,
     OutLineDetailColumns,
     OutLineDetailSizeColumns
    };
