import React, { useReducer, useEffect } from 'react';
import queryString from 'query-string';

import { getUserById, getStories } from '../services/api';

import Loading from './Loading';
import StoryList from './StoryList';

const UserInfo = ({ id, created, karma, about }) => {
	return (
		<div>
			<h2>
				{id} <span className="light-text">({karma.toLocaleString()})</span>
			</h2>
			<div className="story-meta">joined {new Date(created * 1000).toLocaleString()}</div>
			<p dangerouslySetInnerHTML={{ __html: about }} />
		</div>
	);
};

const userReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				...state,
				user: action.payload,
				isLoadingUserInfo: false,
			};
		default:
			return { ...state };
	}
};

const userStoriesReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				...state,
				userStories: [...action.payload],
				isLoadingUserStories: false,
				isError: false,
			};
		case 'FETCH_ERROR':
			return {
				...state,
				isError: true,
				isLoadingUserInfo: false,
				isLoadingUserStories: false,
			};
		default:
			return { ...state };
	}
};

const User = ({ location }) => {
	const [{ user, isLoadingUserInfo }, dispatchUser] = useReducer(userReducer, {
		user: null,
		isLoadingUserInfo: true,
	});

	const [{ userStories, isLoadingUserStories, isError }, dispatchStories] = useReducer(userStoriesReducer, {
		userStories: [],
		isLoadingUserStories: true,
		isError: false,
	});

	useEffect(() => {
		const { id } = queryString.parse(location.search);

		getUserById(id)
			.then(user => {
				dispatchUser({ type: 'FETCH_SUCCESS', payload: user });
				return getStories(user.submitted);
			})
			.then(stories => dispatchStories({ type: 'FETCH_SUCCESS', payload: stories }))
			.catch(() => dispatchStories({ type: 'FETCH_ERROR' }));
	}, [location]);

	return (
		<React.Fragment>
			{isLoadingUserInfo ? (
				<Loading message="Loading" speed={300} />
			) : (
				<React.Fragment>
					<UserInfo {...user} />
					<section>
						<h2>Stories</h2>
						{isLoadingUserStories && <Loading message={`Loading user stories`} speed={300} />}
						<StoryList stories={userStories} />
					</section>
				</React.Fragment>
			)}
			{isError && <h2 className="text-center">An error ocurred</h2>}
		</React.Fragment>
	);
};

export default User;
