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

export const getStoriesIds = async queryString => {
	const res = await fetch(`${BASE_URL}/${queryString}.json`);
	const data = await res.json();
	return data;
};

export const getItemById = async id => {
	const res = await fetch(`${BASE_URL}/item/${id}.json`);
	const data = await res.json();
	return data;
};

export const getUserById = async id => {
	const res = await fetch(`${BASE_URL}/user/${id}.json`);
	const data = await res.json();
	return data;
};

export const getStories = async ids => {
	const stories = await Promise.all(ids.slice(0, 50).map(id => getItemById(id)));
	return cleanData(onlyStories(stories));
};

export const getComments = async ids => {
	const comments = await Promise.all(ids.map(id => getItemById(id)));
	return cleanData(onlyComments(comments));
};
