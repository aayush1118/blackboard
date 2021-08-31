/** @format */

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { callHttp } from '../../utility/callHttp';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

export default function SubjectForm(props) {
	const [name, setName] = useState('');
	const [value, onChange] = useState(['10:00', '11:00']);

	const handleCreate = event => {
		event.preventDefault();
		const data = {
			name,
			timings: [{ start: value.start, end: value.end }],
			assignment: [''],
		};
		callHttp({
			url: `/subject/create`,
			method: 'POST',
			data,
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					toast.success('Subject Created Successfully!');
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
					{
						<button className='c-logout-btn hoverScale' onClick={handleCreate}>
							Create
						</button>
					}
				</div>
			</div>
		</div>
	);
}
