import { Row, Col, Table, Button } from 'antd';
import { columnsSingleDown,columnsSingleGift,columnsAreaGift,columnsAreaMinus } from './columns';

//10.单品直降 11.单品多级满赠 20.专区多级满元赠 21.专区多级满件赠 22专区多级满元减 23.专区满件减免
function DetailGoods({...props}) {
  const { info } =props;
  let columns;
  switch(info.promotionType) {
    case 10:
     columns = columnsSingleDown;
     break;
    case 11:
     columns = columnsSingleGift;
     break;
    case 20:
    case 21:
    case 23:
     columns = columnsAreaGift;
     break;
    case 22:
     columns = columnsAreaMinus;
     break;
  }
  return <div className="detail-mode-wrap">
          <Row className="item-row">
            共6条数据
            <Button type="primary" onClick={props.exportData}>导出商品明细</Button>
          </Row>
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={info.promotionProducts}/>
         </div>
}
export default DetailGoods;
