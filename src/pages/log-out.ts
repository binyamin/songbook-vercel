import type { APIRoute } from "astro";

import { lucia } from "~/services/auth.ts";

export const POST: APIRoute = async (context) => {
	if (!context.locals.session) {
		return new Response("Unauthorized", {
			status: 401,
		});
	}

	// make sure to invalidate the current session!
	await lucia.invalidateSession(context.locals.session.id);
	// delete session cookie
	const sessionCookie = lucia.createBlankSessionCookie();
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return context.redirect("/log-in", 302);
}
