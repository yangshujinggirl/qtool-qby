import { Table } from 'antd';
import { columnsCreat } from '../../columns';
import './index.less';

const BlTable=({...props})=> {
  let  blColumns = columnsCreat(props.form,props.validator);
  return <Table
          className="bl-table-wrap"
          bordered
          pagination={false}
          columns={blColumns}
          dataSource={props.dataSource}/>
}

export default BlTable;
