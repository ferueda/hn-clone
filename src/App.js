import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import ThemeContext from './context/ThemeContext';

import Nav from './components/Nav';
import StoryPage from './components/StoryPage';
import User from './components/User';
import Story from './components/Story';

const App = () => {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => setTheme(theme => (theme === 'light' ? 'dark' : 'light'));

	return (
		<Router>
			<ThemeContext.Provider value={theme}>
				<main className={theme}>
					<div className="container">
						<Nav toggleTheme={toggleTheme} />

						<Switch>
							<Route exact path="/" render={() => <StoryPage type="top" />} />
							<Route exact path="/best" render={() => <StoryPage type="best" />} />
							<Route exact path="/new" render={() => <StoryPage type="new" />} />

							<Route path="/user" component={User} />
							<Route path="/story" component={Story} />

							<Route render={() => <h2 className="text-center">Page not found</h2>} />
						</Switch>
					</div>
				</main>
			</ThemeContext.Provider>
		</Router>
	);
};

export default App;
