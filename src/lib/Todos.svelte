<script>
	import { slide } from 'svelte/transition'
	import { preventDefault } from '$lib/utils.js'
	import Todos from '$lib/todos.svelte.js'

	const { saveAs } = $props()

	const todos = Todos(saveAs)
</script>

<div class="grid place-content-center gap-2 p-2 bg-gray-11 gray-0 border-1 radius-2">
	<div class="text-center h2">Svelte 5 Todo List</div>

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
				class="flex space-between gap-1 p-1 overlay-6 border-bottom-2"
				class:gray-6={todo.isDone}
				transition:slide
			>
				<input
					style="width: var(--size-1-5); accent-color: var(--lime-4)"
					type="checkbox"
					onchange={todos.toggleIsDone}
					data-index={i}
					checked={todo.isDone}
				/>
				<input
					class="full-width p-0-5 unset"
					type="text"
					oninput={todos.editTodo}
					data-index={i}
					value={todo.text}
				/>
				<button
					class="unset pointer h2 hover-red-4"
					onclick={todos.deleteTodo}
					data-index={i}>X</button
				>
			</li>
		{/each}
	</ul>

	<div class="text-center h4">{todos.remaining()} remaining</div>
</div>
