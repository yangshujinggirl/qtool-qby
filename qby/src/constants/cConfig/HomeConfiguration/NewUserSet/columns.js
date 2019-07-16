import { Select, Form } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
export function getColumns(form, couponList,onSelectChange) {
  const { getFieldDecorator } = form;
  const columns = [
    {
      title: "序号",
      render: (text, record, index) => {
        index++;
        return <span>{index}</span>;
      }
    },
    {
      title: "选择优惠券",
      dataIndex: "couponId",
      render: (text, record, index) => {
        return (
          <FormItem>
            {getFieldDecorator(`couponIds[${index}]`, {
              initialValue:record.couponId,
              onChange:(couponId)=>onSelectChange(couponId,index)
            })(
              <Select>
                {couponList && couponList.map(item => (
                  <Option
                    placeholder="请选择你要发放的优惠券"
                    key={item.couponId}
                    value={item.couponId}
                  >
                    {item.couponName}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        );
      }
    },
    {
      title: "使用门槛",
      dataIndex: "couponFullAmount"
    },
    {
      title: "优惠金额",
      dataIndex: "couponMoney"
    },
    {
      title: "已发放数量",
      dataIndex: "couponGiveCount"
    }
  ];
  return columns;
}
