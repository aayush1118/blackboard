/** @format */

import React from 'react';
import moment from 'moment';
export default function SubjectCard(props) {
	const {
		data: { name, teacher, timings, code },
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
			<div className='c-subject-card__footer'>
				{timings && (
					<div>
						{moment(timings[0]?.start).format('HH:MM A')} -
						{moment(timings[0].end).format('HH:MM A')}
					</div>
				)}
				<div>Code: {code}</div>
			</div>

			{/* <div className='c-subject-card__btn'>Join Class</div> */}
			{/* <div className='c-subject-card__btn'>Join Class</div> */}
		</div>
	);
}
