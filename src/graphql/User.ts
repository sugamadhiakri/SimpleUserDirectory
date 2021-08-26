import { objectType } from "nexus";

export const User = objectType({
	name: "User",
	definition(t) {
		t.int("id");
		t.string("name");
		t.int("age");
		t.string("gender");
		t.string("address");
		t.float("latitude");
		t.float("longitude");
	},
});

// id        Int    @id @default(autoincrement())
//   name      String
//   age       Int
//   gender    String
//   address   String
//   latitude  Float
//   longitude Float
