export default saveAs => {
	const FILTERS = Object.freeze(['All', 'Completed', 'Remaining'])

	// State
	let list = $state({ value: [] })
	let filter = $state({ value: 'All' })

	// Side Effects
	$effect(() => {
		const savedTodos = window.localStorage.getItem(saveAs)

		savedTodos && (list.value = JSON.parse(savedTodos))
	})

	$effect(() => {
		Boolean(saveAs) && localStorage.setItem(saveAs, JSON.stringify(list.value))
	})

	return {
		list,
		FILTERS,
		filter,
		add: evt => {
			const text = new FormData(evt.target).get('text').trim()

			Boolean(text) &&
				list.value.every(obj => obj.text !== text) &&
				list.value.push({ text, isDone: false })

			evt.target.reset()
			evt.target.querySelector('input').focus()
		},
		edit: (idx, text) => {
			list.value[idx].text = text
		},
		delete: idx => {
			if (confirm('Are you sure you want to delete this todo?')) {
				list.value = list.value.filter((_, i) => i !== idx)
			}
		},
		toggleIsDone: idx => {
			list.value[idx].isDone = !list.value[idx].isDone
		},
		totalCount: () => list.value.length,
		completed: () => list.value.filter(({ isDone }) => !!isDone).length,
		remaining: () => list.value.filter(({ isDone }) => !isDone).length,
		filterTodos: option =>
			new Map([
				['All', list.value],
				['Completed', list.value.filter(({ isDone }) => !!isDone)],
				['Remaining', list.value.filter(({ isDone }) => !isDone)],
			]).get(option),
	}
}
