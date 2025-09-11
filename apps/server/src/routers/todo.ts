import { eq } from "drizzle-orm";
import z from "zod";
import { getDb } from "@/db";
import { todo } from "@/db/schema/todo";
import { publicProcedure } from "@/lib/orpc";

export const todoRouter = {
	getAll: publicProcedure.handler(async () => {
		const start = Date.now();
		const db = getDb();
		const result = await db.select().from(todo);
		const end = Date.now();
		console.log(`[todoRouter.getAll] took ${end - start}ms`);
		return result;
	}),

	create: publicProcedure
		.input(z.object({ text: z.string().min(1) }))
			.handler(async ({ input }) => {
				const start = Date.now();
				const db = getDb();
				const result = await db.insert(todo).values({
					text: input.text,
				});
				const end = Date.now();
				console.log(`[todoRouter.create] took ${end - start}ms`);
				return result;
			}),

	toggle: publicProcedure
		.input(z.object({ id: z.number(), completed: z.boolean() }))
			.handler(async ({ input }) => {
				const start = Date.now();
				const db = getDb();
				const result = await db
					.update(todo)
					.set({ completed: input.completed })
					.where(eq(todo.id, input.id));
				const end = Date.now();
				console.log(`[todoRouter.toggle] took ${end - start}ms`);
				return result;
			}),

	delete: publicProcedure
		.input(z.object({ id: z.number() }))
			.handler(async ({ input }) => {
				const start = Date.now();
				const db = getDb();
				const result = await db.delete(todo).where(eq(todo.id, input.id));
				const end = Date.now();
				console.log(`[todoRouter.delete] took ${end - start}ms`);
				return result;
			}),
};
