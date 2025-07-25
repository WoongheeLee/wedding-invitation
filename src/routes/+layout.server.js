import krLocale from '../locales/kr.json';
import enLocale from '../locales/en.json';

export const prerender = true;

export async function load({ url, request }) {
	// Accept-Language 헤더에서 언어 감지 (prerender에서는 request가 없을 수 있음)
	const acceptLanguage = request?.headers?.get('accept-language') || '';
	const isKorean = acceptLanguage.includes('ko') || url.searchParams.get('lang') === 'kr';
	
	const locale = isKorean ? krLocale : enLocale;
	
	return {
		meta: {
			title: locale.meta.title,
			description: `${locale.cover.date}, ${locale.cover.place}`,
			ogImage: 'https://wedding.woongheelee.com/preview.jpg',
			url: 'https://wedding.woongheelee.com/'
		},
		locale
	};
}