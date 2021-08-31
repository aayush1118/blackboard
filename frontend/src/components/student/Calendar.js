/** @format */
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { callHttp } from '../../utility/callHttp';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);
const auth = JSON.parse(localStorage.getItem('auth'));

const MyCalendar = props => {
	const [events, setEvents] = useState([]);

	const getAllSubjects = () => {
		callHttp({
			url: `/subject/${auth.id}`,
			method: 'GET',
		})
			.then(res => {
				if (res.status == 200 && res.data.success) {
					const ev = res.data.data.map(s => {
						return {
							title: s.name,
							start: moment(s.timings[0].start).toDate(),
							end: moment(s.timings[0].end).toDate(),
						};
					});
					setEvents(ev);
					console.log(ev);
				} else {
					toast.error('Something went wrong!');
				}
			})
			.catch(err => {
				toast.error('Something went wrong!');
			});
	};
	useEffect(() => {
		getAllSubjects();
	}, []);
	const events1 = [
		{
			start: moment().toDate(),
			end: moment().add(1, 'hour').toDate(),
			title: 'Some title',
		},
		{
			start: moment().toDate(),
			end: moment().add(1, 'hour').toDate(),
			title: 'Some title',
		},
		{
			start: moment().toDate(),
			end: moment().add(1, 'hour').toDate(),
			title: 'Some title',
		},
		{
			start: moment().toDate(),
			end: moment().add(1, 'hour').toDate(),
			title: 'Some title',
		},
	];
	return (
		<div>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 500 }}
			/>
		</div>
	);
};
export default MyCalendar;

// return {
// 	title: s.name,
// 	start: moment(s.timings[0].start).startOf('week').add(1, 'day').toDate(),
// 	end: moment(s.timings[0].end).endOf('week').subtract(1, 'day').toDate(),
// };
