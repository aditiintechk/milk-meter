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
		let currentDate = info.dateStr

		let colorGreen = 'rgb(151, 173, 109)'
		let colorDefault = 'rgb(255, 255, 255)'

		if (currentColor === '' || currentColor === colorDefault) {
			info.dayEl.style.backgroundColor = colorGreen
			currentColor = colorGreen
		} else if (currentColor === colorGreen) {
			info.dayEl.style.backgroundColor = colorDefault
			currentColor = colorDefault
		}

		if (floorName === 'Ground')
			groundArr = updateArr(
				groundArr,
				currentColor,
				currentDate,
				colorGreen,
				colorDefault
			)
		else if (floorName === 'First')
			firstArr = updateArr(
				firstArr,
				currentColor,
				currentDate,
				colorGreen,
				colorDefault
			)
		else if (floorName === 'Second')
			secondArr = updateArr(
				secondArr,
				currentColor,
				currentDate,
				colorGreen,
				colorDefault
			)

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
	spanDisplayEl.textContent = costOfCurrentMonth

	totalCost += costOfCurrentMonth
	document.getElementById('total-amount').textContent = totalCost
}

function updateArr(
	currentArr,
	currentColor,
	currentDate,
	colorGreen,
	colorDefault
) {
	if (currentColor === colorGreen) {
		let result = currentArr.find(
			(item) => item.selectedDate === currentDate
		)
		if (result === undefined) {
			currentArr.push({
				selectedDate: currentDate,
				tileColor: currentColor,
			})
		}
	} else if (currentColor === colorDefault) {
		let result = currentArr.find(
			(item) => item.selectedDate === currentDate
		)
		if (result) {
			currentArr = currentArr.filter(
				(item) => item.selectedDate !== currentDate
			)
		}
	}

	return currentArr
}

/* if (floorName === 'Ground') {
	if (currentColor === colorGreen) {
		let result = groundArr.find(
			(item) => item.selectedDate === currentDate
		)
		if (result === undefined) {
			groundArr.push({
				selectedDate: currentDate,
				tileColor: currentColor,
			})
		}
	} else if (currentColor === colorDefault) {
		let result = groundArr.find(
			(item) => item.selectedDate === currentDate
		)
		if (result) {
			groundArr = groundArr.filter(
				(item) => item.selectedDate !== currentDate
			)
		}
	}
} else if (floorName === 'First') {
	if (currentColor === colorGreen) {
		let result = firstArr.find(
			(item) => item.selectedDate === currentDate
		)
		if (result === undefined) {
			firstArr.push({
				selectedDate: currentDate,
				tileColor: currentColor,
			})
		}
	} else if (currentColor === colorDefault) {
		let result = firstArr.find(
			(item) => item.selectedDate === currentDate
		)
		if (result) {
			firstArr = firstArr.filter(
				(item) => item.selectedDate !== currentDate
			)
		}
	}
} else if (floorName === 'Second') {
	if (currentColor === colorGreen) {
		let result = secondArr.find(
			(item) => item.selectedDate === currentDate
		)
		if (result === undefined) {
			secondArr.push({
				selectedDate: currentDate,
				tileColor: currentColor,
			})
		}
	} else if (currentColor === colorDefault) {
		let result = secondArr.find(
			(item) => item.selectedDate === currentDate
		)
		if (result) {
			secondArr = secondArr.filter(
				(item) => item.selectedDate !== currentDate
			)
		}
	}
} */
