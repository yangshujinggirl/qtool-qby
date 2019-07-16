import React, { Component } from "react";
import { Form } from "antd";
import BaseDelTable from "../components/BaseDelTable";

class Tabel extends Component {
  render() {
      console.log('再次进来了')
    const { columns, couponList } = this.props;
    return (
      <div>
        <BaseDelTable
          callback={this.props.handleCallback}
          columns={columns}
          dataSource={couponList}
        />
      </div>
    );
  }
}
const Tabels = Form.create({
  mapPropsToFields(props) {
      console.log(props.couponList)
    return {
      couponIds: Form.createFormField(props.couponList)
    };
  }
})(Tabel);
export default Tabels;
