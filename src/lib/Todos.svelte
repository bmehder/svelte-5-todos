<script>
	import { slide } from 'svelte/transition'
	import { preventDefault } from '$lib/utils.js'
	import Todos from '$lib/todos.svelte.js'

	const { name = 'Todo List', saveAs = null } = $props()

	const todos = Todos(saveAs)
</script>

<div class="bg-gray-11 gray-0 border-1 radius-2">
	<div class="grid gap-1-5 place-content-center p-2 text-center">
		<div class="h2">{name}</div>

		<form onsubmit={preventDefault(todos.add)}>
			<div class="flex">
				<input
					class="p-0-5 full-width"
					name="text"
					placeholder="Add new todo..."
					required
				/>
				<button class="bg-lime-4 hover-bg-gray-2 gray-12 h2">+</button>
			</div>
		</form>

		<menu class="flex flex-wrap gap-1">
			{#each todos.FILTERS as filter}
				<li>
					<button
						class="bg-lime-4 hover-bg-gray-2 gray-12 radius-1"
						class:bg-lime-6={todos.filterOption.value === filter}
						onclick={() => (todos.filterOption.value = filter)}>{filter}</button
					>
				</li>
			{/each}
		</menu>

		<ul>
			{#each todos.filterTodos(todos.filterOption.value) as todo, idx (todo)}
				<li
					class="flex space-between gap-1 px-1 py-0-5 overlay-6 border-bottom-2"
					class:gray-6={todo.isDone}
					transition:slide
				>
					<input
						style="width: var(--size-1-5); accent-color: var(--lime-4)"
						type="checkbox"
						onchange={() => todos.toggleIsDone(idx)}
						checked={todo.isDone}
					/>
					<input
						class="full-width p-0-5 unset text-left"
						type="text"
						oninput={evt => todos.edit(idx, evt.target.value)}
						value={todo.text}
					/>
					<button
						class="unset h2 lime-4 hover-red-4"
						onclick={() => todos.delete(idx)}>X</button
					>
				</li>
			{/each}
		</ul>

		{#if todos.filterOption.value === 'Completed'}
			<div class="h4">{todos.completed()} completed</div>
		{:else if todos.filterOption.value === 'Remaining'}
			<div class="h4">{todos.remaining()} remaining</div>
		{:else}
			<div class="h4">{todos.totalCount()} items</div>
		{/if}
	</div>
</div>
