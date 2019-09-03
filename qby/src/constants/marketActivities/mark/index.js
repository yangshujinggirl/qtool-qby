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
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render(){
      const {rolelists} = this.props.data;
      const cAct = rolelists.some(item=>item.urResourceId == 1501100)//c端活动
      const cAudit = rolelists.some(item=>item.urResourceId == 1501200)//c端活动审核
      return(
        <div className='mark_box'>
          <div className='out_box'>
            <h1 className='title'>C端</h1>
              <div className='box' onClick={()=>this.togo('level','C端活动')}>
                <div className='img_box'>
                  <img className='img' alt="example" src={require('../../../assets/act.png')}/>
                </div>
                <div className='right'>
                  <span className='theme'>C端活动</span>
                </div>
              </div>
              <div className='box' onClick={()=>this.togo('audit','c端活动审核')}>
                <div className='img_box'>
                  <img className='img' alt="example" src={require('../../../assets/audit.png')}/>
                </div>
                <div className='right'>
                  <span className='theme'>c端活动审核</span>
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
