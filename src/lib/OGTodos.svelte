<script>
	import { preventDefault } from '$lib/utils.js'
	import { slide } from 'svelte/transition'
	import {
		pipe,
		keep,
		reject,
		every,
		pluck,
		trim,
		length,
		stringify,
		parseJSON,
	} from 'nejquery'

	const FILTERS = Object.freeze(['All', 'Completed', 'Remaining'])

	// Props
	const { name = 'OG Todo List', saveAs = null } = $props()

	// Partially applied functions
	const isDone = pluck('isDone')
	const keepIsDone = keep(isDone)
	const rejectIsDone = reject(isDone)
	const countCompleted = pipe(keepIsDone, length)
	const countRemaining = pipe(rejectIsDone, length)

	// State Mutations
	const filterTodos = option =>
		new Map([
			['All', todos],
			['Completed', keepIsDone(todos)],
			['Remaining', rejectIsDone(todos)],
		]).get(option)

	// Event Handlers
	const addTodo = evt => {
		const text = trim(new FormData(evt.target).get('text'))
		const isTextNotIncluded = every(obj => obj.text !== text)

		Boolean(text) && isTextNotIncluded(todos) && todos.push({ text, isDone: false })

		evt.target.reset()
		evt.target.querySelector('input').focus()
	}

	const deleteTodo = idx => {
		const rejectTodoWithIndex = reject((_, i) => i === idx)

		if (confirm('Are you sure you want to delete this todo?')) {
			todos = rejectTodoWithIndex(todos)
		}
	}

	// Explicit State
	let todos = $state([])
	let filter = $state('All')

	// Implicit State
	const completedCount = $derived(countCompleted(todos))
	const remainingCount = $derived(countRemaining(todos))
	const todosCount = $derived(length(todos))

	// Side Effects
	$effect(() => {
		const savedTodos = window.localStorage.getItem(saveAs)

		savedTodos && (todos = parseJSON(savedTodos))
	})

	$effect(() => {
		Boolean(saveAs) && localStorage.setItem(saveAs, stringify(todos))
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
						onclick={() => (filter = _filter)}
					>
						{_filter}
					</button>
				</li>
			{/each}
		</menu>

		<ul>
			{#each filterTodos(filter) as todo, idx (todo)}
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
			<div class="h4">{completedCount} completed</div>
		{:else if filter === 'Remaining'}
			<div class="h4">{remainingCount} remaining</div>
		{:else}
			<div class="h4">{todosCount} items</div>
		{/if}
	</div>
</div>
