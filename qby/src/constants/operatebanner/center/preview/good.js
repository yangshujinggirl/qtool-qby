import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
import { connect } from 'dva';
import {deepcCloneObj} from '../../../../utils/commonFc';
class ShowGoods extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    }
	}

	editItem = () =>{
		this.props.dispatch({
            type:'h5config/syncCurrentItem',
            payload:this.props.index
        });
	}

	deleteItem = ()=>{
		let tempConfigArr = deepcCloneObj(this.props.configArr);
        tempConfigArr.splice(this.props.index,1);
        this.props.dispatch({
            type:'h5config/syncConfigArr',
            payload:tempConfigArr
        });
        this.props.dispatch({
            type:'h5config/syncCurrentItem',
            payload:-1
        });
	}
    
    //上移元素
	upItem = () =>{
        let tempConfigArr = deepcCloneObj(this.props.configArr);
        tempConfigArr.map((elem, index) =>{
            elem.selected = false;
        });
        tempConfigArr[this.props.currentItem].selected = true;
        if(this.props.index == 0) {
            return;
        };
        this.swapItems(tempConfigArr, this.props.index, this.props.index - 1);
        tempConfigArr.map((elem, index) =>{
            if(elem.selected == true){
                this.props.dispatch({
                    type:'h5config/syncCurrentItem',
                    payload:index
                });
            }
        });
	}

    //下移元素
	downItem = () =>{
        let tempConfigArr = deepcCloneObj(this.props.configArr);
        tempConfigArr.map((elem, index) =>{
            elem.selected = false;
        });
        tempConfigArr[this.props.currentItem].selected = true;
        if(this.props.index == tempConfigArr.length -1) {
            return;
        }
        this.swapItems(tempConfigArr, this.props.index, this.props.index + 1);
        tempConfigArr.map((elem, index) =>{
            if(elem.selected == true){
                this.props.dispatch({
                    type:'h5config/syncCurrentItem',
                    payload:index
                });
            }
        })	
    }
    
    //元素移动
    swapItems = (arr, index1, index2)=> {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        let tempConfigArr = arr;
        this.props.dispatch({
            type:'h5config/syncConfigArr',
            payload:tempConfigArr
        });
    };

	render(){
		return (
            <div>
                {
                    this.props.data.template == 1?
                    <div className={this.props.index == this.props.currentItem?'preview-goods selected-border':'preview-goods'}>
                        <div className='goods-content' onClick={this.editItem.bind(this)}>
                            <div className='goods-content-img'>
                                <img/>
                            </div>
                            <div className='goods-content-info'>
                                <p>示例商品</p>
                                <span>￥317</span>
                                <button disabled>立即购买</button>
                            </div>
                        </div>
                        <div className='button-list'>
                            <span onClick={this.upItem.bind(this)}><Icon type="up" /></span>
                            <span onClick={this.downItem.bind(this)}><Icon type="down" /></span>
                            <span onClick={this.editItem.bind(this)}>编辑</span>
                            <span onClick={this.deleteItem.bind(this)}>删除</span>
                        </div>
                    </div>
                    :
                    <div className={this.props.index == this.props.currentItem?'preview-goods-two selected-border':'preview-goods-two'}>
                        <div className="goodstwo-wrapper" onClick={this.editItem.bind(this)}>
                            <div className='goods-content-two'>
                                <div className='content-img-two'>
                                    <img/>
                                </div>
                                <div className='content-info-two'>
                                    <p>示例商品</p>
                                    <span>￥317</span>
                                    <button>立即购买</button>
                                </div>
                            </div>
                            <div className='goods-content-two'>
                                <div className='content-img-two'>
                                    <img/>
                                </div> 
                                <div className='content-info-two'>
                                    <p>示例商品</p>
                                    <span>￥317</span>
                                    <button disabled>立即购买</button>
                                </div>
                            </div>
                        </div>
                        <div className='button-list'>
                            <span onClick={this.upItem.bind(this)}><Icon type="up"/></span>
                            <span onClick={this.downItem.bind(this)}><Icon type="down"/></span>
                            <span onClick={this.editItem.bind(this)}>编辑</span>
                            <span onClick={this.deleteItem.bind(this)}>删除</span>
                        </div>
                    </div>
                }
            </div>
		)
	}
}

function mapStateToProps(state) {
    const {configArr,currentItem}= state.h5config;
	return {configArr,currentItem};
}

export default connect(mapStateToProps)(ShowGoods);