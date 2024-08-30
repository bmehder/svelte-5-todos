<script>
	import Todos from '$lib/Todos.svelte'
</script>

<Todos />

<section>
	<div class="boxed flow py-2">
		<h2>CSS - Shape Outside</h2>
		<img src="/woman.png" alt="woman holding laptop" />
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
		shape-margin: 1rem;
	}
</style>
