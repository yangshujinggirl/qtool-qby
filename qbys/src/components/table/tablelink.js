
class TableLink extends React.Component {
    hindClick=()=>{
        this.props.hindClick()
    }
    render() {
        return (
            <p onClick={this.hindClick.bind(this)} className='theme-color'>{this.props.text}</p>
        );
    }
    
}
export default TableLink