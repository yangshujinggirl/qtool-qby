import React from 'react';
class Audio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<audio
				id='eww'
				src={this.props.url}
			>
				您的浏览器不支持 audio 标签。
			</audio>
		);
	}
}
export default Audio
