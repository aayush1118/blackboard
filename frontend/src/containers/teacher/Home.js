/** @format */

import React from 'react';
import { withTeacherLayout } from '../../components/TeacherLayout';
// import SDashboard from '../../components/student/Dashboard';
import Profile from '../../components/teacher/Profile';
import '../../styles/_student-dashboard.scss';
import Subjects from './Subjects';

function Dashboard(props) {
	return (
		<div className='c-student-home'>
			<Subjects {...props} />
			<Profile {...props} />
		</div>
	);
}

export default withTeacherLayout(Dashboard);
