import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class Skucom extends React.Component {
    state = {
    };
    
    render() {
        return (
           <div>
               123
           </div>
        );
    }
  
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.goods;
    const {pdCategorysList}=state.IndexPage;
    return {limit,currentPage,pdCategorysList};
}

// const Goodssearchform = Form.create()(AdvancedSearchForm);
export default connect(mapStateToProps)(Skucom);