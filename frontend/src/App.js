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
import Test from './containers/student/Test';

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
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/student' component={StudentHome} />
					<Route exact path='/student/classmates' component={ClassMates} />
					<Route exact path='/student/classroom' component={Classroom} />
					<Route exact path='/student/assignments' component={Assignments} />
					<Route exact path='/student/test' component={Test} />
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
