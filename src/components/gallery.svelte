<script lang="ts">
	import photo1 from '$lib/assets/gallery/01_ YONG-141-.jpg';
	import photo2 from '$lib/assets/gallery/02_ YONG-26-.jpg';
	import photo3 from '$lib/assets/gallery/03_ YONG-68-.jpg';
	import photo4 from '$lib/assets/gallery/04_ YONG-837-.jpg';
	import photo5 from '$lib/assets/gallery/05_ YONG-852-.jpg';
	import photo6 from '$lib/assets/gallery/06_ YONG-886-.jpg';
	import photo7 from '$lib/assets/gallery/07_ YONG-904-.jpg';
	import photo8 from '$lib/assets/gallery/08_09_ YONG-929-.jpg';
	import photo10 from '$lib/assets/gallery/10_ YONG-1000-.jpg';
	import photo11 from '$lib/assets/gallery/11_ YONG-973-.jpg';
	import photo12 from '$lib/assets/gallery/12_ YONG-505-.jpg';
	import photo13 from '$lib/assets/gallery/13_ YONG-556-.jpg';
	import photo14 from '$lib/assets/gallery/14_15_ YONG-435-.jpg';
	import photo16 from '$lib/assets/gallery/16_ YONG-396-.jpg';
	import photo17 from '$lib/assets/gallery/17_ YONG-572-.jpg';
	import photo18 from '$lib/assets/gallery/18_ YONG-709-.jpg';
	import photo19 from '$lib/assets/gallery/19_ YONG-735-.jpg';
	import photo20 from '$lib/assets/gallery/20_ YONG-783-.jpg';
	import photo21 from '$lib/assets/gallery/21_ YONG-798-.jpg';
	import photo22 from '$lib/assets/gallery/22_ YONG-180-.jpg';


	import PhotoSwipeLightBox from 'photoswipe/lightbox';
	import PhotoSwipe from 'photoswipe';
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { localeStore } from '../i18n.svelte';
	import { _ } from 'svelte-i18n';

	// Enhanced shuffle with selective full-width for both landscape and portrait
	function shuffleWithConstraints(photos: any[]): any[] {
		const landscapePhotos = photos.filter(photo => photo.width > photo.height);
		const portraitPhotos = photos.filter(photo => photo.width <= photo.height);
		
		console.log(`총 ${photos.length}개 사진: 가로 ${landscapePhotos.length}개, 세로 ${portraitPhotos.length}개`);
		
		// Shuffle both arrays
		const shuffledLandscape = [...landscapePhotos].sort(() => Math.random() - 0.5);
		const shuffledPortrait = [...portraitPhotos].sort(() => Math.random() - 0.5);
		
		// Calculate optimal full-width distribution for perfect layout
		const totalPhotos = photos.length;
		// 각 풀위드 사진은 2칸, 일반 사진은 1칸씩 차지
		// 총 사진수가 홀수면 1개의 풀위드 필요, 짝수면 0개 또는 2개, 4개... 가능
		
		// 여백 없는 완벽한 레이아웃을 위한 풀위드 개수 계산
		let optimalFullWidthCount;
		if (totalPhotos % 2 === 1) {
			// 홀수개: 1개 풀위드 필요 (예: 21개 → 1개 풀위드 + 20개 일반 = 22칸)
			optimalFullWidthCount = 1;
		} else {
			// 짝수개: 0, 2, 4개 등 가능 (랜덤 선택)
			const possibleCounts = [];
			for (let i = 0; i <= totalPhotos / 2; i += 2) {
				if (totalPhotos - i >= 0) possibleCounts.push(i);
			}
			optimalFullWidthCount = possibleCounts[Math.floor(Math.random() * possibleCounts.length)];
		}
		
		console.log(`최적 풀위드 개수: ${optimalFullWidthCount}`);
		
		// 가로와 세로 사진에서 가중치를 두고 풀위드 선택
		// 가로 사진에 더 높은 확률, 세로 사진에 낮은 확률 부여
		const weightedPhotosForFullWidth = [
			...shuffledLandscape.map(photo => ({ ...photo, weight: 3 })), // 가로 사진 3배 가중치
			...shuffledPortrait.map(photo => ({ ...photo, weight: 1 }))   // 세로 사진 1배 가중치
		];
		
		// 가중치 기반 랜덤 선택
		const selectedFullWidth = [];
		const availablePhotos = [...weightedPhotosForFullWidth];
		
		for (let i = 0; i < optimalFullWidthCount && availablePhotos.length > 0; i++) {
			// 총 가중치 계산
			const totalWeight = availablePhotos.reduce((sum, photo) => sum + photo.weight, 0);
			let random = Math.random() * totalWeight;
			
			// 가중치 기반 선택
			for (let j = 0; j < availablePhotos.length; j++) {
				random -= availablePhotos[j].weight;
				if (random <= 0) {
					selectedFullWidth.push(availablePhotos[j]);
					availablePhotos.splice(j, 1);
					break;
				}
			}
		}
		
		const fullWidthPhotos = selectedFullWidth;
		const regularPhotos = weightedPhotosForFullWidth.filter(photo => 
			!fullWidthPhotos.includes(photo)
		);
		
		console.log(`풀위드 선택: ${fullWidthPhotos.length}개, 일반: ${regularPhotos.length}개`);
		
		// Group regular photos by exact height for strict matching
		const heightGroups: { [key: number]: any[] } = {};
		regularPhotos.forEach(photo => {
			const height = photo.height; // Use exact height instead of ranges
			if (!heightGroups[height]) heightGroups[height] = [];
			heightGroups[height].push(photo);
		});
		
		// Create pairs only from photos with identical heights
		const photoPairs: any[][] = [];
		const singlePhotos: any[] = [];
		
		Object.values(heightGroups).forEach((group: any[]) => {
			// Shuffle within group
			group.sort(() => Math.random() - 0.5);
			
			// Only pair if we have at least 2 photos with same height
			if (group.length >= 2) {
				// Create pairs from photos with identical height
				for (let i = 0; i < group.length - 1; i += 2) {
					photoPairs.push([group[i], group[i + 1]]);
				}
				// Add remaining single photo if odd number
				if (group.length % 2 === 1) {
					singlePhotos.push(group[group.length - 1]);
				}
			} else {
				// Single photo with unique height
				singlePhotos.push(group[0]);
			}
		});
		
		console.log(`페어: ${photoPairs.length}쌍, 싱글: ${singlePhotos.length}개`);
		
		// Create row structure
		const rows: { type: string; photos: any[] }[] = [];
		
		// Add full-width photos (both landscape and portrait) as individual rows
		fullWidthPhotos.forEach(photo => {
			rows.push({ type: 'full-width', photos: [photo] });
		});
		
		// Add photo pairs as regular rows (only same height photos)
		photoPairs.forEach(pair => {
			rows.push({ type: 'pair', photos: pair });
		});
		
		// Add single photos as individual rows
		singlePhotos.forEach(photo => {
			rows.push({ type: 'single', photos: [photo] });
		});
		
		// Shuffle all rows
		rows.sort(() => Math.random() - 0.5);
		
		// Flatten into final result and mark full-width photos
		const result: any[] = [];
		rows.forEach(row => {
			row.photos.forEach((photo: any) => {
				if (row.type === 'full-width') {
					photo.isFullWidth = true;
				}
				result.push(photo);
			});
		});
		
		return result;
	}

const originalPhotos = [
	{
		src: photo1,
		width: 1200,
		height: 1800
	},
	{
		src: photo2,
		width: 1200,
		height: 1800
	},
	{
		src: photo3,
		width: 1200,
		height: 1800
	},
	{
		src: photo4,
		width: 1200,
		height: 1800
	},
	{
		src: photo5,
		width: 1200,
		height: 1800
	},
	{
		src: photo6, // 05_ - 가로 긴 사진
		width: 1800,
		height: 1200
	}, 
	{
		src: photo7,
		width: 1200,
		height: 1800
	},
	{
		src: photo8,
		width: 1800,
		height: 1200
	},
	{
		src: photo10,
		width: 1800,
		height: 1200
	},
	{
		src: photo11,
		width: 1200,
		height: 1800
	},
	{
		src: photo12,
		width: 1200,
		height: 1800
	},
	{
		src: photo13,
		width: 1200,
		height: 1800
	},
	{
		src: photo14, // 14_15_ - 가로 긴 사진
	width: 1800,
		height: 1200
		},
	{
		src: photo16,
		width: 1200,
		height: 1800
	},
	{
		src: photo17,
		width: 1200,
		height: 1800
	},
	{
		src: photo18,
		width: 1200,
		height: 1800
	},
	{
		src: photo19,
		width: 1800,
		height: 1200
	},
	{
		src: photo20,
		width: 1200,
		height: 1800
	},
	{
		src: photo21,
		width: 1200,
		height: 1800
	},
	{
		src: photo22,
		width: 1200,
		height: 1800
	}
];

// Photos will be shuffled in onMount to avoid hydration mismatch
let photos = originalPhotos;

onMount(() => {
	// 클라이언트에서만 셔플 적용 (하이드레이션 후)
	photos = shuffleWithConstraints(originalPhotos);
	
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
		<p class="sub-title {localeStore.locale}">{$_('gallery.sub_title')}</p>
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
		grid-column: span 2; // 선택된 사진만 두 칼럼에 걸쳐 표시
	}
	
	img.thumbnail {
		width: 100%;
		height: auto;
		border-radius: 4px;
		object-fit: cover;
	}
}
</style>
