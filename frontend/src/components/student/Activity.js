/** @format */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function Activity() {
	const activities = [
		{
			id: '1',
			text: 'Joined Msit Group',
		},
		{
			id: '2',
			text: 'Submitted Assignment',
		},
		{
			id: '3',
			text: 'Completed 6Th Sem',
		},
		{
			id: '4',
			text: 'New Teacher Assigned',
		},
	];
	return (
		<div className='c-latest-activity'>
			<h4>Latest Activity</h4>
			{activities.map(ac => (
				<div>
					<p>{ac.text}</p>
					<FontAwesomeIcon className='hoverScale' icon={faTimesCircle} />
				</div>
			))}
		</div>
	);
}
