import { Card } from 'antd';


const typebg={
    width:"50%",
    background:"#35bab0"
}
const notypebg={
    width:"50%",
    background:"#fff"
}

class Cardlist extends React.Component {
    style={
        type:"1"
    }
    hindclick1=()=>{
       this.setState({
            type:'1' 
       })

    }
    hindclick2=()=>{
        this.setState({
            type:'2' 
       })
    }

    render() {
      return (
          <div style={{width:"100px"}}>
                <div style={this.state.type=='1'?'typebg':'notypebg'} onClick={this.hindclick1.bind(this)}>销售数量</div>
                <div style={this.state.type=='1'?'notypebg':'typebg'} onClick={this.hindclick2.bind(this)}>销售金额</div>
          </div>
      );
    }
  
    
    
  }

  export default Cardlist;

  
  