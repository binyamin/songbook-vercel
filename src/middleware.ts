import type { MiddlewareHandler } from "astro";

import { auth } from "~/services/auth.ts";

export const onRequest: MiddlewareHandler = async (context, next) => {
	context.locals.auth = auth.handleRequest(context);
	return await next();
};
