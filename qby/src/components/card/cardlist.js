import { Card } from 'antd';

class Cardlist extends React.Component {
    render() {
      return (
          <div className='cardlistbox tc mt30'>
                {
                    this.props.data.map((item,index)=>{
                        return(
                            <Card style={{ width: 220,color:"#fff",padding:'10px 0',cursor:'pointer',background:item.bg}} key={index}>
                                <p>{item.title}</p>
                                <p className='f24'>{item.value}</p>
                            </Card>
                        )
                    })
                }

          </div>
      );
    }
  
    
    
  }

  export default Cardlist;

  
  