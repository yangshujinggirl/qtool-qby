import dva from 'dva';
import './index.css';
import 'antd/dist/antd.less';

import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
// 1. Initialize
const app = dva({
    history: useRouterHistory(createHashHistory)({ queryKey: false }),
  });

app.model(require("./models/account"));

app.model(require("./models/recheck"));

app.model(require("./models/wscheck"));

app.model(require("./models/adjust"));

app.model(require("./models/jedit"));

app.model(require("./models/wsedit"));

app.model(require("./models/wspost"));

app.model(require("./models/wsmove"));

app.model(require("./models/postcheck"));

app.model(require("./models/goods"));


app.model(require("./models/orderdb"));

app.model(require("./models/orderct"));

app.model(require("./models/orderth"));

app.model(require("./models/orderpos"));

app.model(require("./models/ordercg"));

app.model(require("./models/ordermd"));

app.model(require("./models/warehouse"));

app.model(require("./models/storageDetail"));

app.model(require("./models/IndexPage"));

app.model(require("./models/tab"));

app.model(require("./models/users"));

app.model(require("./models/operatemember"));

app.model(require("./models/operateinout"));

app.model(require("./models/operatesupplier"));
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

