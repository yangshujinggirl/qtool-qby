import { Table } from 'antd';
import TableLink from './tablelink';

class EditableTable extends React.Component {
    render() {
        return (
            <Table bordered dataSource={this.props.dataSource} columns={this.props.columns} />
        );
    }
}

export default EditableTable


