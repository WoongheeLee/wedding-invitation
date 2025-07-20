<script lang="ts">
	import Calendar from '../components/calendar.svelte';
	import Letter from '../components/letter.svelte';
	import Cover from '../components/cover.svelte';
	import Location from '../components/location.svelte';
	import Gallery from '../components/gallery.svelte';
	import Account from '../components/account.svelte';
	import type { PageProps } from './$types';
	import Signature from '../components/signature.svelte';

	let { form }: PageProps = $props();
</script>

<Cover />
<Letter />
<Gallery />
<Calendar />
<Location />
<Account />

<Signature />