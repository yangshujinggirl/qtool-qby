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
     title: '零售价',
     dataIndex: 'toCPrice'
   },{
     title: '金卡售价',
     dataIndex: 'goldCardPrice'
   },{
     title: '银卡售价',
     dataIndex: 'silverCardPrice'
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
      title: '零售价',
      dataIndex: 'toCPrice'
    },{
      title: '金卡售价',
      dataIndex: 'goldCardPrice'
    },{
      title: '银卡售价',
      dataIndex: 'silverCardPrice'
    }];

   export default { DetailSizeColumns, DetailColumns };
