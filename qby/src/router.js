import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';

function RouterConfig({ history }) {
  	return (
		<Router history={history}>
			<Route path="/" component={Login}/>
			<Route path="/home" component={IndexPage}/>
		</Router>
  	);
}

export default RouterConfig;
