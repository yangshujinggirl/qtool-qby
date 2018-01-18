import { connect } from 'dva';
import { Tag, Input, Tooltip, Icon ,message} from 'antd';
import {GetServerData} from '../../../services/services';

class EditableTagGroup extends React.Component {
state = {
	tags: [],
	inputVisible: false,
	inputValue: '',
};

handleClose = (removedTag) => {
	console.log(removedTag)
	const iallpdTypeVals=removedTag
	const types=this.props.types
	this.props.dispatch({
		type:'goods/deletetags',
		payload:{iallpdTypeVals,types}
	})
	// const tags = this.props.tags.filter(tag => tag !== removedTag);

}
showInput = () => {
	this.setState({ inputVisible: true }, () => this.input.focus());
}
handleInputChange = (e) => {
	const str=e.target.value.replace(/\s+/g,"");  
	this.setState({ inputValue: str });
}

handleInputConfirm = () => {
	//判断select是都选中
	//对inoutvalue进行判断，判断是否已经存在相同的名字，如果存在，则获取id，如果不存在，则新建一个，再拉取id
	const inputValue=this.state.inputValue
	const pdTypesId=this.props.pdTypesId
	if(pdTypesId=='00'){
		message.error('请确保选择了规格',.8);
		return
	}
	this.getTypevallist(inputValue,pdTypesId)
}


//规格属性匹配
	getTypevallist=(inputValue,id)=>{
		const values={
			pdTypeId:id,
			enabled:true,
			firstent:true
		}
		const result=GetServerData('qerp.web.pd.typeval.list',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				const allpdTypeVals=json.pdTypeVals
				//判断inputValue是否已经存在
				const iallpdTypeVal=allpdTypeVals.filter((currentValue)=>{
						return currentValue.name==inputValue
					})
					if(iallpdTypeVal.length>0){
						//存在
						const iallpdTypeVals={
							name:iallpdTypeVal[0].name,
							keys:iallpdTypeVal[0].pdTypeValId,
						}
						const types=this.props.types
						this.props.dispatch({
							type:'goods/newtags',
							payload:{iallpdTypeVals,types}
						})
						this.hindok()
						if(this.state.firstent){
							message.success('此属性已存在',.8)
						}
						this.setState({
							firstent:true
						})
					}else{
						this.setState({
							firstent:false
						},function(){
							//不存在
							this.newTypevallist(inputValue,id)
						})
						

					}



			}
		})


	}


	//新建tags
	newTypevallist=(inputValue,id)=>{
		var values={pdTypeVal:{pdTypeId:id,name:inputValue,status:'1'}}
		const result=GetServerData('qerp.web.pd.typeval.save',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				this.getTypevallist(inputValue,id)
			}
		})
	}

	







hindok=()=>{
	this.setState({
		inputValue:'',
		inputVisible:false
	},function(){
		const pdType1Ids=this.props.pdType1Id
		const pdType2Ids=this.props.pdType2Id
		const tag1s=this.props.tag1
		const tag2s=this.props.tag2
		this.props.dispatch({
			type:'goods/goodsinfoChange',
			payload:{pdType1Ids,pdType2Ids,tag1s,tag2s}
		})


	})
	



}

saveInputRef = input => this.input = input

render() {
	const { tags, inputVisible, inputValue } = this.state;
	return (
		<div>
			{
				this.props.tags.map((tag, index) => {
					const tagElem = (
						<Tag key={index} closable={index !== '-1'} afterClose={() => this.handleClose(tag)}>
						{tag.name}
						</Tag>
					);
					return  tagElem;
				})
			}
			{inputVisible && (
			<Input
				ref={this.saveInputRef}
				type="text"
				size="small"
				style={{ width: 78 }}
				value={inputValue}
				onChange={this.handleInputChange}
				onBlur={this.handleInputConfirm}
				onPressEnter={this.handleInputConfirm}
			/>
			)}
			{!inputVisible && (
			<Tag
				onClick={this.showInput}
				style={{ background: '#fff', borderStyle: 'dashed' }}
			>
				<Icon type="plus" /> 新建属性
			</Tag>
			)}
		</div>
	);
}
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,details,binCode,values,limit,currentPage,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdCategorys,pdBrand,pdTypeslist,pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce} = state.goods;
	const {pdCategorysList}=state.IndexPage;
	return {cardtitle,cardlist,details,binCode,values,limit,currentPage,pdCategorys,pdCategorysList,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdBrand,pdTypeslist,pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce};
}
export default connect(mapStateToProps)(EditableTagGroup);