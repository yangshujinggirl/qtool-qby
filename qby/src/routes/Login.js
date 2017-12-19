import React from 'react';
import WrappedNormalLoginForm from '../constants/login/loginform';
import LoginBanner from '../constants/login/loginbanner';
import '../style/login.css';

function Login() {
  	return (
  		<div className='login_bg'>
		    <div className='login_con'>
		    	<LoginBanner/>
		      	<WrappedNormalLoginForm/>
		    </div>
	    </div>
  	);
}

export default Login;
