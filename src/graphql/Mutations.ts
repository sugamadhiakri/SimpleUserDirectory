import { getLatAndLon, LatAndLon } from "../NominatimApi/nominatimApi";

export const UserMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createUser", {
			type: "User",
			args: {
				name: nonNull(stringArg()),
				age: nonNull(intArg()),
				gender: nonNull(stringArg()),
				address: nonNull(stringArg()),
			},

			async resolve(_root, args, ctx) {
				const tempLatLon: LatAndLon = await getLatAndLon(args.address);

				const inputUser = {
					name: args.name,
					age: args.age,
					gender: args.gender,
					address: args.address,
					longitude: tempLatLon.longitude,
					latitude: tempLatLon.latitude,
				};

				return ctx.db.user.create({ data: inputUser });
			},
		});
	},
});