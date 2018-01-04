import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker,Card} from 'antd';
import { connect } from 'dva';
import '../../../style/cardlist.css';

const FormItem = Form.Item;
class DatacglistCard extends React.Component {
  state = {};
  render() {
     
    return (
        <div className='cardlistbox'>
            <Card style={{ width: 220 }} className='tc'>
                <p>本月采购金额</p>
                <p className='cardpay'>12345.00</p>
                <Icon type="caret-down" style={{color:'pink'}}/>
                10%同比上月
            </Card>
            <Card style={{ width: 220 }} className='tc'>
                <p>本月采购金额</p>
                <p className='cardpay'>12345.00</p>
                <Icon type="caret-down" style={{color:'pink'}}/>
                10%同比上月
            </Card>
            <Card style={{ width: 220 }} className='tc'>
                <p>本月采购金额</p>
                <p className='cardpay'>12345.00</p>
                <Icon type="caret-down" style={{color:'pink'}}/>
                10%同比上月
            </Card>
            <Card style={{ width: 220 }} className='tc'>
                <p>本月采购金额</p>
                <p className='cardpay'>12345.00</p>
                <Icon type="caret-down" style={{color:'pink'}}/>
                10%同比上月
            </Card>



        </div>
    );
  }

  
  
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.datawson;
    return {limit,currentPage};
}

export default connect(mapStateToProps)(DatacglistCard);