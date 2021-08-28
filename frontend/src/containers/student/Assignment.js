/** @format */

import React from 'react';
import { withStudentLayout } from '../../components/StudentLayout';
import LongCard from '../../components/student/LongCard';

const Assignments = () => {
	const pendingAssignments = [
		{ name: 'Data Structures 3', dueDate: '14 March' },
		{ name: 'Web Designing 3 & 4', dueDate: '15 March' },
	];
	const submittedAssignments = [
		{ name: 'Data Structures 1 & 2', dueDate: '14 March' },
		{ name: 'Web Designing 1 & 2', dueDate: '15 March' },
		{ name: 'Advance Mathematics 1', dueDate: '15 March' },
	];
	return (
		<div className='c-student-assignments card'>
			<h3>Pending Assignments</h3>
			<hr />
			<br />
			{pendingAssignments.map(_as => (
				<LongCard name={_as.name} dueDate={_as.dueDate} type='assignment' />
			))}
			<br />
			<h3>Submitted Assignments</h3>
			<hr />
			<br />

			{submittedAssignments.map(_as => (
				<LongCard
					name={_as.name}
					dueDate={_as.dueDate}
					type='assignment'
					done
				/>
			))}
			<br />
		</div>
	);
};
export default withStudentLayout(Assignments);
