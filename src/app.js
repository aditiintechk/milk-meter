document.addEventListener('DOMContentLoaded', function () {
	generateCalendar('Ground')
	generateCalendar('First')
	generateCalendar('Second')
})

function generateCalendar(floorName) {
	let calendarEl = document.getElementById(`calendar${floorName}`)
	let calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
	})

	calendar.render()
}
