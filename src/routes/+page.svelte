<script>
	import { slide } from 'svelte/transition'

	const FILTERS = ['All', 'Completed', 'Remaining']

	// State Mutations
	const filterTodos = option =>
		new Map([
			['All', todos],
			['Completed', todos.filter(({ isDone }) => !!isDone)],
			['Remaining', todos.filter(({ isDone }) => !isDone)],
		]).get(option)

	const setFilter = option => {
		filter = option
	}

	const addTodo = evt => {
		if (evt.key !== 'Enter') return

		const todoEl = evt.target
		const text = todoEl.value

		todos.push({ text, isDone: false })
		todoEl.value = ''
	}

	const editTodo = evt => {
		const inputEl = evt.target
		const index = +inputEl.dataset.index

		todos[index].text = inputEl.value
	}

	const deleteTodo = evt => {
		if (confirm('Are you sure you want to delete this todo?')) {
			const inputEl = evt.target
			const index = +inputEl.dataset.index

			todos = todos.filter((_, i) => i !== index)
		}
	}

	const toggleIsDone = evt => {
		const inputEl = evt.target
		const index = +inputEl.dataset.index

		todos[index].isDone = !todos[index].isDone
	}

	// State
	let todos = $state([])

	let filter = $state('All')

	const remaining = $derived(todos.filter(({ isDone }) => !isDone).length)

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
		{#each FILTERS as option}
			<button
				class="bg-lime-4 gray-12 radius-1"
				class:bg-lime-6={filter === option}
				onclick={() => setFilter(option)}>{option}</button
			>
		{/each}
	</div>

	<ul>
		{#each filteredTodos as todo, i (todo)}
			<li
				class="flex space-between gap-1 p-1 overlay-6 border-bottom-2"
				class:gray-6={todo.isDone}
				transition:slide
			>
				<input
					style="width: var(--size-1-5); accent-color: var(--lime-4)"
					type="checkbox"
					onchange={toggleIsDone}
					data-index={i}
					checked={todo.isDone}
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

<section>
	<div class="boxed flow py-2">
		<h2>CSS - Shape Outside</h2>
		<img src="/woman.png" alt="" />
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia qui fuga sint
			rerum iure molestiae cumque perferendis, quam dolor omnis ab! Commodi, et, quas
			nisi consequuntur aperiam ex aut hic odit obcaecati delectus quo voluptatum,
			amet vero vitae nobis minus in eveniet ipsum ratione rem pariatur soluta!
			Maiores nesciunt magni ullam assumenda ipsa, quas earum? Illo exercitationem
			distinctio cumque commodi nemo in quia omnis consequatur sed aliquam dolor
			repellendus sapiente culpa hic ut quae doloribus perspiciatis quaerat
			temporibus, numquam excepturi. Nam voluptate earum soluta sed itaque veniam
			provident illo repellendus inventore dicta esse asperiores delectus quisquam
			fugiat ipsam incidunt accusamus eveniet quasi, quas quis quod aspernatur ipsa,
			tempore fuga. Sequi, magnam, hic animi dolore eligendi natus quas cupiditate
			nam quasi dolor vero minus minima ratione. Repellendus modi pariatur,
			dignissimos, harum iure totam labore, neque libero error ut illum a. Delectus
			sed ducimus, facere asperiores fuga modi nulla velit distinctio repellat
			possimus error saepe repellendus aut odio veniam quibusdam nihil quo quasi
			aliquid consequuntur. Minima assumenda quam, sunt commodi quae, ea voluptas
			minus aperiam id delectus blanditiis repellat a dolor doloremque dicta
			consectetur explicabo unde mollitia facilis! Iusto voluptatem adipisci mollitia
			blanditiis similique distinctio. Tempore maiores neque, accusantium molestias
			enim reprehenderit.
		</p>
	</div>
</section>

<style>
	img {
		float: right;
		width: 50vw;
		max-width: 400px;
		shape-outside: url(/woman.png);
		shape-margin: 2rem;
	}
</style>
