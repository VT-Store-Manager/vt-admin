export const calculateTimeDiff = (t: string) => {
	const now = Date.now()
	const past = new Date(t).getTime()

	return now - past
}

export const timeDiffToString = (t: string) => {
	const timeDiff = calculateTimeDiff(t)

	if (timeDiff < 1000) return 'Just now'
	const milestones = {
		'Just now': 1000,
		second: 1000 * 60,
		minute: 1000 * 60 * 60,
		hour: 1000 * 60 * 60 * 24,
		day: 1000 * 60 * 60 * 24 * 30,
		month: 1000 * 60 * 60 * 24 * 30 * 12,
		year: 1000 * 60 * 60 * 24 * 30 * 12 * 9999
	}

	let res = ''
	type TempKeyofMilestones = 'second'
	Object.keys(milestones).some((key, index, arr) => {
		if (!index) return false
		if (timeDiff < milestones[key as TempKeyofMilestones]) {
			const amount = Math.floor(
				timeDiff / milestones[arr[index - 1] as TempKeyofMilestones]
			)
			res = [amount, key + (amount > 1 ? 's' : ''), 'ago'].join(' ')
			return true
		}
		return false
	})

	return res
}
