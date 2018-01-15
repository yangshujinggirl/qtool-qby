import { Card ,Icon} from 'antd';

class Cards extends React.Component {
    render() {
      return (
        <Card>
            <div className='cardlistbox'>
                {
                    this.props.data.map((item,index)=>{
                        return(
                            <Card style={{ width: 220,textAlign:'center'}} key={index} bordered={false}>
                                <p>{item.title}</p>
                                <p className='f24'>{item.value}</p>
                                <p><Icon type={item.type=='0'?'caret-down':'caret-up'} />{item.rate+'%'+item.text}</p>
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
  