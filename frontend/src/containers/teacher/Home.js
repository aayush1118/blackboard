/** @format */

import React from 'react';
import { withTeacherLayout } from '../../components/TeacherLayout';
import SDashboard from '../../components/student/Dashboard';
import Profile from '../../components/student/Profile';
import '../../styles/_student-dashboard.scss';

function Dashboard(props) {
	return (
		<div className='c-student-home'>
			<SDashboard {...props} />
			<Profile {...props} />
		</div>
	);
}

export default withTeacherLayout(Dashboard);
