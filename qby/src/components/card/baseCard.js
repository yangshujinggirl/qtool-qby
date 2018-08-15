import { Card } from 'antd';

class Cards extends React.Component {
    constructor(props){
      super(props)
    }
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
