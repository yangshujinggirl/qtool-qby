import React from 'react';
import { connect } from 'dva';
//头部信息部分
import ListInfo from '../getIntoStorage/listInfo';

class GetIntoStorageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state ={

        }
    }

    render() {
        return (   
    		<div>
                <ListInfo infoList={this.props.itemDetail.asn}/>
            </div>
        )
    }
    componentDidMount(){
        console.log(this.props.data);
        if(this.props.data){
            this.props.dispatch({ 
                type: 'storageDetail/fetch', 
                payload: {code:'qerp.web.ws.asn.detail',values:{'wsAsnId':this.props.data.itemId}}
             })
        //     const payload={code:'qerp.web.ur.user.get',values:{'urUserId':this.props.data.urUserId}}
        //   this.initDateEdit(payload)
        }
    }
}

function mapStateToProps(state) {
    const itemDetail=state.storageDetail.itemDetail;
    return {itemDetail};
}
  
export default connect(mapStateToProps)(GetIntoStorageComponent);