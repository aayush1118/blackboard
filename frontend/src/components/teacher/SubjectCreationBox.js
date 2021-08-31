/** @format */

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { callHttp } from '../../utility/callHttp';

export default function SubjectCreationBox({ setViewScreen, resData }) {
	const joinSubject = _code => {
		callHttp({
			url: `/subject/join/${_code}`,
			method: 'GET',
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
				} else {
					toast.error('Something went wrong!');
				}
			})
			.catch(err => {
				toast.error('Something went wrong!');
			});
	};
	useEffect(() => {
		if (resData?.code) joinSubject(resData?.code);
	}, [resData?.code]);
	return (
		<div className='c-subject-box c-student-settings__menu '>
			<div className='c-student-settings__bars '>
				<div>Name</div>:<div>{resData?.code}</div>
			</div>
			<div className='c-student-settings__bars '>
				<div>Subject Code</div>:<div>{resData?.name}</div>
			</div>

			<div className=''>
				<button
					className='c-logout-btn hoverScale'
					onClick={() => setViewScreen('subjects')}>
					Ok
				</button>
			</div>
		</div>
	);
}
