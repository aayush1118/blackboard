/** @format */

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { callHttp } from '../../utility/callHttp';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import moment from 'moment';

export default function SubjectForm({ setViewScreen, setResData }) {
	const [name, setName] = useState('');
	const [value, onChange] = useState(['10:00', '11:00']);

	const handleCreate = event => {
		event.preventDefault();
		console.log(value);
		let start = new Date();
		let end = new Date();
		start.setHours(value[0].substring(0, 2), value[0].substring(3, 5));
		end.setHours(value[1].substring(0, 2), value[1].substring(3, 5));
		const data = {
			name,
			timings: [{ start, end }],
			assignment: [''],
		};
		console.log(data);
		callHttp({
			url: `/subject/create`,
			method: 'POST',
			data,
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					toast.success('Subject Created Successfully!');
					setResData(res.data.data);
					setViewScreen('done');
					// localStorage.setItem('auth', JSON.stringify(res.data.data));
					// history.push(`/${role}`);
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
					<div>Subject's Name</div>:
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div className='c-student-settings__bars '>
					<div>Timings</div>:
					<TimeRangePicker onChange={onChange} value={value} />
				</div>

				<div className='c-student-settings__btn-wrapper '>
					<button className='c-logout-btn hoverScale' onClick={handleCreate}>
						Create
					</button>
				</div>
			</div>
		</div>
	);
}
