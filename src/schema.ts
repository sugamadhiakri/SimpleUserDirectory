import { makeSchema } from "nexus";
import * as types from "./graphql";
import { join } from "path";

export const schema = makeSchema({
	types,

	outputs: {
		typegen: join(__dirname, "../generated", "nexus-typegen.ts"),
		schema: join(__dirname, "../generated", "schema.graphql"),
	},

	contextType: {
		module: join(__dirname, "./context.ts"),
		export: "Context",
	},
});
