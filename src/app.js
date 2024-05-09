let totalCost = 0
let groundArr = []
let firstArr = []
let secondArr = []

const dateNow = new Date().toISOString().slice(0, 10)

document.addEventListener('DOMContentLoaded', function () {
	groundArr = loadFloorData('Ground')
	firstArr = loadFloorData('First')
	secondArr = loadFloorData('Second')

	generateCalendar('Ground')
	generateCalendar('First')
	generateCalendar('Second')

	costPerMonth('Ground', groundArr.length, 1)
	costPerMonth('First', firstArr.length, 2)
	costPerMonth('Second', secondArr.length, 1.5)
})

function loadFloorData(floorName) {
	let storedData = localStorage.getItem(floorName)
	return storedData ? JSON.parse(storedData) : []
}

function generateCalendar(floorName) {
	let calendarEl = document.getElementById(`calendar${floorName}`)
	let calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
	})

	calendar.render()

	let storedData = localStorage.getItem(floorName)
	if (storedData) {
		let datesData = JSON.parse(storedData)
		datesData.forEach((dateInfo) => {
			let dateStr = dateInfo.selectedDate

			let dayElement = calendar.el.querySelector(
				`.fc-day[data-date="${dateStr}"]`
			)

			if (dayElement) {
				dayElement.style.backgroundColor = dateInfo.tileColor
			}
		})
	}

	calendar.on('dateClick', function (info) {
		let currentColor = info.dayEl.style.backgroundColor
		let currentDate = info.dateStr

		let colorMustard = 'rgb(218, 186, 100)'
		let colorDefault = 'rgb(255, 255, 255)'
		let colorPink = 'rgb(221, 189, 195)'

		if (
			currentColor === '' ||
			currentColor === colorDefault ||
			currentColor === colorPink
		) {
			info.dayEl.style.backgroundColor = colorMustard
			currentColor = colorMustard
		} else if (currentColor === colorMustard) {
			if (currentDate === dateNow) {
				info.dayEl.style.backgroundColor = colorPink
				currentColor = colorPink
			} else {
				info.dayEl.style.backgroundColor = colorDefault
				currentColor = colorDefault
			}
		}

		if (floorName === 'Ground') {
			groundArr = updateArr(
				groundArr,
				currentColor,
				currentDate,
				colorMustard,
				colorDefault,
				colorPink
			)
			localStorage.setItem(floorName, JSON.stringify(groundArr))
		} else if (floorName === 'First') {
			firstArr = updateArr(
				firstArr,
				currentColor,
				currentDate,
				colorMustard,
				colorDefault,
				colorPink
			)
			localStorage.setItem(floorName, JSON.stringify(firstArr))
		} else if (floorName === 'Second') {
			secondArr = updateArr(
				secondArr,
				currentColor,
				currentDate,
				colorMustard,
				colorDefault,
				colorPink
			)
			localStorage.setItem(floorName, JSON.stringify(secondArr))
		}

		costPerMonth('Ground', groundArr.length, 1)
		costPerMonth('First', firstArr.length, 2)
		costPerMonth('Second', secondArr.length, 1.5)

		totalCost =
			costPerMonth('Ground', groundArr.length, 1) +
			costPerMonth('First', firstArr.length, 2) +
			costPerMonth('Second', secondArr.length, 1.5)
		document.getElementById('total-amount').textContent = totalCost
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

	return costOfCurrentMonth
}

function updateArr(
	currentArr,
	currentColor,
	currentDate,
	colorMustard,
	colorDefault,
	colorPink
) {
	if (currentColor === colorMustard) {
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
	} else if (currentColor === colorPink) {
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
