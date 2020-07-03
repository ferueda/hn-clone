import React from 'react';

import StoryItem from './StoryItem';

const StoryList = ({ stories }) => {
	return (
		<div>
			{stories.map(story => (
				<StoryItem key={story.id} {...story} />
			))}
		</div>
	);
};

export default StoryList;
