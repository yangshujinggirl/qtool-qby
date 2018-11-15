import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
var _ = require('lodash');
import { LocaleProvider, DatePicker, message } from 'antd';

 import zhCN from 'antd/lib/locale-provider/zh_CN';

function RouterConfig({ history }) {
  	return (
		<LocaleProvider locale={zhCN}>
		<Router history={history}>
			<Route path="/" component={Login}/>
			<Route path="/home" component={IndexPage}/>
		</Router>
		 </LocaleProvider>
  	);
}

export default RouterConfig;
