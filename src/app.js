let totalCost = 0
let groundArr = []
let firstArr = []
let secondArr = []

document.addEventListener('DOMContentLoaded', function () {
	generateCalendar('Ground')
	generateCalendar('First')
	generateCalendar('Second')

	costPerMonth('Ground', groundArr.length, 1)
	costPerMonth('First', firstArr.length, 2)
	costPerMonth('Second', secondArr.length, 1.5)
})

function generateCalendar(floorName) {
	let calendarEl = document.getElementById(`calendar${floorName}`)
	let calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
	})

	calendar.render()
	calendar.on('dateClick', function (info) {
		let currentColor = info.dayEl.style.backgroundColor

		let colorGreen = 'rgb(151, 173, 109)'
		let colorDefault = 'rgb(255, 255, 255)'

		if (currentColor === '' || currentColor === colorDefault) {
			info.dayEl.style.backgroundColor = colorGreen
			currentColor = colorGreen
		} else if (currentColor === colorGreen) {
			info.dayEl.style.backgroundColor = colorDefault
			currentColor = colorDefault
		}

		if (floorName === 'Ground' && currentColor === colorGreen) {
			groundArr.push(info.dateStr && currentColor === colorGreen)
		} else if (floorName === 'First') {
			firstArr.push(info.dateStr)
		} else if (floorName === 'Second' && currentColor === colorGreen) {
			secondArr.push(info.dateStr)
		}

		costPerMonth('Ground', groundArr.length, 1)
		costPerMonth('First', firstArr.length, 2)
		costPerMonth('Second', secondArr.length, 1.5)
	})
}

function costPerMonth(floorName, daysDeducted, dailyLimit) {
	const spanDisplayEl = document.getElementById(`cost${floorName}`)
	const milkAmountPerLitre = 48
	const currentDate = moment()
	const daysInMonth = currentDate.daysInMonth()
	let initialCostOfCurrentMonth =
		daysInMonth * dailyLimit * milkAmountPerLitre
	spanDisplayEl.textContent = initialCostOfCurrentMonth

	const daysInMonthAfterDeduction = currentDate.daysInMonth() - daysDeducted
	let costOfCurrentMonth =
		daysInMonthAfterDeduction * dailyLimit * milkAmountPerLitre
	// console.log(costOfCurrentMonth)
	spanDisplayEl.textContent = costOfCurrentMonth
}
