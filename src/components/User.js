import React from 'react';
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

class User extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			userStories: [],
			isLoadingUserInfo: true,
			isLoadingUserStories: true,
			isError: false,
		};
	}

	componentDidMount() {
		const { id } = queryString.parse(this.props.location.search);

		getUserById(id)
			.then(res => {
				this.setState({ user: res, isLoadingUserInfo: false });

				return getStories(res.submitted);
			})
			.then(res =>
				this.setState({
					userStories: res,
					isLoadingUserStories: false,
					isError: false,
				})
			)
			.catch(() =>
				this.setState({
					user: null,
					isError: true,
					isLoadingUserInfo: false,
					isLoadingUserStories: false,
				})
			);
	}

	render() {
		const { user, userStories, isLoadingUserInfo, isLoadingUserStories, isError } = this.state;
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
	}
}

export default User;
