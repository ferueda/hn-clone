import React, { useEffect, useState } from 'react';

const Loading = ({ text = 'Loading', speed = 300 }) => {
	const [message, setMessage] = useState(text);

	useEffect(() => {
		const interval = window.setInterval(() => {
			setMessage(message => (message === `${text}...` ? text : `${message}.`));
		}, speed);

		return () => window.clearInterval(interval);
	}, [text, speed]);
	return <h2 className="text-center">{message}</h2>;
};

export default Loading;
