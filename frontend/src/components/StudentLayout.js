/** @format */
import React from 'react';
import Sidebar from './student/Sidebar';

export const withStudentLayout = ComposedComponent =>
	class extends React.Component {
		componentDidMount() {
			const auth = JSON.parse(localStorage.getItem('auth'));
			if (!auth) this.props.history.push('/login');
		}
		render() {
			return (
				<div className='c-student-layout'>
					<Sidebar {...this.props} />
					<ComposedComponent
						className='c-layout__comp'
						{...this.props}
						{...this.state}
					/>
				</div>
			);
		}
	};
