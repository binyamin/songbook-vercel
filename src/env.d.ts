/// <reference types="astro/client" />
/// <reference types="lucia" />

declare namespace Lucia {
	type Auth = import("~/services/auth.ts").Auth;
	type DatabaseUserAttributes = {
		username: string;
	};
	type DatabaseSessionAttributes = {};
}

declare namespace App {
	interface Locals {
		auth: import("lucia").AuthRequest;
	}
}
