/** @format */

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { callHttp } from '../../utility/callHttp';

export default function AttendanceCard(props) {
	const { history } = props;

	const handleLogOut = event => {
		history.push('/login');

		event.preventDefault();
		callHttp({
			url: `/auth/logout`,
			method: 'GET',
		})
			.then(res => {
				if (res.status == 200) {
					toast.success('Logout Successfully!');
					history.push('/login');
				} else {
					toast.error('Something went wrong!');
				}
			})
			.catch(err => {
				toast.error('Something went wrong!');
			});
		// notify();
		// history.push('/student');
	};
	return (
		<div className='c-attendance-card'>
			<h4>Attendence</h4>
			<div className='c-attendance-card__boxes'>
				<div className='c-attendance-card__boxes-box'>
					<div className='c-attendance-card__boxes-box-number'>75</div>
					<div className='c-attendance-card__boxes-box-caption'>Percentage</div>
				</div>
				<div className='c-attendance-card__boxes-box'>
					<div className='c-attendance-card__boxes-box-number'>90</div>
					<div className='c-attendance-card__boxes-box-caption'>Present</div>
				</div>
				<div className='c-attendance-card__boxes-box'>
					<div className='c-attendance-card__boxes-box-number'>6</div>
					<div className='c-attendance-card__boxes-box-caption'>Absent</div>
				</div>
				<div className='c-attendance-card__boxes-box'>
					<div className='c-attendance-card__boxes-box-number'>96</div>
					<div className='c-attendance-card__boxes-box-caption'>Total</div>
				</div>
			</div>
		</div>
	);
}
