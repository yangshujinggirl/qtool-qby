import { Card } from 'antd';


const typebg={
    width:"50%",
    background:"#35bab0",
    float:"left",
    height:"32px",
    color:"#fff",
    lineHeight:"32px",
    textAlign:"center",
    cursor:"pointer",
}
const notypebg={
    width:"50%",
    background:"#fff",
    float:"left",
    height:"32px",
    color:"#666",
    lineHeight:"32px",
    textAlign:"center",
    cursor:"pointer",
   
}

class Clisklist extends React.Component {
    state={
        type:"1"
    }
    hindclick1=()=>{
        this.props.listClick1()
    //    this.setState({
    //         type:'1' 
    //     },function(){
    //         this.props.listClick1()
    //     })

    }
    hindclick2=()=>{
        this.props.listClick2()
        // this.setState({
        //     type:'2' 
        // },function(){
        //     this.props.listClick2()
        // })
    }

    render() {
      return (
            <div style={{width:"150px",border:"1px solid #e8e8e8"}} className='clearfix'>
                <div style={this.props.type=='1'?typebg:notypebg} onClick={this.hindclick1.bind(this)}>销售数量</div>
                <div style={this.props.type=='1'?notypebg:typebg} onClick={this.hindclick2.bind(this)}>销售金额</div>
            </div>
        );
    }
  
    
    
  }

  export default Clisklist;

  
  