<script lang="ts">
	import '/src/styles/global.scss';
	import '/src/i18n.svelte.ts';
	import { localeStore } from '../i18n.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';

	let { children, data } = $props();

	let localeLoaded = $derived(!localeStore.isLoading && localeStore.locale);
	let title = $derived(localeLoaded ? $_('meta.title') : 'Loading...');
	
	onMount(() => {
		document.body.classList.add('loaded');
	});
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Noto+Serif+KR:wght@200..900&family=Sacramento&display=swap"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
	/>
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={data?.meta?.url || 'https://wedding.woongheelee.com/'} />
	<meta property="og:title" content={data?.meta?.title || title} />
	<meta property="og:description" content={data?.meta?.description || 'Please join us on our most special day!'} />
	<meta property="og:image" content={data?.meta?.ogImage || 'https://wedding.woongheelee.com/preview.jpg'} />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={data?.meta?.url || 'https://wedding.woongheelee.com/'} />
	<meta property="twitter:title" content={data?.meta?.title || title} />
	<meta property="twitter:description" content={data?.meta?.description || 'Please join us on our most special day!'} />
	<meta property="twitter:image" content={data?.meta?.ogImage || 'https://wedding.woongheelee.com/preview.jpg'} />
</svelte:head>

{#if localeLoaded}
	{@render children()}
{/if}

<style lang="scss">
</style>
