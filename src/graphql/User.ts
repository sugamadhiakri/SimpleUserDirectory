import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

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



