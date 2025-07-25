import krLocale from '../../locales/kr.json';
import enLocale from '../../locales/en.json';

export const prerender = true;

export async function load({ request }) {
	// /en 라우트에서는 항상 영어 메타데이터
	const locale = enLocale;
	
	return {
		meta: {
			title: locale.meta.title,
			description: `${locale.cover.date}, ${locale.cover.place}`,
			ogImage: 'https://wedding.woongheelee.com/preview.jpg',
			url: 'https://wedding.woongheelee.com/en'
		},
		locale
	};
}