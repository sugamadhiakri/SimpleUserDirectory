import fetch from "node-fetch";

export type LatAndLon = {
	latitude: number;
	longitude: number;
};

export async function getLatAndLon(address: string): Promise<LatAndLon> {
	const ENDPOINT = `https://nominatim.openstreetmap.org/search.php?q=${address}&limit=1&format=jsonv2`;

	return await fetch(ENDPOINT)
		.then((response: any) => response.json())
		.then((data: any) => {
			let getLatAndLon: LatAndLon = {
				latitude: +data[0].lat,
				longitude: +data[0].lon,
			};
			return getLatAndLon;
		});
}

export function isNear(a1: LatAndLon, a2: LatAndLon): boolean {
	const NEAR = 10; // 10km radius

	return distanceBetween(a1, a2) <= NEAR;
}

function distanceBetween(a1: LatAndLon, a2: LatAndLon): number {
	let lat1 = a1.latitude;
	let lat2 = a2.latitude;
	let lon1 = a1.longitude;
	let lon2 = a2.longitude;

	let R = 6371; // Radius of the earth in km
	let dLat = deg2rad(lat2 - lat1); // deg2rad below
	let dLon = deg2rad(lon2 - lon1);
	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = R * c; // Distance in km
	return d;
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}
