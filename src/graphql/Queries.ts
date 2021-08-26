import { getLatAndLon, isNear, LatAndLon } from "../NominatimApi/nominatimApi";

export const UserQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.nonNull.field("usersNearAddress", {
			type: "User",
			args: {
				address: nonNull(stringArg()),
			},
			async resolve(_root, args, ctx) {
				let inputLatLon = await getLatAndLon(args.address);
				return (await ctx.db.user.findMany()).filter((u) => {
					let userLatLon: LatAndLon = {
						latitude: u.latitude,
						longitude: u.longitude,
					};

					return isNear(inputLatLon, userLatLon);
				});
			},
		});
	},
});