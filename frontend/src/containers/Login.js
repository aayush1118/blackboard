/** @format */

import React, { Component, useState } from 'react';
import { withLayout } from '../components/Layout';
import '../styles/_login.scss';

const Login = props => {
	const { history } = props;
	const [currentView, setCurrentView] = useState('signUp');

	const handleLogin = () => {
		history.push('/student');
	};
	const view = () => {
		switch (currentView) {
			case 'signUp':
				return (
					<form>
						<div className='c-login__top-bar'>
							<div>Student</div>
							<div>Teacher</div>
						</div>
						<h2>Sign Up!</h2>
						<fieldset>
							<legend>Create Account</legend>
							<ul>
								<li>
									<label for='username'>Username:</label>
									<input type='text' id='username' required />
								</li>
								<li>
									<label for='email'>Email:</label>
									<input type='email' id='email' required />
								</li>
								<li>
									<label for='password'>Password:</label>
									<input type='password' id='password' required />
								</li>
							</ul>
						</fieldset>
						<button onClick={handleLogin}>Submit</button>
						<button type='button' onClick={() => setCurrentView('logIn')}>
							Have an Account?
						</button>
					</form>
				);
			case 'logIn':
				return (
					<form>
						<h2>Welcome Back!</h2>
						<fieldset>
							<legend>Log In</legend>
							<ul>
								<li>
									<label for='username'>Username:</label>
									<input type='text' id='username' required />
								</li>
								<li>
									<label for='password'>Password:</label>
									<input type='password' id='password' required />
								</li>
								<li>
									<i />
									<a onClick={() => setCurrentView('PWReset')} href='#'>
										Forgot Password?
									</a>
								</li>
							</ul>
						</fieldset>
						<button>Login</button>
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
