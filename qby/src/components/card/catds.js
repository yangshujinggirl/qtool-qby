import { Card } from 'antd';

class Cards extends React.Component {
    state = {
        data:[{
            title:'门店排行榜',
            value:'2330',
            type:'1'
        },{
            title:'学习门店',
            value:'23310',
            type:'2'
        }]
    };
    render() {
      return (
        <Card>
            <div className='cardlistbox'>
            {
                 this.state.data.map((item,index)=>{
                    return(
                        <Card style={{ width: 220,textAlign:'center'}} key={index} bordered={false}>
                            <p>{item.title}</p>
                            <p>{item.value}</p>
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
  