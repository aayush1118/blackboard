/** @format */

import React from 'react';
import SubjectCard from '../../components/student/SubjectCard';
import { withStudentLayout } from '../../components/StudentLayout';

const Classroom = () => {
	const subjects = [
		{ name: 'Data Structures', teacher: 'Ankita Sharma' },
		{ name: 'Web Designing', teacher: 'Ankita Sharma' },
	];
	return (
		<div className=' c-student-classmates card'>
			<h3>Subjects</h3>
			<hr />
			<br />
			<div className=' c-student-classmates__subjects'>
				{subjects.map(_sub => (
					<SubjectCard data={_sub} />
				))}
			</div>
		</div>
	);
};
export default withStudentLayout(Classroom);
