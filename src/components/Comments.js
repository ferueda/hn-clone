import React from 'react';
import { Link } from 'react-router-dom';

const Comments = ({ comments }) => {
	console.log(comments);
	return (
		<React.Fragment>
			{comments.map(({ id, by, time, text }) => {
				return (
					<article key={id} className="comment">
						<div className="story-meta">
							by{' '}
							<Link className="secondary-link" to={`user?id=${by}`}>
								{' '}
								{by}
							</Link>{' '}
							on {new Date(time * 1000).toLocaleString()}
						</div>
						<p dangerouslySetInnerHTML={{ __html: text }} />
					</article>
				);
			})}
		</React.Fragment>
	);
};

export default Comments;
