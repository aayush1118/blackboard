/** @format */

import React, { useState } from 'react';
import JoinSubject from './JoinSubject';
import SubjectCard from './SubjectCard';

export default function AllSubjects({ subjects, setReaload }) {
	const [isJoin, setIsJoin] = useState(false);

	return (
		<div className=' c-student-classmates card'>
			<div className='one-line'>
				<h3>Subjects</h3>
				{!isJoin && (
					<button
						className='c-logout-btn hoverScale'
						onClick={() => setIsJoin(true)}>
						Join Subject
					</button>
				)}
			</div>
			<hr />
			<br />
			{isJoin ? (
				<JoinSubject setIsJoin={setIsJoin} setReaload={setReaload} />
			) : (
				<div className=' c-student-classmates__subjects'>
					{subjects.map(_sub => (
						<SubjectCard data={_sub} />
					))}
				</div>
			)}
		</div>
	);
}
