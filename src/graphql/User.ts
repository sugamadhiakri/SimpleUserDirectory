import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { getLatAndLon, isNear, LatAndLon } from "../NominatimApi/nominatimApi";

export const User = objectType({
	name: "User",
	definition(t) {
		t.nonNull.int("id");
		t.nonNull.string("name");
		t.nonNull.int("age");
		t.nonNull.string("gender");
		t.nonNull.string("address");
		t.nonNull.float("latitude");
		t.nonNull.float("longitude");
	},
});

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
