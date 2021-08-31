/** @format */

import React, { useEffect, useState } from 'react';
import AllSubjects from './AllSubjects';
import AttendanceCard from './AttendenceCard';
import { callHttp } from '../../utility/callHttp';
import { ToastContainer, toast } from 'react-toastify';
import JoinSubject from './JoinSubject';

export default function Dashboard() {
	const auth = JSON.parse(localStorage.getItem('auth'));
	const [subjects, setSubjects] = useState([]);
	const [reaload, setReaload] = useState(false);
	const getAllSubjects = () => {
		callHttp({
			url: `/subject/${auth.id}`,
			method: 'GET',
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					// toast.success('Updated Successfully!');
					setSubjects(res.data.data);
					// history.push(`/${role}`);
				} else {
					toast.error('Something went wrong!');
				}
			})
			.catch(err => {
				toast.error('Something went wrong!');
			});
	};

	useEffect(() => {
		getAllSubjects();
	}, [reaload]);

	return (
		<div className='c-student-dashboard '>
			{/* <AttendanceCard /> */}
			<AllSubjects subjects={subjects} setReaload={setReaload} />
		</div>
	);
}
