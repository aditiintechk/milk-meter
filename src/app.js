let totalCost = 0

document.addEventListener('DOMContentLoaded', function () {
	generateCalendar('Ground', 1)
	generateCalendar('First', 2)
	generateCalendar('Second', 1.5)
})

function generateCalendar(floorName, dailyLimit) {
	const milkAmountPerLitre = 48
	let calendarEl = document.getElementById(`calendar${floorName}`)
	let calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
	})

	calendar.render()
	calendar.on('dateClick', function (info) {
		console.log('clicked on ' + info.dateStr)
		let currentColor = info.dayEl.style.backgroundColor

		let colorGreen = 'rgb(151, 173, 109)'
		let colorDefault = 'rgb(255, 255, 255)'

		if (currentColor === '' || currentColor === colorDefault) {
			info.dayEl.style.backgroundColor = colorGreen
		} else if (currentColor === colorGreen) {
			info.dayEl.style.backgroundColor = colorDefault
		}
	})

	const currentDate = moment()
	const daysInMonth = currentDate.daysInMonth()
	console.log('Number of days in the current month:', daysInMonth)

	let costOfCurrentMonth = daysInMonth * dailyLimit * milkAmountPerLitre
	console.log(costOfCurrentMonth)
}
