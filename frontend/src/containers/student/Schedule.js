/** @format */

import React from 'react';
import { withStudentLayout } from '../../components/StudentLayout';
import Calendar from '../../components/student/Calendar';
import '../../styles/_student-dashboard.scss';

function Schedule(props) {
	return (
		<div className='c-student-schedule card'>
			<Calendar {...props} />
		</div>
	);
}

export default withStudentLayout(Schedule);
