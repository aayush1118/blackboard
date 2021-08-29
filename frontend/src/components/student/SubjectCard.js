/** @format */

import React from 'react';

export default function SubjectCard(props) {
	const {
		data: { name, teacher },
	} = props;
	// const {  } = props;
	return (
		<div className='c-subject-card'>
			<div className=' c-subject-card__topbar'>
				<h3>{name}</h3>
				<p>{teacher}</p>
			</div>
			<div className=' c-subject-card__img-wrapper'>
				<img src='https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' />
			</div>
			<div className='c-subject-card__btn'>Join Class</div>
		</div>
	);
}
