import { Select, Form, Button } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
export function getColumns(form, couponList,onSelectChange,handleDelete) {
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
      width:'30%',
      render: (text, record, index) => {
        return (
          <FormItem>
            {getFieldDecorator(`couponIds[${index}]`, {
              initialValue:record.couponId ? record.couponId : undefined,
              onChange:(couponId)=>onSelectChange(couponId,index)
            })(
              <Select placeholder="请选择你要发放的优惠券">
                {couponList && couponList.map(item => (
                  <Option
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
      dataIndex: "couponFullAmount",
      render:(text,record,index)=>{
        return <p>
          {
            text ? <span>￥{text}</span> : ''
          }
        </p>
      }
    },
    {
      title: "优惠金额",
      dataIndex: "couponMoney",
      render:(text,record,index)=>{
        return <p>
          {
            text ? <span>￥{text}</span> : ''
          }
        </p>
      }
    },
    {
      title: "已发放数量",
      dataIndex: "couponGiveCount"
    },{
      title: "操作",
      dataIndex: "delete",
      key: "delete",
      render: (text, record, index) => {
        return (
          <Button
            onClick={() => handleDelete(record.key)}
          >
            删除
          </Button>
        );
      }
    }
  ];
  return columns;
}
