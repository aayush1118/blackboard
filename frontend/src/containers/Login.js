/** @format */

import React, { Component, useEffect, useState } from 'react';
import { withLayout } from '../components/Layout';
import '../styles/_login.scss';
import { ToastContainer, toast } from 'react-toastify';
import { callHttp } from '../utility/callHttp';

const Login = props => {
	const { history } = props;
	const [currentView, setCurrentView] = useState('logIn');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('a1@gmail.com');
	const [password, setPassword] = useState('11111111');
	const [role, setRole] = useState('student');

	const _h = func => e => func(e.target.value);

	const auth = JSON.stringify(localStorage.getItem('auth'));

	useEffect(() => {
		if (auth && auth.accessToken) history.push('/student');
	}, []);

	const roles = ['student', 'teacher'];
	const handleRegister = event => {
		event.preventDefault();
		let _role = role;
		if (role == 'teacher') _role = 'professor';
		callHttp({
			url: `/auth/signup`,
			method: 'POST',
			data: {
				firstname,
				lastname,
				email,
				password,
				roles: [_role],
			},
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					toast.success('Register Successfully!');
					localStorage.setItem('auth', JSON.stringify(res.data.data));
					history.push(`/${role}`);
				} else {
					toast.error(res.data?.message || 'Something went wrong!');
				}
			})
			.catch(res => {
				toast.error('Something went wrong!');
			});
		// notify();
		// history.push('/student');
	};
	const handleLogin = event => {
		event.preventDefault();
		let _role = role;
		if (role == 'teacher') _role = 'professor';
		callHttp({
			url: `/auth/signin`,
			method: 'POST',
			data: {
				email,
				password,
				roles: [_role],
			},
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					toast.success('Login Successfully!');
					localStorage.setItem('auth', JSON.stringify(res.data.data));
					history.push(`/${role}`);
				} else {
					toast.error('Something went wrong!');
				}
			})
			.catch(err => {
				toast.error('Something went wrong!');
			});
	};

	const topBar = (
		<div className='c-login__top-bar'>
			{roles.map(_role => (
				<div
					onClick={() => setRole(_role)}
					className={role == _role ? 'c-login__top-bar--selected' : ''}>
					{_role}
				</div>
			))}
		</div>
	);
	const view = () => {
		switch (currentView) {
			case 'signUp':
				return (
					<form>
						{topBar}
						<h2>Sign Up!</h2>
						<fieldset>
							<legend>Create Account</legend>
							<ul>
								<li>
									<label for='firstname'>First Name:</label>
									<input
										type='text'
										id='firstname'
										value={firstname}
										onChange={_h(setFirstname)}
										required
									/>
								</li>
								<li>
									<label for='lastname'>Last Name:</label>
									<input
										type='text'
										id='lastname'
										value={lastname}
										onChange={_h(setLastname)}
										required
									/>
								</li>
								<li>
									<label for='email'>Email:</label>
									<input
										type='email'
										id='email'
										value={email}
										onChange={_h(setEmail)}
										required
									/>
								</li>
								<li>
									<label for='password'>Password:</label>
									<input
										type='password'
										id='password'
										value={password}
										onChange={_h(setPassword)}
										required
									/>
								</li>
							</ul>
						</fieldset>
						<button onClick={handleRegister}>Register</button>
						<button type='button' onClick={() => setCurrentView('logIn')}>
							Have an Account?
						</button>
					</form>
				);
			case 'logIn':
				return (
					<form>
						{topBar}
						<h2>Welcome Back!</h2>
						<fieldset>
							<legend>Log In</legend>
							<ul>
								<li>
									<label for='email'>Email:</label>
									<input
										type='email'
										id='email'
										value={email}
										onChange={_h(setEmail)}
										required
									/>
								</li>
								<li>
									<label for='password'>Password:</label>
									<input
										type='password'
										id='password'
										value={password}
										onChange={_h(setPassword)}
										required
									/>
								</li>
								{/* <li>
									<i />
									<a onClick={() => setCurrentView('PWReset')} href='#'>
										Forgot Password?
									</a>
								</li> */}
							</ul>
						</fieldset>
						<button onClick={handleLogin}>Login</button>
						<button type='button' onClick={() => setCurrentView('signUp')}>
							Create an Account
						</button>
					</form>
				);
			case 'PWReset':
				return (
					<form>
						<h2>Reset Password</h2>
						<fieldset>
							<legend>Password Reset</legend>
							<ul>
								<li>
									<em>A reset link will be sent to your inbox!</em>
								</li>
								<li>
									<label for='email'>Email:</label>
									<input type='email' id='email' required />
								</li>
							</ul>
						</fieldset>
						<button>Send Reset Link</button>
						<button type='button' onClick={() => setCurrentView('logIn')}>
							Go Back
						</button>
					</form>
				);
			default:
				break;
		}
	};

	return <section id='entry-page'>{view()}</section>;
};

export default Login;
