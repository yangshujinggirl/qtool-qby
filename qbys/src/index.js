import dva from 'dva';
import './index.css';
import 'antd/dist/antd.less';
// 1. Initialize
const app = dva();



app.model(require("./models/account"));

app.model(require("./models/wsPositionManage"));

app.model(require("./models/houseAreaManage"));

app.model(require("./models/warehouse"));

app.model(require("./models/storageDetail"));

app.model(require("./models/storageManage"));

app.model(require("./models/IndexPage"));

app.model(require("./models/tab"));

app.model(require("./models/users"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
