import React from 'react';
import { connect } from 'dva';
import WrappedNormalLoginForm from '../constants/login/loginform';

function Login() {
  return (
    <div>
      <WrappedNormalLoginForm/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
