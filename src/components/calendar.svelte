<script lang="ts">
	import calendarDeco from '$lib/assets/calendar-deco.svg';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';

	// 2025년 9월 캘린더 데이터
	const year = 2025;
	const month = 9; // 9월
	const weddingDay = 13; // 결혼식 날짜 (토요일)

	// 요일 이름 (월요일 시작)
	const weekdays = ['월', '화', '수', '목', '금', '토', '일'];
	const weekdaysEn = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

	// 달력 생성 함수 (월요일 시작)
	function generateCalendar(year: number, month: number) {
		const firstDay = new Date(year, month - 1, 1);
		const lastDay = new Date(year, month, 0);
		let startDate = firstDay.getDay(); // 첫 번째 날의 요일 (0=일요일)
		
		// 월요일 시작으로 변환 (일요일을 6으로, 월요일을 0으로)
		startDate = startDate === 0 ? 6 : startDate - 1;
		const daysInMonth = lastDay.getDate();
		
		const calendar = [];
		let week = [];
		
		// 첫 주의 빈 칸 채우기
		for (let i = 0; i < startDate; i++) {
			week.push({ day: null, dayOfWeek: i });
		}
		
		// 날짜 채우기
		for (let day = 1; day <= daysInMonth; day++) {
			const originalDayOfWeek = new Date(year, month - 1, day).getDay();
			// 월요일 시작으로 변환
			const dayOfWeek = originalDayOfWeek === 0 ? 6 : originalDayOfWeek - 1;
			week.push({ day, dayOfWeek });
			
			// 주가 완성되면 calendar에 추가
			if (week.length === 7) {
				calendar.push(week);
				week = [];
			}
		}
		
		// 마지막 주의 빈 칸 채우기
		while (week.length < 7 && week.length > 0) {
			const dayOfWeek: number = week.length;
			week.push({ day: null, dayOfWeek });
		}
		if (week.length > 0) {
			calendar.push(week);
		}
		
		return calendar;
	}

	const calendar = generateCalendar(year, month);
</script>

<section class="calendar">
	<h2 class="title {localeStore.locale}">
		{#if localeStore.locale === 'kr'}
			9월 (September)
		{:else}
			September 2025
		{/if}
	</h2>
	
	<div class="calendar-content">
		<!-- 요일 헤더 -->
		<div class="weekdays">
			{#each (localeStore.locale === 'kr' ? weekdays : weekdaysEn) as weekday}
				<div class="weekday-header">{weekday}</div>
			{/each}
		</div>
		
		<!-- 달력 본체 -->
		<div class="calendar-grid">
			{#each calendar as week}
				<div class="week-row">
					{#each week as dayData}
						<div class="day-cell" 
							 class:wedding-day={dayData.day === weddingDay} 
							 class:empty={dayData.day === null}
							 class:saturday={dayData.dayOfWeek === 5 && dayData.day !== null}
							 class:sunday={dayData.dayOfWeek === 6 && dayData.day !== null}>
							{#if dayData.day !== null}
								<div class="day-content">
									<span class="day-number">{dayData.day}</span>
									{#if dayData.day === weddingDay}
										<div class="wedding-overlay">
											<div class="wedding-time">4:30pm</div>
											<div class="heart">♡</div>
										</div>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
	
	<img class="calendar-deco" src={calendarDeco} alt="calendar deco" />
</section>

<style lang="scss">
	.calendar {
		position: relative;
		background-color: $white;
		padding: 2em 3.5em 4em 3.5em;

		.title {
			@extend .title-font-en;
			text-align: center;
			margin-bottom: 1.5em;
			
			&.kr {
				@extend .title-font-kr;
			}
		}

		.calendar-content {
			max-width: 400px;
			margin: 0 auto;
		}

		.weekdays {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			gap: 8px;
			margin-bottom: 10px;
			
			.weekday-header {
				text-align: center;
				font-weight: bold;
				padding: 8px;
				font-size: 0.9rem;
				color: #666;
				
				&:nth-child(6) {
					color: #a8c8f0; // 토요일 파스텔 블루
				}
				
				&:last-child {
					color: #fab8b8; // 일요일 파스텔 레드
				}
			}
		}

		.calendar-grid {
			display: flex;
			flex-direction: column;
			gap: 4px;
			
			.week-row {
				display: grid;
				grid-template-columns: repeat(7, 1fr);
				gap: 4px;
			}
		}

		.day-cell {
			aspect-ratio: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			border-radius: 8px;
			transition: all 0.2s ease;
			
			&.empty {
				visibility: hidden;
			}
			
			&.saturday {
				.day-number {
					color: #a8c8f0;
					font-weight: bold;
				}
			}
			
			&.sunday {
				.day-number {
					color: #fab8b8;
					font-weight: bold;
				}
			}
			
			&.wedding-day {
				background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
				color: white;
				font-weight: bold;
				transform: scale(1.1);
				box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
				
				.day-number {
					text-shadow: 0 1px 3px #000000;
				}
				
				.day-content {
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					text-align: center;
					width: 100%;
					height: 100%;
				}
				
				.wedding-overlay {
					position: absolute;
					inset: 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					pointer-events: none;
				}
				
				.wedding-time {
					position: absolute;
					bottom: 0.5px;
					font-size: 0.6rem;
					opacity: 0.9;
					font-weight: 500;
					text-shadow: 0 1px 2px #000000;
					padding: 0;
					margin: 0;
				}
				
				.heart {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 2.5em;
					opacity: 0.15;
					animation: heartbeat 1.5s ease-in-out infinite;
					z-index: -1;
				}
			}
			
			&:not(.wedding-day):not(.empty) {
				background: #f8f9fa;
				color: #333;
				
				&:hover {
					background: #e9ecef;
					transform: translateY(-2px);
				}
			}
			
			.day-number {
				font-size: 0.9rem;
				font-weight: 500;
			}
		}

		img.calendar-deco {
			position: absolute;
			bottom: 0.5em;
			right: 2.5em;
			width: 60px;
			height: auto;
		}
	}

	@keyframes heartbeat {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.2); }
	}

	// 반응형 조정
	@media (max-width: 768px) {
		.calendar {
			padding: 2em 1.5em 3em 1.5em;
			
			.calendar-content {
				max-width: 300px;
			}
			
			.day-cell {
				.day-number {
					font-size: 0.8rem;
				}
			}
		}
	}
</style>