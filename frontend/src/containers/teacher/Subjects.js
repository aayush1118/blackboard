/** @format */

import React, { useEffect, useState } from 'react';
import SubjectCard from '../../components/student/SubjectCard';
import SubjectCreationBox from '../../components/teacher/SubjectCreationBox';
import SubjectForm from '../../components/teacher/SubjectForm';
import { withTeacherLayout } from '../../components/TeacherLayout';
import { callHttp } from '../../utility/callHttp';
import { ToastContainer, toast } from 'react-toastify';

const Classroom = () => {
	const [subjects, setSubjects] = useState([]);

	const [viewScreen, setViewScreen] = useState('subjects');
	const [resData, setResData] = useState({});
	const auth = JSON.parse(localStorage.getItem('auth'));

	useEffect(() => {
		if (viewScreen == 'subjects') {
			callHttp({
				url: `/subject/${auth.id}`,
				method: 'GET',
			})
				.then(res => {
					if (res.status == 200 && res.data.success) {
						setSubjects(res.data.data);
						// toast.success('Subject Created Successfully!');
						// localStorage.setItem('auth', JSON.stringify(res.data.data));
						// history.push(`/${role}`);
					} else {
						toast.error('Something went wrong!');
					}
				})
				.catch(err => {
					toast.error('Something went wrong!');
				});
		}
	}, [viewScreen]);

	return (
		<div className='c-student-settings c-student-classmates card'>
			<div className='c-student-settings__header'>
				<h3>Subjects</h3>
				{viewScreen == 'subjects' && (
					<button
						className='c-logout-btn hoverScale'
						onClick={() => setViewScreen('form')}>
						Create Subject
					</button>
				)}
			</div>

			<hr />
			<br />
			{viewScreen == 'subjects' ? (
				<div className=' c-student-classmates__subjects'>
					{subjects.map(_sub => (
						<SubjectCard data={_sub} />
					))}
				</div>
			) : viewScreen == 'form' ? (
				<SubjectForm setViewScreen={setViewScreen} setResData={setResData} />
			) : (
				<SubjectCreationBox setViewScreen={setViewScreen} resData={resData} />
			)}
		</div>
	);
};
// export default withTeacherLayout(Classroom);
export default Classroom;
