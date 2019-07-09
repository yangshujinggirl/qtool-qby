import { Tabs } from "antd";
import AllthIndex from "./allth/index";
import ToAuditThIndex from "./toAuditTh/index";
const TabPane = Tabs.TabPane;

class Userth extends React.Component {
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    const { rolelists } = this.props.data;
    return (
      <div className="content_box stock-tabs">
        <Tabs defaultActiveKey="1">
          {rolelists.map((item, index) => (
            <TabPane tab={item.name} key={index + 1}>
              {item.urResourceId == 208100 && (
                <AllthIndex
                  rolelists={item.children}
                  componkey={this.props.componkey}
                />
              )}
              {item.urResourceId == 208200 && (
                <ToAuditThIndex
                  rolelists={item.children}
                  componkey={this.props.componkey}
                />
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Userth;
