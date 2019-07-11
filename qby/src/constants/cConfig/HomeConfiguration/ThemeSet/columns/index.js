import { Form, Button, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
export function getColumns(form, handleDelete, themeList,onSelectChange) {
  const { getFieldDecorator } = form;
  const columns = [
    {
      title: "序号",
      key: "index",
      render: (text, record, index) => {
        return <div>{++index}</div>;
      }
    },
    {
      title: "选择主题",
      dataIndex: "showThemeTitle",
      key: "showThemeTitle",
      width:'200px',
      render: (text, record, index) => {
        return (
          <FormItem>
            {getFieldDecorator(`showThemeId${index}`,{
              initialValue:record.showThemeId,
              onChange:(id)=>{onSelectChange(id,index)}
            })(
              <Select>
                {themeList.map(item => (
                  <Option key={item.themeId} value={item.themeId}>
                    {item.themeId}+{item.title}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        );
      }
    },
    {
      title: "副标题",
      dataIndex: "showSubtitle",
      key: "showSubtitle"
    },
    {
      title: "主题状态",
      dataIndex: "showThemeStatusStr",
      key: "showThemeStatusStr"
    },
    {
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