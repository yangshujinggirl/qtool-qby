import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
const { TextArea } = Input;

class ShowRule extends React.Component{
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
	              <div className='preview-rule selected-border'>
	                  <div className='rule-wrapper' onClick={this.editItem.bind(this)}>
	                    <div className='rule-header'>
                  				<div style={{width:'98px',height:'39px',margin:'1px auto 0px'}}><img src={require('../../../../assets/rule_title.png')}  style={{width:'100%',height:'100%'}}/></div>
	                    </div>
	                      <div className='rule-content'>
	                      	<TextArea rows={4} className='textareas' disabled/>
	                       </div>
	                  </div>
	                  <div className='button-list'>
	                      <span onClick={this.upItem.bind(this)}><Icon type="up" /></span>
                          <span onClick={this.downItem.bind(this)}><Icon type="down" /></span>
                          <span onClick={this.editItem.bind(this)}>编辑</span>
                          <span onClick={this.deleteItem.bind(this)}>删除</span>
	                  </div>
	               </div>
			)
	}

	componentDidMount(){
		
	}
}
export default ShowRule;