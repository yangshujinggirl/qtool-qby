import react,{Component} from 'react'
import { connect } from 'dva';

class Market extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  bAct =()=> {
    const paneitem = {
      title:'b端进价',
      key:this.props.componkey,
      componkey:this.props.componkey,
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render(){
    console.log(this.props)
      return(
        <div>
          <div style={{'cursor':'pointer'}} onClick={this.bAct}>b限时促销</div>
          <div onClick={this.bPrice}>b活动进价</div>
          <div onClick={this.coupon}>c优惠券</div>
          <div onClick={this.cDown}>c限时直降</div>
        </div>
      )
  }
}
function mapStateToProps(state) {
  const {onAudit} = state;
  return {onAudit};
}
export default connect(mapStateToProps)(Market)
