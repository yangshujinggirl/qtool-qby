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
     dataIndex: 'toBPrice'
   },{
     title: '零售价',
     dataIndex: 'toCPrice'
   },{
     title: '建议零售价',
     dataIndex: 'tagPrice'
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
     title: '零售价',
     dataIndex: 'toCPrice'
   },{
     title: '建议零售价',
     dataIndex: 'tagPrice'
   }];

   export default { DetailSizeColumns, DetailColumns };
