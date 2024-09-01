<script>
	import { preventDefault } from '$lib/utils.js'
	import { slide } from 'svelte/transition'

	const FILTERS = ['All', 'Completed', 'Remaining']

	// Props
	const { name = 'OG Todo List', saveAs = null } = $props()

	// State Mutations
	const filterTodos = option =>
		new Map([
			['All', todos],
			['Completed', todos.filter(({ isDone }) => !!isDone)],
			['Remaining', todos.filter(({ isDone }) => !isDone)],
		]).get(option)

	const addTodo = evt => {
		const text = new FormData(evt.target).get('text').trim()

		Boolean(text) &&
			todos.every(obj => obj.text !== text) &&
			todos.push({ text, isDone: false })

		evt.target.reset()
		evt.target.querySelector('input').focus()
	}

	const deleteTodo = idx => {
		if (confirm('Are you sure you want to delete this todo?')) {
			todos = todos.filter((_, i) => i !== idx)
		}
	}

	// State
	let todos = $state([])
	let filter = $state('All')

	const remaining = $derived(todos.filter(({ isDone }) => !isDone).length)
	const completed = $derived(todos.filter(({ isDone }) => !!isDone).length)

	const filteredTodos = $derived(filterTodos(filter))

	// Side Effects
	$effect(() => {
		const savedTodos = window.localStorage.getItem(saveAs)

		savedTodos && (todos = JSON.parse(savedTodos))
	})

	$effect(() => {
		Boolean(saveAs) && localStorage.setItem(saveAs, JSON.stringify(todos))
	})
</script>

<div class="border-1 radius-2 bg-gray-11 gray-0">
	<div class="grid place-content-center gap-1-5 p-2 text-center">
		<div class="text-center h2">{name}</div>

		<form class="flex" onsubmit={preventDefault(addTodo)}>
			<input
				class="full-width p-0-5"
				name="text"
				placeholder="Add new todo..."
				required
			/>
			<button class="bg-lime-4 hover-bg-gray-2 gray-12 h2">+</button>
		</form>

		<menu class="flex flex-wrap gap-0-2-5">
			{#each FILTERS as _filter}
				<li>
					<button
						class="bg-lime-4 hover-bg-gray-2 gray-12"
						class:bg-lime-6={filter === _filter}
						onclick={() => (filter = _filter)}>{_filter}</button
					>
				</li>
			{/each}
		</menu>

		<ul>
			{#each filteredTodos as todo, idx (todo)}
				<li
					class="flex space-between gap-1 py-0-5"
					class:gray-6={todo.isDone}
					transition:slide
				>
					<input
						style="width: var(--size-1-5); accent-color: var(--lime-4)"
						type="checkbox"
						bind:checked={todo.isDone}
					/>
					<input
						class="full-width p-0-5 unset text-left"
						type="text"
						bind:value={todo.text}
					/>
					<button class="unset h2 hover-red-4" onclick={() => deleteTodo(idx)}
						>X</button
					>
				</li>
			{/each}
		</ul>

		{#if filter === 'Completed'}
			<div class="h4">{completed} completed</div>
		{:else if filter === 'Remaining'}
			<div class="h4">{remaining} remaining</div>
		{:else}
			<div class="h4">{todos.length} items</div>
		{/if}
	</div>
</div>
