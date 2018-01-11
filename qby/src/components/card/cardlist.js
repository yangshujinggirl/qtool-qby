import { Card } from 'antd';

class Cardlist extends React.Component {
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
          <div className='cardlistbox'>
                {
                    this.state.data.map((item,index)=>{
                        return(
                            <Card style={{ width: 220,background:item.type=='1'?'red':'pink' }} key={index}>
                                <p>{item.title}</p>
                                <p>{item.value}</p>
                            </Card>
                        )
                    })
                }

          </div>
      );
    }
  
    
    
  }

  export default Cardlist;
  