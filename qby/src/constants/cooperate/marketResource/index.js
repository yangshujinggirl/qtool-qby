import React,{ Component } from 'react';
import Columns from './columns/index';
import FilterForm from './FilterForm/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import {connect} from 'dva'
class MarketResource extends Component{
    constructor(props){
        super(props)
    }

    componentWillMount() {
        this.getList({"dateStart":"2018-06-13 00:00:00","dateEnd":"2018-07-12 23:59:59","deliveryTimeST":"","deliveryTimeET":"","limit":15,"currentPage":0})
    }
    getList(values) {
        this.props.dispatch({
            type:'marketResource/fetchList',
            payload:{values:values}
        })
    }
    render(){
        return(
            <div>
                <FilterForm />
                <Qtable

                />
            </div>
        )
    }
}

function mapStateToProps(state){
    const {marketResource} = state;
    return {marketResource}

}
export default connect(mapStateToProps)(MarketResource)
