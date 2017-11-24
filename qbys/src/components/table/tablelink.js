
class TableLink extends React.Component {
    hindClick=()=>{
        if(this.props.type=='1'){
            this.props.hindClick()  
        }
        
    }
    render() {
        return (
            <p onClick={this.hindClick.bind(this)} className={this.props.type=='1'?'theme-color':'placehold-color'}>{this.props.text}</p>
        );
    }
    
}
export default TableLink