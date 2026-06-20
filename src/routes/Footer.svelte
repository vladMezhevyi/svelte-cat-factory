<script lang="ts">
	import {
		PUBLIC_API_URL,
		PUBLIC_GITHUB_PROFILE_URL,
		PUBLIC_OWNER_NAME,
		PUBLIC_API_NAME
	} from '$env/static/public';

	const rel = 'external noopener noreferrer';
</script>

<footer class="footer">
	<p>
		Made by
		<a href={PUBLIC_GITHUB_PROFILE_URL} target="_blank" {rel}>{PUBLIC_OWNER_NAME}</a>
	</p>

	<span class="separator">&middot;</span>

	<p>
		Cat magic by
		<a href={PUBLIC_API_URL} target="_blank" {rel}>{PUBLIC_API_NAME}</a>
	</p>
</footer>

<style>
	.footer {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background-color: darkslategray;
	}

	.footer > p {
		color: #fff;
	}

	.footer a {
		color: darkturquoise;
	}

	.footer a:hover {
		text-decoration: none;
	}

	.separator {
		font-size: 18px;
		font-weight: 700;
		color: #fff;
	}

	@media (max-width: 768px) {
		.footer {
			padding: 0.5rem;
		}
	}
</style>
