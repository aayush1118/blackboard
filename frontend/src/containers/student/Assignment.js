/** @format */

import React from 'react';
import { withStudentLayout } from '../../components/StudentLayout';
import LongCard from '../../components/student/LongCard';

const Assignments = () => {
	const pendingAssignments = [
		// { name: 'Data Structures 3', dueDate: '14 March' },
		// { name: 'Web Designing 3 & 4', dueDate: '15 March' },
	];
	const submittedAssignments = [
		// { name: 'Data Structures 1 & 2', dueDate: '14 March' },
		// { name: 'Web Designing 1 & 2', dueDate: '15 March' },
		// { name: 'Advance Mathematics 1', dueDate: '15 March' },
	];
	return (
		<div className='c-student-assignments card'>
			<h3>Pending Assignments</h3>
			<hr />
			<br />
			{pendingAssignments.length > 0 ? (
				pendingAssignments.map(_as => (
					<LongCard name={_as.name} dueDate={_as.dueDate} type='assignment' />
				))
			) : (
				<div>No pending assignments</div>
			)}
			<br />
			<h3>Submitted Assignments</h3>
			<hr />
			<br />

			{submittedAssignments.length > 0 ? (
				submittedAssignments.map(_as => (
					<LongCard
						name={_as.name}
						dueDate={_as.dueDate}
						type='assignment'
						done
					/>
				))
			) : (
				<div>No submitted assignments</div>
			)}

			<br />
		</div>
	);
};
export default withStudentLayout(Assignments);
