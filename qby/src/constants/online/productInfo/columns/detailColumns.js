import Imgmodel from '../../../../components/model/modelimg';

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
     dataIndex: 'goodsExplain'
   }];
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
     dataIndex: 'goodsExplain'
   }];

   export default { DetailSizeColumns, DetailColumns };
