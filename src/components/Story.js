import React, { useEffect, useReducer, useState } from 'react';
import queryString from 'query-string';

import { getItemById, getComments } from '../services/api';

import Loading from './Loading';
import StoryMeta from './StoryMeta';
import Comments from './Comments';

const storyReducer = (state, action) => {
	switch (action.type) {
		case 'SUCCESS':
			return {
				...state,
				comments: [...action.payload],
				isLoading: false,
				isError: false,
			};
		case 'ERROR':
			return {
				...state,
				isError: true,
				isLoading: false,
			};
		default:
			return { ...state };
	}
};

const Story = ({ location }) => {
	const [story, setStory] = useState(null);

	const [{ comments, isLoading, isError }, dispatch] = useReducer(storyReducer, {
		isLoading: true,
		isError: false,
		comments: [],
	});

	const { id } = queryString.parse(location.search);

	useEffect(() => {
		getItemById(id)
			.then(data => {
				setStory(data);
				return getComments(data.kids || []);
			})
			.then(data => dispatch({ type: 'SUCCESS', payload: data }))
			.catch(() => dispatch({ type: 'ERROR' }));
	}, [id]);

	return (
		<React.Fragment>
			{isLoading ? (
				<Loading message="Loading" speed={300} />
			) : (
				<React.Fragment>
					<h2>
						<a className="main-link" href={story.url}>
							{story.title}
						</a>
					</h2>
					<StoryMeta id={story.id} by={story.by} time={story.time} kids={story.kids} />
					<Comments comments={comments} />
				</React.Fragment>
			)}
			{isError && <h2 className="text-center">An error ocurred</h2>}
		</React.Fragment>
	);
};

export default Story;
