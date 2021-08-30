/** @format */

import React from 'react';
import '../styles/_home.scss';
import image1 from '../assets/home.png';
import { withLayout } from '../components/Layout';

const Home = props => {
	const { history } = props;
	const goToLogin = () => history.push('/login');
	return (
		<div className='home-container'>
			<div className='home-container-left'>
				<h1>Virtual Classroom</h1>
				<p>A online platform for better education experience.</p>
				<br />
				<button className='home-container-left__btn' onClick={goToLogin}>
					Explore
				</button>
			</div>
			<div className='home-container-right'>
				<img src={image1} alt='home' width='80%' height='75%' />
			</div>
		</div>
	);
};

export default withLayout(Home);
