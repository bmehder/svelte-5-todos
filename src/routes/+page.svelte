<script>
	import Todos from '$lib/Todos.svelte'
	import OGTodos from '$lib/OGTodos.svelte'
</script>

<section>
	<div class="boxed py-2">
		<div class="auto-fill align-items-start gap-2" style="--min: 20rem;">
			<Todos name="List One Factory" saveAs="todo-list-1" />
			<Todos name="List Two Factory" saveAs="todo-list-2" />
			<OGTodos name="OG List One" saveAs="og-todos-1" />
			<OGTodos name="OG List Two" saveAs="og-todos-2" />
			<OGTodos name="OG List (No Save)" />
		</div>
	</div>
</section>

<section>
	<div class="boxed flow py-2" style="max-width: 65ch;">
		<h2>CSS - Shape Outside</h2>
		<div class="flow">
			<div class="shape" role="img"></div>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga corporis
				commodi eius? Alias cumque cupiditate, quisquam ipsa consectetur quis officia
				laborum error iure quam ipsum deserunt fugiat nesciunt suscipit ut earum
				quasi dolores neque quo commodi exercitationem, facere veniam velit. Adipisci
				quasi quod laborum magni, ut amet veritatis facere dolorum quae esse
				accusantium earum, reprehenderit cumque! Quis, in velit saepe explicabo enim,
				ut nulla incidunt pariatur reprehenderit maiores eius quas perferendis ab
				commodi vero? Provident sint, vero aliquid ex laboriosam rem molestias ullam
				dolorem necessitatibus fuga laborum commodi a, velit in aspernatur nostrum,
				blanditiis facere earum minima eveniet nobis? Veniam fugiat perferendis ipsa
				deserunt enim dolore facere similique, vitae dolorem saepe obcaecati quo
				dolores debitis, beatae nihil, officiis est. Temporibus sed magni facere qui
				laboriosam, esse magnam ad exercitationem fugiat quas. Similique delectus
				necessitatibus natus excepturi sit deserunt unde corporis a fuga, numquam ad,
				praesentium adipisci temporibus quia quod fugiat?
			</p>
		</div>
		<img class="shape-img" src="/woman.png" alt="woman holding laptop" />
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
			dignissimos, harum iure totam labore, neque libero error ut illum a.
		</p>
	</div>
</section>

<style>
	.shape {
		width: clamp(6rem, 40vw, 16rem);
		aspect-ratio: 1;
		float: left;
		margin-block: 0.5rem;
		margin-inline: 2rem;
		margin-inline-start: 0;
		background-image: url('https://plus.unsplash.com/premium_photo-1682096467444-8861e1dc3bc2');
		background-position: center;
		background-size: cover;
		shape-outside: circle(50%);
		border-radius: 50%;
	}

	.shape-img {
		float: right;
		width: 30vw;
		max-width: var(--sm);
		shape-outside: url(/woman.png);
		shape-margin: 1rem;
		margin-block-end: 1rem;
	}
</style>
