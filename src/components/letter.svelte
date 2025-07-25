<script lang="ts">
	import letterBottom from '$lib/assets/letter-bottom.webp';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import letterDeco from '$lib/assets/letter-deco.svg';

	const nameDivider = `
    <svg width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#B99493"/>
    </svg>`;
</script>

<section class="letter">
	<div class="header">
		<img class="header-deco" src={letterDeco} alt="letter header deco" />
		<h2 class="title {localeStore.locale}">{$_('letter.date')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('letter.sub_title')}</p>
	</div>

	<div class="letter-container">
		<p class="letter {localeStore.locale}">{$_('letter.letter_content')}</p>

		{#if localeStore.isEn}
			<div class="letter-signature">
				<p class="en">with love</p>
				<p class="en">{$_('letter.groom_name')} & {$_('letter.bride_name')}</p>
			</div>
		{:else}
			<div class="family-description kr">
				<p>
					이송환<span class="name-divider">{@html nameDivider}</span> 박숙영
					<span class="son">{$_('letter.son_of')}</span>웅희
				</p>
				<p>
					일함 아슬라노프<span class="name-divider">{@html nameDivider}</span> 파티마 아슬라노바<span class="daughter"
						>의 딸</span
					>타흐미나
				</p>			</div>
		{/if}
	</div>
</section>

<img class="letter-bottom" src={letterBottom} alt="letter bottom" />

<style lang="scss">
	.letter-bottom {
		display: block;
		margin: 0 auto;
		width: 70%;
		height: auto;
		max-width: 400px;
		padding-bottom: 1em;
		
		@media (min-width: 768px) {
			width: 50%;
			max-width: 350px;
		}
	}

	section.letter {
		padding: 4.5em 3.5em 3em 3.5em;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-bottom: 2em;
	}

	img.header-deco {
		width: 12em;
		margin-bottom: 0.8em;
	}

	.title {
		color: $primary-color;
		letter-spacing: 1px;

		&.kr {
			@extend .title-font-kr;
			margin-bottom: 0.4em;
		}

		&.en {
			@extend .title-font-en;
			margin-bottom: 0.2em;
		}
	}

	.sub-title {
		color: $primary-color;
		&.kr {
			font-weight: 500;
			font-size: 1rem;
		}

		&.en {
			font-size: 1.3rem;
			font-weight: 600;
		}
	}

	p.letter {
		text-align: center;
		&.kr {
			line-height: 2.3em;
			font-size: 0.9rem;
		}
		&.en {
			line-height: 1.8em;
			font-size: 1.1rem;
			font-family: 'Georgia', 'Times New Roman', serif;
			font-weight: 400;
		}
	}

	.letter-signature {
		margin-top: 2em;

		p {
			text-align: right;
			font-size: 1.2rem;
		}
	}

	.family-description {
		margin-top: 2em;
		p {
			color: $font-color-default;
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			column-gap: 12px;
			margin-bottom: 20px;
			align-items: center;

			.name-divider {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.son,
			.daughter {
				display: flex;
				justify-content: center;
				font-size: 12px;
				color: $primary-color;
				white-space: nowrap; // 줄바꿈 방지
			}
		}
		
		// 모바일에서 간격 조정
		@media (max-width: 480px) {
			p {
				column-gap: 8px; // 간격을 약간만 줄임
				
				.son,
				.daughter {
					font-size: 11px; // "의 딸" 텍스트를 약간만 줄임
				}
			}
		}
	}
</style>