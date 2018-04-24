require('../../../style/brand.css')
import EditableTable from '../../../components/table/tablebasic'
import CollectionsPage from './model'
import { connect } from 'dva';

class Brandindex extends React.Component {
	getBrandData=()=>{
		this.props.dispatch({
			type:'brand/brandfetch',
			payload:{code:'qerp.web.pd.brand.list',values:{}}
		})
	}
	render() {
		const rolelists=this.props.data.rolelists
		//新增修改
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.brand.save"
		})
		return (
			<div className='content_box'>
				{
					addorder?
					<div className='tl mb15'>
						<CollectionsPage title='新增品牌' text='新增品牌' statetype='primary' data={{name:null,status:'1'}} url={null} addorderobj={addorder}/>
					</div> 
					:null
				}
				
				<p>品牌管理</p>
				{
					<ul className='list-box'>
						{
							this.props.pdBrands.map((item,index)=>{
								return (
									<div key={index} className='list-item'>
											<CollectionsPage 
												addorderobj={addorder}
												url={item.url} 
												type='1' 
												data={{name:item.name,status:item.status,pdBrandId:item.pdBrandId}}/>
											<p className='tc mt10'>{item.name}</p>
									</div>
								)
							})
						}
					</ul>
				}
			</div>
		)
	}	
	componentDidMount(){
		this.getBrandData()
	}
}

function mapStateToProps(state) {
	const {pdBrands} = state.brand;
    return {pdBrands};
}

export default connect(mapStateToProps)(Brandindex);
