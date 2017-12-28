import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';

class ShowGoods extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    }
	}

	editItem = () =>{
		
	}

	deleteItem = ()=>{
		
	}
    
    //上移元素
	upItem = () =>{
		
	}

    //下移元素
	downItem = () =>{
		
	}

	render(){
		return (
            <div>
                <div className='preview-goods selected-border'>
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
                <div className='preview-goods-two selected-border'>
                    <div onClick={this.editItem.bind(this)}>
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
                        <span onClick={this.upItem.bind(this)}><Icon type="up" /></span>
                        <span onClick={this.downItem.bind(this)}><Icon type="down" /></span>
                        <span onClick={this.editItem.bind(this)}>编辑</span>
                        <span onClick={this.deleteItem.bind(this)}>删除</span>
                    </div>
                </div>
            </div>
			)
	}
}
export default ShowGoods;