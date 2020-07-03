import React from 'react';
import { Link } from 'react-router-dom';

const StoryMeta = ({ id, by, time, kids }) => {
	const date = new Date(time * 1000);
	return (
		<div className="story-meta">
			by{' '}
			<Link className="secondary-link" to={`user?id=${by}`}>
				{by}
			</Link>{' '}
			on {date.toLocaleString()} with{' '}
			<Link className="secondary-link" to={`story?id=${id}`}>
				{kids ? kids.length : 0}
			</Link>{' '}
			comments
		</div>
	);
};

export default StoryMeta;
