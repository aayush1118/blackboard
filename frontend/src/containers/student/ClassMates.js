/** @format */

import React from 'react';
import { withStudentLayout } from '../../components/StudentLayout';
import LongCard from '../../components/student/LongCard';
import '../../styles/_student-dashboard.scss';

function ClassMates(props) {
	const classmates = [
		{ name: 'Ayush Jain' },
		{ name: 'Abhinav Singh' },
		{ name: 'Ayush Jain' },
		{ name: 'Ayush Jain' },
		{ name: 'Ayush Jain' },
		{ name: 'Ayush Jain' },
		{ name: 'Ayush Jain' },
	];
	return (
		<div className=' c-student-classmates card'>
			<h3>Teacher</h3>
			<hr />
			<LongCard name='Anupma Rathor' />
			<br />
			<h3>Classmates</h3>
			<hr />
			{classmates.map(_student => (
				<LongCard name={_student.name} />
			))}
		</div>
	);
}
export default withStudentLayout(ClassMates);
