require('../../../style/brand.css')
import EditableTable from '../../../components/table/tablebasic'
import CollectionsPage from './model'
import { connect } from 'dva';

class Brandindex extends React.Component {
	getBrandData=()=>{
		this.props.dispatch({
			type:'goods/brandfetch',
			payload:{code:'qerp.web.pd.brand.list',values:{}}
		})
	}
	render() {
		return (
			<div className='content_box'>
				<div className='tr mb15'>
					<CollectionsPage title='新增品牌' text='新增品牌' statetype='primary' data={{name:null,status:'1'}} url={null}/>
				</div> 
				<p>品牌管理</p>
				{
					<ul className='list-box'>
						{
							this.props.pdBrands.map((item,index)=>{
								return (
									<div key={index} className='list-item'>
											<CollectionsPage url={item.url} type='1' data={{name:item.name,status:item.status,pdBrandId:item.pdBrandId}}/>
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
	const {pdBrands} = state.goods;
    return {pdBrands};
}

export default connect(mapStateToProps)(Brandindex);
