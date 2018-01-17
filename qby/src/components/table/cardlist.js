import { Card } from 'antd';

class Cardlist extends React.Component {
	render() {
		return (
			<Card title={this.props.cardtitle}>
				<div className='cardlist'>
					{
						this.props.cardlist.map((item,index)=>{
							return (<div className='cardlist_item' key={index}><label>{item.lable}：</label><span>{item.text}</span></div>)
						})
					}
				</div>
			</Card>
		);
	}
}
export default Cardlist