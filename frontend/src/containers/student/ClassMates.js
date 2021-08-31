/** @format */

import React, { useEffect, useState } from 'react';
import { withStudentLayout } from '../../components/StudentLayout';
import LongCard from '../../components/student/LongCard';
import '../../styles/_student-dashboard.scss';
import { callHttp } from '../../utility/callHttp';
import { toast } from 'react-toastify';

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
	const auth = JSON.parse(localStorage.getItem('auth'));
	const [reaload, setReaload] = useState(false);
	const [students, setStudents] = useState([]);
	const [teachers, setTeachers] = useState([]);

	const getAllSubjects = () => {
		callHttp({
			url: `/subject/${auth.id}`,
			method: 'GET',
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					const tea = res.data.data.map(s => s.teacher);
					const stu = res.data.data.map(s => s);
					setTeachers(tea);
					setStudents(stu);
					console.log(tea);
					console.log(stu);
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
	}, []);
	return (
		<div className=' c-student-classmates card'>
			<h3>Teacher</h3>
			<hr />
			{teachers.map(_teacher => (
				<LongCard name={_teacher} />
			))}
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
