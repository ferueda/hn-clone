const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const queryStrings = {
	top: 'topstories',
	new: 'newstories',
	best: 'beststories',
};

const cleanData = data => {
	return data.filter(({ deleted, dead }) => !deleted && !dead);
};

const onlyComments = data => {
	return data.filter(({ type }) => type === 'comment');
};

const onlyStories = data => {
	return data.filter(({ type }) => type === 'story');
};
