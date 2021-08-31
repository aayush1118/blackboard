/** @format */

import React from 'react';
import Card from '../student/Card';

export default function Profile(props) {
	return (
		<div className='c-student-profile'>
			<Card {...props} />
		</div>
	);
}
