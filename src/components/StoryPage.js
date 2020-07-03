import React from 'react';
import { getStoriesIds, getStories, getUserById, getItemById, getComments, queryStrings } from '../services/api';

import StoryList from './StoryList';
import Loading from './Loading';

class StoryPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stories: [],
			isLoading: true,
			isError: false,
		};
	}

	componentDidMount() {
		this.fetchStories();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.type !== this.props.type) {
			this.fetchStories();
		}
	}

	fetchStories() {
		this.setState({
			isLoading: true,
			isError: false,
			stories: [],
		});

		getStoriesIds(queryStrings[this.props.type])
			.then(ids => getStories(ids))
			.then(res => {
				this.setState({
					stories: res,
					isLoading: false,
					isError: false,
				});
			})
			.catch(() => {
				this.setState({
					isError: true,
					isLoading: false,
				});
			});
	}

	render() {
		const { stories, isLoading, isError } = this.state;
		return (
			<React.Fragment>
				<StoryList stories={stories} />
				{isLoading && <Loading message="Loading" speed={300} />}
				{isError && <h2 className="text-center">An error ocurred... Please refresh</h2>}
			</React.Fragment>
		);
	}
}

export default StoryPage;
