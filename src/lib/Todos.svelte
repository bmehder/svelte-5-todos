<script>
	import { slide } from 'svelte/transition'
	import { preventDefault } from '$lib/utils.js'
	import Todos from '$lib/todos.svelte.js'

	const { saveAs } = $props()

	const todos = Todos(saveAs)
</script>

<div class="bg-gray-11 gray-0 border-1 radius-2">
	<div class="grid gap-1-5 place-content-center p-2 text-center">
		<div class="h2">Svelte 5 Todo List</div>

		<form onsubmit={preventDefault(todos.addTodo)}>
			<div class="flex">
				<input
					class="p-0-5 full-width"
					name="text"
					placeholder="Add new todo..."
					required
				/>
				<button class="bg-lime-4 gray-12 h2">+</button>
			</div>
		</form>

		<div class="flex flex-wrap gap-1">
			{#each todos.FILTERS as option}
				<button
					class="bg-lime-4 gray-12 radius-1"
					class:bg-lime-6={todos.filter.value === option}
					onclick={() => todos.setFilter(option)}>{option}</button
				>
			{/each}
		</div>

		<ul>
			{#each todos.filterTodos(todos.filter.value) as todo, i (todo)}
				<li
					class="flex space-between gap-1 px-1 py-0-5 overlay-6 border-bottom-2"
					class:gray-6={todo.isDone}
					transition:slide
				>
					<input
						style="width: var(--size-1-5); accent-color: var(--lime-4)"
						type="checkbox"
						onchange={() => todos.toggleIsDone(i)}
						checked={todo.isDone}
					/>
					<input
						class="full-width p-0-5 unset text-left"
						type="text"
						oninput={evt => todos.editTodo(i, evt.target.value)}
						value={todo.text}
					/>
					<button
						class="unset pointer h2 lime-4 hover-red-4"
						onclick={() => todos.deleteTodo(i)}>X</button
					>
				</li>
			{/each}
		</ul>

		<div class="h4">{todos.remaining()} remaining</div>
	</div>
</div>
