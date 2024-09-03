<script>
	import { slide } from 'svelte/transition'
	import {
		pipe,
		keep,
		reject,
		every,
		push,
		pluck,
		trim,
		length,
		stringify,
		parseJSON,
		filter,
	} from 'nejquery'

	// An Immutable List
	const FILTERS = Object.freeze(['All', 'Completed', 'Remaining'])

	// Props
	const { name = 'OG Todo List', saveAs = null } = $props()

	// Helper Functions
	const newFormDataObj = x => new FormData(x)
	const getText = obj => obj.get('text')

	// Partially Applied Functions
	const isDone = pluck('isDone')
	const keepIsDones = keep(isDone)
	const rejectIsDones = reject(isDone)
	const countCompleted = pipe(keepIsDones, length)
	const countRemaining = pipe(rejectIsDones, length)

	// State Mutation Functions
	const addTodo = form => {
		const trimmedText = pipe(newFormDataObj, getText, trim)(form)

		// Partially applied local functions
		const isNotIncludesTrimmedText = every(({ text }) => text !== trimmedText)
		const pushNewTodo = push({ text: trimmedText, isDone: false })

		// Mutate the state (w/ guards)
		Boolean(trimmedText) &&
			isNotIncludesTrimmedText(todos) &&
			(todos = pushNewTodo(todos))
	}

	const deleteTodo = idx => {
		// Partially applied local function
		const rejectTodoWithIndex = reject((_, i) => i === idx)

		// Mutate the state
		todos = rejectTodoWithIndex(todos)
	}

	// Event Handlers
	const handle = {
		submit: evt => {
			evt.preventDefault()

			addTodo(evt.target)

			evt.target.reset()
			evt.target.firstChild.focus()
		},

		delete: idx => {
			confirm('Are you sure you want to delete this todo?') && deleteTodo(idx)
		},
	}

	// Explicit State
	let todos = $state([])
	let filterOption = $state('All')

	// Implicit State
	const completedCount = $derived(countCompleted(todos))
	const remainingCount = $derived(countRemaining(todos))
	const todosCount = $derived(length(todos))

	const filteredTodos = $derived(
		new Map([
			['All', todos],
			['Completed', keepIsDones(todos)],
			['Remaining', rejectIsDones(todos)],
		]).get(filterOption)
	)

	// Side Effects
	$effect(() => {
		const savedTodos = window.localStorage.getItem(saveAs)

		Boolean(savedTodos) && (todos = parseJSON(savedTodos))
	})

	$effect(() => {
		Boolean(saveAs) && localStorage.setItem(saveAs, stringify(todos))
	})
</script>

<div class="border-1 radius-2 bg-gray-11 gray-0">
	<div class="grid place-content-center gap-1-5 p-2 text-center">
		<div class="text-center h2">{name}</div>

		<form class="flex" onsubmit={handle.submit}>
			<input
				class="full-width p-0-5"
				name="text"
				placeholder="Add new todo..."
				required
			/>
			<button class="bg-lime-4 hover-bg-gray-2 gray-12 h2">+</button>
		</form>

		<menu class="flex flex-wrap gap-0-2-5">
			{#each FILTERS as filter}
				<li>
					<button
						class="bg-lime-4 hover-bg-gray-2 gray-12"
						class:bg-lime-6={filterOption === filter}
						onclick={() => (filterOption = filter)}
					>
						{filter}
					</button>
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
					<button
						class="unset h2 hover-red-4 focus-outline-1"
						onclick={() => handle.delete(idx)}>X</button
					>
				</li>
			{/each}
		</ul>

		{#if filterOption === 'Completed'}
			<div class="h4">{completedCount} completed</div>
		{:else if filterOption === 'Remaining'}
			<div class="h4">{remainingCount} remaining</div>
		{:else}
			<div class="h4">{todosCount} {todosCount === 1 ? 'item' : 'items'}</div>
		{/if}
	</div>
</div>
