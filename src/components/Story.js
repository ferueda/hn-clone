import React from 'react';
import queryString from 'query-string';

import { getItemById, getComments } from '../services/api';

import Loading from './Loading';
import StoryMeta from './StoryMeta';
import Comments from './Comments';

class Story extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			story: null,
			isLoading: true,
			isError: false,
			comments: [],
		};
	}

	componentDidMount() {
		const { id } = queryString.parse(this.props.location.search);
		getItemById(id)
			.then(res => {
				this.setState({ isLoading: false, story: res });
				return getComments(res.kids || []);
			})
			.then(res => this.setState({ comments: res }))
			.catch(() => this.setState({ isLoading: true, isError: true }));
	}

	render() {
		const { story, comments, isLoading, isError } = this.state;
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
	}
}

export default Story;
