/** @format */

import React, { useEffect, useState } from 'react';
import { withStudentLayout } from '../../components/StudentLayout';
import { callHttp } from '../../utility/callHttp';
import { ToastContainer, toast } from 'react-toastify';

const Settings = props => {
	const { history } = props;

	const auth = JSON.parse(localStorage.getItem('auth'));
	const [isEdit, setIsEdit] = useState(false);

	const elements = [
		{ id: 'firstname', name: 'First Name', value: '', isDisabled: true },
		{ id: 'lastname', name: 'Last Name', value: '', isDisabled: true },
		{ id: 'email', name: 'Email', value: '', isDisabled: true },
		{ id: 'roll', name: 'Roll No', value: '', isDisabled: false },
		{ id: 'degree', name: 'Degree', value: '', isDisabled: false },
		{ id: 'year', name: 'Year', value: '', isDisabled: false, type: 'number' },
	];
	const getProfileData = () => {
		callHttp({
			url: `/profile/${auth.id}`,
			method: 'GET',
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					// toast.success('Updated Successfully!');
					setValues(res.data.data);
					// history.push(`/${role}`);
				} else {
					toast.error('Something went wrong!');
				}
			})
			.catch(err => {
				toast.error('Something went wrong!');
			});
	};
	const [values, setValues] = useState({
		firstname: '',
		lastname: '',
		email: '',
		roll: '',
		degree: '',
		year: '',
	});
	const handleChange = e => {
		const { id, value } = e.target;
		setValues({ ...values, [id]: value });
	};

	const handleUpdate = event => {
		event.preventDefault();
		const { roll, degree, year } = values;
		const data = {
			...values,
			roll: 'asd',
			degree: 'asd',
			year: 1,
		};
		callHttp({
			url: `/profile/update`,
			method: 'POST',
			data,
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					toast.success('Updated Successfully!');
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

	useEffect(() => {
		if (auth) {
			getProfileData();
			setValues(auth);
		}
	}, []);

	return (
		<div className=' c-student-settings card'>
			<div className='c-student-settings__header'>
				<h3>Profile</h3>
				{!isEdit && (
					<button
						className='c-logout-btn hoverScale'
						onClick={() => setIsEdit(true)}>
						Edit
					</button>
				)}
			</div>
			<hr />
			<br />
			<div className='c-student-settings__menu '>
				{elements.map(_el => (
					<div className='c-student-settings__bars '>
						<div>{_el.name}</div>:
						<div>
							{isEdit ? (
								<input
									id={_el?.id}
									disabled={_el?.isDisabled}
									value={values[_el?.id]}
									onChange={handleChange}
									type={_el?.type}
								/>
							) : (
								auth[_el?.id]
							)}
						</div>
					</div>
				))}
				<div className='c-student-settings__btn-wrapper '>
					{isEdit && (
						<button className='c-logout-btn hoverScale' onClick={handleUpdate}>
							Update
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
export default withStudentLayout(Settings);
