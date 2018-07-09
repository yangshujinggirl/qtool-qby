import dva from 'dva';
import 'antd/dist/antd.less';
import './index.css';

import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
// 1. Initialize
const app = dva({
    history: useRouterHistory(createHashHistory)({ queryKey: false }),
  });






app.model(require("./models/account"));






app.model(require("./models/downlaod"));






app.model(require("./models/dataposorder"));






app.model(require("./models/datasporder"));






app.model(require("./models/datas"));






app.model(require("./models/dataclassdes"));






app.model(require("./models/datagodes"));






app.model(require("./models/dataspfen"));






app.model(require("./models/datasphiscun"));






app.model(require("./models/dataspcun"));






app.model(require("./models/dataspsell"));






app.model(require("./models/stock"));

app.model(require("./models/specs"));

app.model(require("./models/brand"));

app.model(require("./models/fenlei"));

app.model(require("./models/warehouse"));

app.model(require("./models/feedback"));

app.model(require("./models/datacg"));

app.model(require("./models/datawstime"));

app.model(require("./models/datawshis"));

app.model(require("./models/datawson"));

app.model(require("./models/dataws"));

app.model(require("./models/operatesp"));

app.model(require("./models/goodtime"));

app.model(require("./models/operatecz"));

app.model(require("./models/recheck"));

app.model(require("./models/adjust"));

app.model(require("./models/jedit"));

app.model(require("./models/postcheck"));

app.model(require("./models/goods"));

app.model(require("./models/orderdb"));

app.model(require("./models/orderct"));

app.model(require("./models/orderth"));

app.model(require("./models/orderpos"));

app.model(require("./models/ordercg"));

app.model(require("./models/ordermd"));
app.model(require("./models/IndexPage"));
app.model(require("./models/tab"));

app.model(require("./models/users"));



app.model(require("./models/operatemember"));

app.model(require("./models/operateinout"));

app.model(require("./models/operatesupplier"));

app.model(require("./models/operatebanner"));

app.model(require("./models/h5config"));

app.model(require("./models/dataposManage"));

app.model(require("./models/onlinegood"));
app.model(require("./models/userorder"));//用户订单

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
