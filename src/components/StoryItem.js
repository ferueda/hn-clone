import React from 'react';

import StoryMeta from './StoryMeta';

const StoryItem = ({ id, title, by, url, time, kids }) => {
	return (
		<ul>
			<li>
				<a className="main-link" href={url}>
					{title}
				</a>
				<StoryMeta id={id} by={by} time={time} kids={kids} />
			</li>
		</ul>
	);
};

export default StoryItem;
