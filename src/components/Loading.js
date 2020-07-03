import React from 'react';

class Loading extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: props.message,
		};
	}

	componentDidMount() {
		const { message, speed } = this.props;

		this.interval = window.setInterval(() => {
			if (this.state.message === message + '...') {
				this.setState({
					message: message,
				});
			} else {
				this.setState({
					message: this.state.message + '.',
				});
			}
		}, speed);
	}

	componentWillUnmount() {
		window.clearInterval(this.interval);
	}

	render() {
		const { message } = this.state;
		return <h2 className="text-center">{message}</h2>;
	}
}

export default Loading;
