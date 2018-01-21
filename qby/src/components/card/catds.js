import { Card ,Icon} from 'antd';

class Cards extends React.Component {
    render() {
      return (
        <Card>
            <div className='cardlistbox'>
                {
                    this.props.data.map((item,index)=>{
                        return(
                            <Card style={{ width: '15%',textAlign:'center'}} key={index} bordered={false}>
                                <p>{item.title}</p>
                                <p className='f24' style={{color:"#333"}}>{item.value}</p>
                                {
                                    item.rate=='0'?<p style={{marginTop:"6px"}}>{item.rate+'%'+item.text}</p>:
                                    <p style={{marginTop:"6px"}}><Icon type={item.type=='0'?'caret-down':'caret-up'} style={{color:item.type=='0'?"#ED6531":"#5DB637"}}/>{item.rate+'%'+item.text}</p>
                                }
                                
                                
                            </Card>    
                        )   
                    })
                }             
            </div>
        </Card>   
      );
    }
  
    
    
  }

  export default Cards;
  