/** @format */
import React from 'react';
import Navbar from './Navbar';

export const withLayout = ComposedComponent =>
	class extends React.Component {
		componentDidMount() {
			// this.setState({
			// 	data: newData.data,
			// });
		}
		render() {
			return (
				<div className='c-layout'>
					<Navbar />
					<ComposedComponent
						className='c-layout__comp'
						{...this.props}
						{...this.state}
					/>
				</div>
			);
		}
	};
