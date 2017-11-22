
class Info_top_tab extends React.Component {
  	render() {
      	const tit=[
			{text:'配货单号',name:'123'},
			{text:'合单时间',name:'123'},
			{text:'订单状态',name:'123'},
			{text:'门店/供应商名称',name:'123'},
			{text:'收货人姓名',name:'123'},
			{text:'收货人电话',name:'123'},
			{text:'收货地址',name:'123'},
			{text:'包含订单',name:'123'}
		  ]
    	return (
      		<div style={{padding:'0 15px'}}>
        		<div style={{borderRadius:'4px 4px 0 0', border:'1px solid #d9d9d9'}}>
          			<p style={{borderBottom:'1px solid #d9d9d9', padding:'16px 8px'}}>{this.props.title}</p>
          			<div style={{display:'flex',flexWrap:'wrap',margin:'0 0 16px 0'}}>
						{
						tit.map((item,index)=>{
						return <div key={index} style={{padding:'16px 22px 0 8px'}}><label>{item.text}：</label><span>{item.name}</span></div>
						})
						}
            		</div>
        		</div>
      		</div>
    	);
  	}
}
export default Info_top_tab