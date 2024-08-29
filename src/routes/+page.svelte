<script>
	import { slide } from 'svelte/transition'

	const FILTERS = ['All', 'Completed', 'Remaining']

	const filterTodos = x =>
		new Map([
			['All', todos],
			['Completed', todos.filter(({ done }) => done)],
			['Remaining', todos.filter(({ done }) => !done)],
		]).get(x)

	const setFilter = x => {
		filter = x
	}

	const addTodo = evt => {
		if (evt.key !== 'Enter') return

		const todoEl = evt.target
		const text = todoEl.value

		todos.push({ text, done: false })
		todoEl.value = ''
	}

	const editTodo = evt => {
		const inputEl = evt.target
		const index = +inputEl.dataset.index

		todos[index].text = inputEl.value
	}

	const deleteTodo = evt => {
		if (confirm('You sure?')) {
			const inputEl = evt.target
			const index = +inputEl.dataset.index

			todos = todos.filter((_, i) => i !== index)
		}
	}

	const toggleDone = evt => {
		const inputEl = evt.target
		const index = +inputEl.dataset.index

		todos[index].done = !todos[index].done
	}

	// State
	let todos = $state([])

	let filter = $state('All')

	const remaining = $derived(todos.filter(({ done }) => !done).length)

	const filteredTodos = $derived(filterTodos(filter))

	// Side Effects
	$effect(() => {
		const savedTodos = window.localStorage.getItem('svelte-5-todos')

		savedTodos && (todos = JSON.parse(savedTodos))
	})

	$effect(() => {
		localStorage.setItem('svelte-5-todos', JSON.stringify(todos))
	})

	// Logs
	$inspect(todos)
	$inspect(filter)
</script>

<div
	class="fit-content mx-auto grid place-content-center gap-2 p-2 border-1 radius-2 gray-0"
>
	<div class="text-center h2">Svelte 5 Todo List</div>

	<input class="p-0-5" onkeydown={addTodo} placeholder="Add new todo..." />

	<div class="flex gap-1">
		{#each FILTERS as _filter}
			<button
				class="bg-lime-4 gray-12 radius-1"
				class:bg-lime-6={filter === _filter}
				onclick={() => setFilter(_filter)}>{_filter}</button
			>
		{/each}
	</div>

	<ul>
		{#each filteredTodos as todo, i (todo)}
			<li
				class="flex space-between gap-1 p-1 overlay-6 border-bottom-2"
				class:gray-6={todo.done}
				transition:slide
			>
				<input
					style="width: var(--size-1-5); accent-color: var(--lime-4)"
					type="checkbox"
					onchange={toggleDone}
					data-index={i}
					checked={todo.done}
				/>
				<input
					class="full-width p-0-5 unset"
					type="text"
					oninput={editTodo}
					data-index={i}
					value={todo.text}
				/>
				<button
					class="unset pointer h2 hover-red-4"
					onclick={deleteTodo}
					data-index={i}>X</button
				>
			</li>
		{/each}
	</ul>

	<div class="text-center h4">{remaining} remaining</div>
</div>
