/** @format */

import React from 'react';
import Card from './Card';
import Activity from './Activity';

export default function Profile(props) {
	return (
		<div className='c-student-profile'>
			<Card {...props} />
			<Activity {...props} />
		</div>
	);
}
