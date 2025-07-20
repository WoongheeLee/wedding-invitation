<script lang="ts">
	import locationTopWave from '$lib/assets/location-top-wave.svg';
	import locationDeco from '$lib/assets/location-deco.svg';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard, Phone, Train, Bus } from '@lucide/svelte';
	import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
	import { onMount } from 'svelte';

	const venue = {
		lat: 35.208140,
		lng: 126.821766
	};

	let googleMapsUrl = $state('');
	
	onMount(() => {
		googleMapsUrl = `https://www.google.com/maps/embed/v1/view?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&center=${venue.lat},${venue.lng}&zoom=16&maptype=roadmap`;
	});

	function copyAddress() {
		navigator.clipboard
			.writeText($_('location.venue_address'))
			.then(() => alert($_('location.address_copied')))
			.catch(() => null);
	}

	function callVenue() {
		window.open(`tel:${$_('location.venue_phone')}`);
	}

	function openMap(url: string) {
		window.open(url, '_blank');
	}
</script>

<img src={locationTopWave} class="location-top-wave" alt="" />
<section class="location">
	<h2 class="title {localeStore.locale}">{$_('location.title')}</h2>
	<p class="venue en">{$_('location.venue_name')}</p>
	
	<!-- 연락처 -->
	<button class="phone-button" onclick={callVenue}>
		<Phone size="1em" />
		<span>{$_('location.venue_phone')}</span>
	</button>

	<!-- 주소 -->
	<button class="copy-address en" onclick={copyAddress}>
		<span class="clipboard-icon">
			<Clipboard size="1.1em" />
		</span>
		<span class="address">{$_('location.venue_address')}</span>
	</button>
	<p class="sub-address">{$_('location.venue_sub_address')}</p>

	<!-- 교통정보 -->
	<div class="transportation-info">
		<h3>{$_('location.directions_title')}</h3>
		
		<div class="transport-section">
			<div class="transport-header">
				<Train size="1.2em" />
				<span>{$_('location.ktx_title')}</span>
			</div>
			<div class="transport-details">
				<p><strong>{$_('location.ktx_station')}</strong></p>
				<p>{$_('location.ktx_bus_info')}</p>
				<p><span class="bus-number green">{$_('location.ktx_bus_route')}</span> - {$_('location.ktx_stop')}</p>
			</div>
		</div>

		<div class="transport-section">
			<div class="transport-header">
				<Bus size="1.2em" />
				<span>{$_('location.express_title')}</span>
			</div>
			<div class="transport-details">
				<p><strong>{$_('location.express_station')}</strong></p>
				<p>{$_('location.express_bus_info')}</p>
				<p><span class="bus-number yellow">{$_('location.express_bus_route')}</span> - {$_('location.express_stop')}</p>
			</div>
		</div>

		<div class="transport-section">
			<div class="transport-header">
				<Bus size="1.2em" />
				<span>{$_('location.other_bus_title')}</span>
			</div>
			<div class="transport-details">
				<p>
					<span class="bus-number yellow">{$_('location.other_bus_routes')}</span> - {$_('location.other_bus_stop')}
				</p>
			</div>
		</div>
	</div>

	<div class="map">
		{#if googleMapsUrl}
			<iframe
				class="google-maps"
				title={$_('location.venue_name')}
				referrerpolicy="no-referrer-when-downgrade"
				loading="lazy"
				src={googleMapsUrl}>
			</iframe>
		{/if}
	</div>
	
	<div class="map-links">
		<h3>{$_('location.map_links_title')}</h3>
		<div class="map-buttons">
			<button class="map-button naver" onclick={() => openMap(`https://map.naver.com/v5/search/광주광역시 광산구 임방울대로 549`)}>
				<span class="map-icon">N</span>
				<span>{$_('location.naver_map')}</span>
			</button>
			<button class="map-button kakao" onclick={() => openMap(`https://map.kakao.com/link/search/광주광역시 광산구 임방울대로 549`)}>
				<span class="map-icon">K</span>
				<span>{$_('location.kakao_map')}</span>
			</button>
		</div>
	</div>
	
	<img class="location-deco" src={locationDeco} alt="" />
</section>

<style lang="scss">
	img.location-top-wave {
		max-width: $content-max-width;
		margin: auto;
	}

	section.location {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $bg-color-1;
		padding: 1em 2em 1em 2em;
	}

	h2.title {
		color: $primary-color;
		text-align: center;
		margin-bottom: 1em;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}

		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}
	}

	p.venue {
		&.en {
			font-size: 1.1rem;
		}
	}

	.phone-button {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-top: 0.5em;
		padding: 0.5em 1em;
		background: #f8f9fa;
		border: 1px solid #dee2e6;
		border-radius: 6px;
		color: $font-color-default;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			background: #e9ecef;
			transform: translateY(-1px);
		}
	}

	button.copy-address {
		display: flex;
		align-items: center;
		margin-top: 0.5em;

		.clipboard-icon {
			height: 1em;
			display: inline-block;
			margin-right: 0.2em;
			color: $font-color-default;
		}

		.address {
			display: inline-block;
			font-size: 1.2rem;
			text-decoration: underline;
		}
	}

	.sub-address {
		font-size: 0.9rem;
		color: #666;
		margin-top: 0.2em;
	}

	.transportation-info {
		width: 100%;
		max-width: 500px;
		margin: 2em 0;
		background: white;
		border-radius: 12px;
		padding: 1.5em;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

		h3 {
			text-align: center;
			margin-bottom: 1.5em;
			color: $primary-color;
			font-size: 1.2rem;
		}

		.transport-section {
			margin-bottom: 1.5em;
			
			&:last-child {
				margin-bottom: 0;
			}

			.transport-header {
				display: flex;
				align-items: center;
				gap: 0.5em;
				margin-bottom: 0.8em;
				font-weight: bold;
				color: $primary-color;
			}

			.transport-details {
				margin-left: 1.7em;
				line-height: 1.5;

				p {
					margin: 0.3em 0;
					font-size: 0.9rem;
				}

				.bus-number {
					padding: 0.2em 0.5em;
					border-radius: 4px;
					font-size: 0.8rem;
					font-weight: bold;
					margin-right: 0.3em;
					
					&.green {
						background: #a8d5ba;
						color: #2d5a3d;
					}
					
					&.yellow {
						background: #f9e79f;
						color: #8b6f13;
					}
				}
			}
		}
	}

	.map {
		margin-top: 2em;
		width: 100%;
		height: 20em;
		margin-bottom: 2em;
	}

	iframe.google-maps {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		pointer-events: none;
	}


	img.location-deco {
		position: absolute;
		bottom: 2.5em;
		right: 1.5em;
	}

	// 반응형 조정
	@media (max-width: 768px) {
		.transportation-info {
			margin: 1.5em 0;
			padding: 1em;

			.transport-details {
				margin-left: 1.2em;
				
				p {
					font-size: 0.85rem;
				}
			}
		}
	}

	.map-links {
		width: 100%;
		max-width: 500px;
		margin-bottom: 5em;
		text-align: center;

		h3 {
			margin-bottom: 1em;
			color: $primary-color;
			font-size: 1.1rem;
		}

		.map-buttons {
			display: flex;
			justify-content: center;
			gap: 1em;
			flex-wrap: wrap;

			.map-button {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 0.1em;
				padding: 0.5em 1em;
				border: 1px solid #dee2e6;
				border-radius: 8px;
				background: white;
				cursor: pointer;
				transition: all 0.2s ease;
				text-decoration: none;
				width: 100px;
				flex-shrink: 0;

				.map-icon {
					font-size: 1em;
					font-weight: bold;
					width: 24px;
					height: 24px;
					border-radius: 25%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: white;
				}

				span:last-child {
					font-size: 0.85rem;
					color: #666;
					font-weight: 500;
				}

				&:hover {
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
					border-color: #ccc;
				}

				&.naver {
					.map-icon {
						background: #03c75a;
					}
					&:hover {
						border-color: #03c75a;
						span:last-child {
							color: #03c75a;
						}
					}
				}

				&.kakao {
					.map-icon {
						background: #fee500;
						color: #3c1e1e;
					}
					&:hover {
						border-color: #fee500;
						span:last-child {
							color: #d4a800;
						}
					}
				}
			}
		}
	}

	@media (max-width: 768px) {
		.map-links {
			.map-buttons {
				gap: 1em;
				justify-content: center;
				
				.map-button {
					padding: 0.6em 1.2em;
					min-width: 100px;
					
					span:last-child {
						font-size: 0.8rem;
					}
				}
			}
		}
	}
</style>