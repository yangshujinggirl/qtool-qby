import React from 'react';
import { connect } from 'dva';
import Frame from '../constants/frame/frame';

function IndexPage() {
  	return (
    	<div>
      		<Frame/>
    	</div>
  	);
}
export default connect()(IndexPage);
