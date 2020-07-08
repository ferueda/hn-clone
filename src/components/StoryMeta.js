import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import ThemeContext from '../context/ThemeContext';

const StoryMeta = ({ id, by, time, kids }) => {
	const theme = useContext(ThemeContext);
	const date = new Date(time * 1000);
	return (
		<div className="story-meta">
			by{' '}
			<Link className={theme === 'light' ? 'secondary-link' : 'dark-theme-text'} to={`user?id=${by}`}>
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
