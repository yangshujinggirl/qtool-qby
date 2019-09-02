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
      const {rolelists} = this.props.data;
      const bdown = rolelists.some(item=>item.urResourceId == 401500)//b端直降
      const bPrice = rolelists.some(item=>item.urResourceId == 401600)//b端进价
      return(
        <div className='mark_box'>
          {(bdown||bPrice)&&
            <div className='out_box'>
              <h1 className='title'>B端</h1>
              { bdown &&
                <div className='box' onClick={()=>this.togo('blow','b端限时直降')}>
                  <div className='img_box'>
                    <img className='img' alt="example" src={require('../../../assets/limit_time.png')}/>
                  </div>
                  <div className='right'>
                    <span className='theme'>限时促销</span>
                    <p className='des'>商品限时打折/特价</p>
                  </div>
                </div>
              }
              { bPrice &&
                <div className='box' onClick={()=>this.togo('bact','活动进价')}>
                  <div className='img_box'>
                    <img className='img' alt="example" src={require('../../../assets/enter_price.png')}/>
                  </div>
                  <div className='right'>
                    <span className='theme'>活动进价</span>
                    <p className='des'>采购活动商品前可配置活动进价</p>
                  </div>
                </div>
              }
          </div>
          }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const {onAudit} = state;
  return {onAudit};
}
export default connect(mapStateToProps)(Market)
