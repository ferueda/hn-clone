import React, { useReducer, useEffect } from 'react';

// import { getStoriesIds, getStories, queryStrings } from '../services/api';
import { getStories } from '../services/swrApi';

import useStoriesId from '../hooks/useStoriesId';

import StoryList from './StoryList';
import Loading from './Loading';

const storyPageReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_INIT':
			return {
				...state,
				stories: [],
				isLoading: true,
				isError: false,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				stories: [...action.payload],
				isLoading: false,
				isError: false,
			};
		case 'FETCH_ERROR':
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			return { ...state };
	}
};

const StoryPage = ({ type }) => {
	const { ids } = useStoriesId(type);

	const [{ stories, isLoading, isError }, dispatch] = useReducer(storyPageReducer, {
		stories: [],
		isLoading: true,
		isError: false,
	});

	useEffect(() => {
		dispatch({ type: 'FETCH_INIT' });

		getStories(ids || [])
			.then(stories => dispatch({ type: 'FETCH_SUCCESS', payload: stories }))
			.catch(() => dispatch({ type: 'FETCH_ERROR' }));
	}, [ids]);

	return (
		<React.Fragment>
			<StoryList stories={stories} />
			{isLoading && <Loading message="Loading" speed={300} />}
			{isError && <h2 className="text-center">An error ocurred... Please refresh</h2>}
		</React.Fragment>
	);
};

export default StoryPage;
