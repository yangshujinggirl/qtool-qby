import react,{Component} from 'react'
import { Card } from 'antd';
import { connect } from 'dva';
const { Meta } = Card;
import './index.less'

class Market extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  togo =(suffix,title)=> {
    const paneitem = {
      title,
      key:`${this.props.componkey}` + suffix,
      componkey:`${this.props.componkey}` + suffix,
      roleList:111
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render(){
      return(
        <div className='mark_box'>
          <div className='out_box'>
            <h1 className='title'>B端</h1>
            <div className='box' onClick={()=>this.togo('blow','b端限时直降')}>
              <div className='img_box'>
                <img className='img' alt="example" src={require('../../../assets/limit_time.png')}/>
              </div>
              <div className='right'>
                <span className='theme'>限时促销</span>
                <p className='des'>商品限时打折/特价</p>
              </div>
            </div>
            <div className='box' onClick={()=>this.togo('bact','活动进价')}>
              <div className='img_box'>
                <img className='img' alt="example" src={require('../../../assets/enter_price.png')}/>
              </div>
              <div className='right'>
                <span className='theme'>活动进价</span>
                <p className='des'>采购活动商品前可配置活动进价</p>
              </div>
            </div>
        </div>
        <div className='out_box'>
          <h1 className='title'>C端</h1>
            <div className='box' onClick={()=>this.togo('coupon','优惠券')}>
              <div className='img_box'>
                <img className='img' alt="example" src={require('../../../assets/coupon.png')}/>
              </div>
              <div className='right'>
                <span className='theme'>优惠券</span>
                <p className='des'>向顾客发放优惠券</p>
              </div>
            </div>
            <div className='box' onClick={()=>this.togo('clow','c端限时直降')}>
              <div className='img_box'>
                <img className='img' alt="example" src={require('../../../assets/limit_time.png')}/>
              </div>
              <div className='right'>
                <span className='theme'>限时直降</span>
                <p className='des'>设置商品在活动时间享特殊价格</p>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const {onAudit} = state;
  return {onAudit};
}
export default connect(mapStateToProps)(Market)
