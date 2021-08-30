/** @format */
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = props => {
	const events = [
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
