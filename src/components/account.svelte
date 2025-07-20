<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard, CreditCard, ChevronDown, ChevronUp } from '@lucide/svelte';

	let isExpanded = $state(false);

	function copyAccount(account: string, titleKey: string) {
		const numbersOnly = account.replace(/[^0-9]/g, '');
		navigator.clipboard
			.writeText(numbersOnly)
			.then(() => alert($_(titleKey) + $_('account.account_copied')))
			.catch(() => null);
	}

	function toggleExpanded() {
		isExpanded = !isExpanded;
	}
</script>

<section class="account">
	<h2 class="title {localeStore.locale}">{$_('account.title')}</h2>

	<!-- 계좌정보 박스 -->
	<div class="account-info">
		<button class="account-toggle" onclick={toggleExpanded}>
			<h3>계좌번호</h3>
			{#if isExpanded}
				<ChevronUp size="1.2em" />
			{:else}
				<ChevronDown size="1.2em" />
			{/if}
		</button>
		
		{#if isExpanded}
			<div class="account-content">
				<div class="account-section">
					<div class="account-header">
						<CreditCard size="1.2em" />
						<span>{$_('account.groom_title')}</span>
					</div>
					<div class="account-details">
						<p><strong>{$_('account.groom_bank')}</strong></p>
						<div class="account-number-row">
							<p class="account-number-display">{$_('account.groom_account')}</p>
							<button 
								class="copy-account-button" 
								onclick={() => copyAccount($_('account.groom_account'), 'account.groom_title')}
							>
								<Clipboard size="0.9em" />
								<span>Copy</span>
							</button>
						</div>
					</div>
				</div>

				<div class="account-section">
					<div class="account-header">
						<CreditCard size="1.2em" />
						<span>{$_('account.bride_title')}</span>
					</div>
					<div class="account-details">
						<p><strong>{$_('account.bride_bank')}</strong></p>
						<div class="account-number-row">
							<p class="account-number-display">{$_('account.bride_account')}</p>
							<button 
								class="copy-account-button" 
								onclick={() => copyAccount($_('account.bride_account'), 'account.bride_title')}
							>
								<Clipboard size="0.9em" />
								<span>Copy</span>
							</button>
						</div>
					</div>
				</div>

				<div class="account-section">
					<div class="account-header">
						<CreditCard size="1.2em" />
						<span>{$_('account.father_title')}</span>
					</div>
					<div class="account-details">
						<p><strong>{$_('account.father_bank')}</strong></p>
						<div class="account-number-row">
							<p class="account-number-display">{$_('account.father_account')}</p>
							<button 
								class="copy-account-button" 
								onclick={() => copyAccount($_('account.father_account'), 'account.father_title')}
							>
								<Clipboard size="0.9em" />
								<span>Copy</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>

</section>

<style lang="scss">
	section.account {
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

	.sub-title {
		font-size: 0.9rem;
		color: #666;
		margin-bottom: 2em;
		text-align: center;
	}

	.account-info {
		width: 100%;
		max-width: 500px;
		margin: 2em 0;
		background: white;
		border-radius: 12px;
		padding: 1.5em;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.account-toggle {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: all 0.2s ease;

		&:hover {
			color: darken($primary-color, 10%);
		}

		h3 {
			text-align: center;
			margin: 0;
			color: $primary-color;
			font-size: 1.2rem;
			flex: 1;
		}
	}

	.account-content {
		margin-top: 1.5em;
		animation: slideDown 0.3s ease-out;
	}

	.account-section {
		margin-bottom: 1.5em;
		
		&:last-child {
			margin-bottom: 0;
		}

		.account-header {
			display: flex;
			align-items: center;
			gap: 0.5em;
			margin-bottom: 0.8em;
			font-weight: bold;
			color: $primary-color;
		}

		.account-details {
			margin-left: 1.7em;
			line-height: 1.5;

			p {
				margin: 0.3em 0;
				font-size: 0.9rem;
			}

			.account-number-row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 0.5em;
			}

			.account-number-display {
				font-family: 'Courier New', monospace;
				font-weight: bold;
				color: #333;
				letter-spacing: 1px;
				margin: 0;
				flex: 1;
			}

			.copy-account-button {
				background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
				color: white;
				padding: 0.4em 0.8em;
				border-radius: 8px;
				font-size: 0.8rem;
				font-weight: bold;
				border: none;
				cursor: pointer;
				display: inline-flex;
				align-items: center;
				gap: 0.3em;
				transition: all 0.2s ease;
				box-shadow: 0 2px 6px rgba(255, 107, 107, 0.2);
				margin-left: 1em;

				&:hover {
					transform: scale(1.05);
					box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
				}
			}
		}
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	// 반응형 조정
	@media (max-width: 768px) {
		.account-info {
			margin: 1.5em 0;
			padding: 1em;

			.account-details {
				margin-left: 1.2em;
				
				p {
					font-size: 0.85rem;
				}
			}
		}
	}
</style>