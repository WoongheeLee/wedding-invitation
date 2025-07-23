<script lang="ts">
	import photo1 from '$lib/assets/gallery/01_ YONG-141-.webp';
	import photo2 from '$lib/assets/gallery/02_ YONG-26-.webp';
	import photo3 from '$lib/assets/gallery/03_ YONG-68-.webp';
	import photo4 from '$lib/assets/gallery/04_ YONG-837-.webp';
	import photo5 from '$lib/assets/gallery/05_ YONG-852-.webp';
	import photo6 from '$lib/assets/gallery/06_ YONG-886-.webp';
	import photo7 from '$lib/assets/gallery/07_ YONG-904-.webp';
	import photo8 from '$lib/assets/gallery/08_09_ YONG-929-.webp';
	import photo10 from '$lib/assets/gallery/10_ YONG-1000-.webp';
	import photo11 from '$lib/assets/gallery/11_ YONG-973-.webp';
	import photo12 from '$lib/assets/gallery/12_ YONG-505-.webp';
	import photo13 from '$lib/assets/gallery/13_ YONG-556-.webp';
	import photo14 from '$lib/assets/gallery/14_15_ YONG-435-.webp';
	import photo16 from '$lib/assets/gallery/16_ YONG-396-.webp';
	import photo17 from '$lib/assets/gallery/17_ YONG-572-.webp';
	import photo18 from '$lib/assets/gallery/18_ YONG-709-.webp';
	import photo19 from '$lib/assets/gallery/19_ YONG-735-.webp';
	import photo20 from '$lib/assets/gallery/20_ YONG-783-.webp';
	import photo21 from '$lib/assets/gallery/21_ YONG-798-.webp';
	import photo22 from '$lib/assets/gallery/22_ YONG-180-.webp';

	import PhotoSwipeLightBox from 'photoswipe/lightbox';
	import PhotoSwipe from 'photoswipe';
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import { localeStore } from '../i18n.svelte';
	import { _ } from 'svelte-i18n';

	// 앨범 페이지 순서대로 정렬된 사진들 (파일명 숫자 순서 = 앨범 페이지 순서)
	const originalPhotos = [
		{
			src: photo1,
			width: 1200,
			height: 1800,
			isFullWidth: true
		},
		{
			src: photo2,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		{
			src: photo3,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		// {
		// 	src: photo4,
		// 	width: 1200,
		// 	height: 1800,
		// 	isFullWidth: false
		// },
		{
			src: photo5,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		{
			src: photo7,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		{
			src: photo6,
			width: 1800,
			height: 1200,
			isFullWidth: true
		}, 
		{
			src: photo8, // 08_09_ - 가로 사진 (2페이지 차지)
			width: 1800,
			height: 1200,
			isFullWidth: true
		},
		{
			src: photo10,
			width: 1800,
			height: 1200,
			isFullWidth: true
		},
		{
			src: photo11,
			width: 1200,
			height: 1800,
			isFullWidth: true
		},
		{
			src: photo12,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		{
			src: photo13,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		{
			src: photo14, // 14_15_ - 가로 사진 (2페이지 차지)
			width: 1800,
			height: 1200,
			isFullWidth: true
		},
		{
			src: photo16,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		// {
		// 	src: photo17,
		// 	width: 1200,
		// 	height: 1800,
		// 	isFullWidth: false
		// },
		{
			src: photo18,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		{
			src: photo19,
			width: 1800,
			height: 1200,
			isFullWidth: true
		},
		{
			src: photo20,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		{
			src: photo21,
			width: 1200,
			height: 1800,
			isFullWidth: false
		},
		{
			src: photo22,
			width: 1200,
			height: 1800,
			isFullWidth: true
		}
	];

	// 앨범 순서 그대로 사용 (랜덤 셔플 제거)
	let photos = originalPhotos;

	onMount(() => {
		const lightbox = new PhotoSwipeLightBox({
			gallery: '#gallery',
			children: 'a',
			showHideAnimationType: 'fade',
			pswpModule: PhotoSwipe
		});

		lightbox.init();
	});
</script>

<section class="gallery">
	<div class="header">
		<h2 class="title {localeStore.locale}">{$_('gallery.title')}</h2>
		<p class="sub-title {localeStore.locale}">
			{#if localeStore.locale === 'kr'}
				사진을 클릭하면 크게 볼 수 있습니다 📸
			{:else}
				Tap any photo to view it larger 📸
			{/if}
		</p>
	</div>
	<div id="gallery">
		{#each photos as photo}
			<a
				href={photo.src}
				class="slide"
				class:full-width={photo.isFullWidth}
				data-pswp-width={photo.width}
				data-pswp-height={photo.height}
				target="_blank"
			>
				<img class="thumbnail" src={photo.src} alt="" />
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
	section.gallery {
		padding: 4.5em 2em 2em 2em;
		background-color: $white;
	}

	.header {
		margin-bottom: 2em;
	}

	h2.title {
		text-align: center;
		color: $primary-color;
		
		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}
	}

	p.sub-title {
		text-align: center;
		&.kr {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}

		&.en {
			margin-top: 0.5em;
			font-size: 1.2rem;
		}
	}

	#gallery {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5em;
		align-items: start;
	}

	.slide {
		display: block;
		width: 100%;
		margin-bottom: 0.1em;
		
		&.full-width {
			grid-column: span 2; // 가로 사진(14_15 등)은 두 칼럼 차지
		}
		
		img.thumbnail {
			width: 100%;
			height: auto;
			border-radius: 4px;
			object-fit: cover;
		}
	}
</style>