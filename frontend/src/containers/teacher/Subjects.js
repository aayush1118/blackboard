/** @format */

import React, { useState } from 'react';
import SubjectCard from '../../components/student/SubjectCard';
import SubjectForm from '../../components/teacher/SubjectForm';
import { withTeacherLayout } from '../../components/TeacherLayout';

const Classroom = () => {
	const subjects = [
		{ name: 'Data Structures', teacher: 'Ankita Sharma' },
		{ name: 'Web Designing', teacher: 'Ankita Sharma' },
	];

	const [isCreate, setIsCreate] = useState(false);
	return (
		<div className='c-student-settings c-student-classmates card'>
			<div className='c-student-settings__header'>
				<h3>Subjects</h3>
				{!isCreate && (
					<button
						className='c-logout-btn hoverScale'
						onClick={() => setIsCreate(true)}>
						Create Subject
					</button>
				)}
			</div>

			<hr />
			<br />
			{!isCreate ? (
				<div className=' c-student-classmates__subjects'>
					{subjects.map(_sub => (
						<SubjectCard data={_sub} />
					))}
				</div>
			) : (
				<SubjectForm />
			)}
		</div>
	);
};
export default withTeacherLayout(Classroom);
