/** @format */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faUsers,
	faClock,
	faBook,
	faFileAlt,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
// import { faUsersClass } from '@fortawesome/fontawesome-common-types';

export default function Sidebar(props) {
	const { history } = props;
	const options = [
		{
			icon: faHome,
			name: 'Home',
			route: '/',
		},
		// {
		// 	icon: faUsers,
		// 	name: 'Subjects',
		// 	route: '/subjects',
		// },
		// {
		// 	icon: faClock,
		// 	name: 'Schedule',
		// 	route: '/schedule',
		// },
		// {
		// 	icon: faBook,
		// 	name: 'Assignments',
		// 	route: '/assignments',
		// },
		// {
		// 	icon: faFileAlt,
		// 	name: 'Test',
		// 	route: '/test',
		// },
		// {
		// 	icon: faUsers,
		// 	name: 'Classmates',
		// 	route: '/classmates',
		// },
		// {
		// 	icon: faUser,
		// 	name: 'Settings',
		// 	route: '/settings',
		// },
	];

	const handleClick = route => () => history.push(`/teacher${route}`);
	return (
		<div className='c-student-sidebar'>
			{options.map(option => (
				<div
					onClick={handleClick(option.route)}
					className='c-student-sidebar__option'>
					<FontAwesomeIcon icon={option.icon} />
					<div>{option.name}</div>
				</div>
			))}
		</div>
	);
}
