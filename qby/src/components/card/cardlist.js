import { Card } from 'antd';

class Cardlist extends React.Component {
    hindClick=(index)=>{
        if(index=='0'){
            this.props.hindent(1)
        }
        if(index=='1'){
            this.props.hindent(2)
        }
        if(index=='2'){
            this.props.hindent(3)
        }
        if(index=='3'){
            this.props.hindent(4)  
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

  
  