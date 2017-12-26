import WarehouseIndexTable from './table';
import WrappedAdvancedSearchForm from './search';

class CzIndex extends React.Component{
	render(){
		return(
			<div>
				<WrappedAdvancedSearchForm/>
				<div className='mt15'>
					<WarehouseIndexTable/>
				</div>
			</div>
		)
	}
}

export default CzIndex;
