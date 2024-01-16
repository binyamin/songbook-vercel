import type { APIRoute } from "astro";

import { auth } from "~/services/auth.ts";

export const POST: APIRoute = async (context) => {
	const session = await context.locals.auth.validate();
	if (!session) {
		return new Response("Unauthorized", {
			status: 401,
		});
	}

	// make sure to invalidate the current session!
	await auth.invalidateSession(session.sessionId);
	// delete session cookie
	context.locals.auth.setSession(null);

	return context.redirect("/log-in", 302);
}
