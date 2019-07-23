import react, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import ErrorText from '../ErrorText';
import 'swiper/dist/css/swiper.min.css';
import './index.less';

class CommonMod extends Component {
  render() {
    let { checkResult } =this.props;
    let { style, homepageModuleId } =this.props;
    let currentItem = checkResult.find((el) => el.homepageModuleId == this.props.homepageModuleId);
    currentItem=currentItem?currentItem:{};
    return(
      <div className={`common-sty ${this.props.className}`} style={style}>
        {
          this.props.children
        }
        <ErrorText currentItem={currentItem}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { homeEdit } =state;
  return homeEdit;
}
export default connect(mapStateToProps)(CommonMod);
