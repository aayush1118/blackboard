/** @format */

import React, { useState } from 'react';
import { callHttp } from '../../utility/callHttp';
import { ToastContainer, toast } from 'react-toastify';

export default function JoinSubject({ setIsJoin, setReaload }) {
	const [code, setCode] = useState('');

	const handleJoin = event => {
		event.preventDefault();
		callHttp({
			url: `/subject/join/${code}`,
			method: 'GET',
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					setIsJoin(false);
					toast.success('Subject Joined Successfully!');
					setReaload(true);
				} else {
					toast.error('Something went wrong!');
				}
			})
			.catch(err => {
				toast.error('Something went wrong!');
			});
	};
	return (
		<div>
			<div className='c-student-settings__menu '>
				<div className='c-student-settings__bars '>
					<div>Enter Code</div>:
					<input
						value={code}
						onChange={({ target }) => setCode(target.value)}
					/>
				</div>
			</div>
			<div className='c-student-settings__btn-wrapper '>
				<button className='c-logout-btn hoverScale' onClick={handleJoin}>
					Join Subject
				</button>
			</div>
		</div>
	);
}
