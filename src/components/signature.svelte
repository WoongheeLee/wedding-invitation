<script lang="ts">
	import { Github } from '@lucide/svelte';
	import locationDeco from '$lib/assets/location-deco.svg';
</script>

<div class="signature-container">
	<p class="signature en">Customized with ♡ by Woonghee Lee & Tahmina Aslanova</p>
	<a class="github-icon" href="https://github.com/anthopark/our-wedding-invitation" target="_blank" title="View original template by Emily & Anthony">
		<Github size="1.1em" strokeWidth={1} />
	</a>
	<img class="location-deco" src={locationDeco} alt="" />
</div>

<style lang="scss">
	.signature-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2em;
	}

	p.signature {
		font-size: 1rem;
		margin: 0;
	}
	
	.github-icon {
		margin-top: 0.2em;
		color: $font-color-default;
		cursor: pointer;
	}

	img.location-deco {
		position: absolute;
		bottom: -2.5em;
		right: -1.5em;
	}
</style>