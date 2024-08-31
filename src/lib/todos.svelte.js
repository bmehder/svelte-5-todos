export default localStorageName => {
	const FILTERS = ['All', 'Completed', 'Remaining']

	// State
	let list = $state({ value: [] })
	let filter = $state({ value: 'All' })

	// Side Effects
	$effect(() => {
		const savedTodos = window.localStorage.getItem(localStorageName) ?? null

		savedTodos && (list.value = JSON.parse(savedTodos))
	})

	$effect(() => {
		Boolean(localStorageName) &&
			localStorage.setItem(localStorageName, JSON.stringify(list.value))
	})

	return {
		list,
		FILTERS,
		filter,
		addTodo: evt => {
			const text = new FormData(evt.target).get('text').trim()

			Boolean(text) &&
				list.value.every(obj => obj.text !== text) &&
				list.value.push({ text, isDone: false })

			evt.target.reset()
			evt.target.querySelector('input').focus()
		},
		editTodo: evt => {
			const inputEl = evt.target
			const index = +inputEl.dataset.index

			list.value[index].text = inputEl.value
		},
		deleteTodo: evt => {
			if (confirm('Are you sure you want to delete this todo?')) {
				const inputEl = evt.target
				const index = +inputEl.dataset.index

				list.value = list.value.filter((_, i) => i !== index)
			}
		},
		toggleIsDone: evt => {
			const inputEl = evt.target
			const index = +inputEl.dataset.index

			list.value[index].isDone = !list.value[index].isDone
		},
		remaining: () => list.value.filter(({ isDone }) => !isDone).length,
		setFilter: option => {
			filter.value = option
		},
		filterTodos: option =>
			new Map([
				['All', list.value],
				['Completed', list.value.filter(({ isDone }) => !!isDone)],
				['Remaining', list.value.filter(({ isDone }) => !isDone)],
			]).get(option),
	}
}
