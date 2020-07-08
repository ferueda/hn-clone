import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

import ThemeContext from '../context/ThemeContext';

const activeStyle = {
	color: 'var(--main-red)',
};

const Nav = ({ toggleTheme }) => {
	const theme = useContext(ThemeContext);

	return (
		<nav className="nav-container flex space-between">
			<ul className="flex">
				<li className="nav-item">
					<NavLink to="/" exact activeStyle={activeStyle}>
						Top
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/best" exact activeStyle={activeStyle}>
						Best
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/new" exact activeStyle={activeStyle}>
						New
					</NavLink>
				</li>
			</ul>
			<button className="btn-clear" onClick={toggleTheme}>
				{theme === 'light' ? <FaMoon color="#34495e" size={25} /> : <FaSun color="#e67e22" size={25} />}
			</button>
		</nav>
	);
};

export default Nav;
