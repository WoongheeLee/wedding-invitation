// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
	// 네이버 지도 타입 추가
	interface Window {
		naver: {
			maps: {
				LatLng: new (lat: number, lng: number) => any;
				Map: new (container: HTMLElement, options: any) => any;
				Marker: new (options: any) => any;
				InfoWindow: new (options: any) => any;
				Event: {
					addListener: (target: any, type: string, listener: () => void) => void;
				};
			};
		};
		navermap_authFailure?: () => void;
	}
}


export {};
