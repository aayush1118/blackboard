/** @format */

import React, { useEffect } from 'react';
import './styles/_app.scss';
import Home from './containers/Home';
import Login from './containers/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StudentHome from './containers/student/Home';
import ClassMates from './containers/student/ClassMates';
import Classroom from './containers/student/Classroom';
import Assignments from './containers/student/Assignment';
import Schedule from './containers/student/Schedule';
import Test from './containers/student/Test';
import Settings from './containers/student/Settings';

import TeacherHome from './containers/teacher/Home';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subjects from './containers/teacher/Subjects';

// import Login from './screens/Login';
// import { auth, db } from './firebase';
// import { Redirect } from 'react-router-dom';
// import ClassDetail from './screens/ClassDetail';
// import Work from './screens/Work';
// import Peoples from './screens/Peoples';

function App() {
	// const [{ user }, dispatch] = useStateValue();
	// useEffect(() => {
	// 	auth.onAuthStateChanged(authUser => {
	// 		if (authUser) {
	// 			dispatch({
	// 				type: 'SET_USER',
	// 				user: authUser,
	// 			});
	// 		} else {
	// 			dispatch({
	// 				type: 'SET_USER',
	// 				user: null,
	// 			});
	// 		}
	// 	});
	// }, []);
	return (
		<Router>
			<div>
				<ToastContainer
					position='top-center'
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable={false}
					pauseOnHover={false}
				/>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/student' component={StudentHome} />
					<Route exact path='/student/classmates' component={ClassMates} />
					<Route exact path='/student/schedule' component={Schedule} />
					<Route exact path='/student/classroom' component={Classroom} />
					<Route exact path='/student/assignments' component={Assignments} />
					<Route exact path='/student/test' component={Test} />
					<Route exact path='/student/settings' component={Settings} />

					<Route exact path='/teacher' component={TeacherHome} />
					<Route exact path='/teacher/subjects' component={Subjects} />

					{/* 
					<Route
						path='/c/:id'
						render={props => {
							const id = props.match.params.id;
							return <ClassDetail id={id} />;
						}}
					/>

					<Route
						path='/work/:id'
						render={props => {
							const id = props.match.params.id;
							return <Work id={id} />;
						}}
					/>

					<Route
						path='/peoples/:id'
						render={props => {
							const id = props.match.params.id;
							return <Peoples id={id} />;
						}}
					/> */}
				</Switch>
			</div>
		</Router>
	);
}
export default App;
