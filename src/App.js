import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav';
import StoryPage from './components/StoryPage';
import User from './components/User';
import Story from './components/Story';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: 'light',
			toggleTheme: () => {
				this.setState(({ theme }) => ({
					theme: theme === 'light' ? 'dark' : 'light',
				}));
			},
		};
	}

	render() {
		const { theme, toggleTheme } = this.state;
		return (
			<Router>
				<main className={`container`}>
					<Nav theme={theme} toggleTheme={toggleTheme} />

					<Switch>
						<Route exact path="/" render={() => <StoryPage type="top" />} />
						<Route exact path="/best" render={() => <StoryPage type="best" />} />
						<Route exact path="/new" render={() => <StoryPage type="new" />} />

						<Route path="/user" component={User} />
						<Route path="/story" component={Story} />

						<Route render={() => <h2 className="text-center">Page not found</h2>} />
					</Switch>
				</main>
			</Router>
		);
	}
}

export default App;
