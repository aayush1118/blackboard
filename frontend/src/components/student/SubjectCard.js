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
				<img src='https://freeiconshop.com/wp-content/uploads/edd/book-flat.png' />
			</div>
			{/* <div className='c-subject-card__btn'>Join Class</div> */}
		</div>
	);
}
