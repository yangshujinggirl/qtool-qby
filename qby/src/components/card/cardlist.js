import { Card } from 'antd';

class Cardlist extends React.Component {
    hindClick=(index)=>{
        console.log(index)
        if(index=='0'){
            
        }
        if(index=='1'){
            
        }
        if(index=='2'){
            
        }
        if(index=='3'){
            
        }


    }
    render() {
      return (
          <div className='cardlistbox tc mt30'>
                {
                    this.props.data.map((item,index)=>{
                        return(
                            <Card style={{ width: 220,color:"#fff",padding:'10px 0',cursor:'pointer',background:item.bg}} key={index} onClick={this.hindClick.bind(this,index)}>
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

  
  