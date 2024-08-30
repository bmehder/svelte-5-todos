export default () => {
	const FILTERS = ['All', 'Completed', 'Remaining']

	let list = $state({
		value: [],
	})

	let filter = $state({ value: 'All' })

	// Side Effects
	$effect(() => {
		const savedTodos = window.localStorage.getItem('svelte-5-todos-2')

		savedTodos && (list.value = JSON.parse(savedTodos))
	})

	$effect(() => {
		localStorage.setItem('svelte-5-todos-2', JSON.stringify(list.value))
	})

	return {
		FILTERS,
		list,
		filter,
		addTodo: evt => {
			if (evt.key !== 'Enter') return

			const todoEl = evt.target
			const text = todoEl.value

			list.value.push({ text, isDone: false })
			todoEl.value = ''
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
				console.log(list)
			}
		},
		toggleIsDone: evt => {
			const inputEl = evt.target
			const index = +inputEl.dataset.index

			list.value[index].isDone = !list.value[index].isDone
		},
		setFilter: option => {
			filter.value = option
		},
		filterTodos: option =>
			new Map([
				['All', list.value],
				['Completed', list.value.filter(({ isDone }) => !!isDone)],
				['Remaining', list.value.filter(({ isDone }) => !isDone)],
			]).get(option),
		remaining: () => list.value.filter(({ isDone }) => !isDone).length,
	}
}
