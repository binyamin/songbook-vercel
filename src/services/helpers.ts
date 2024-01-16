import type { Issues } from 'valibot';

export function formatIssues(issues: Issues) {
	const errors: {
		root?: string;
		fields: Record<string, string>;
	} = { fields: {} };

	for (const issue of issues) {
		if (issue.path) {
			const key = issue.path[0].key as string;
			errors.fields[key] ??= issue.message;
		} else {
			errors.root ??= issue.message;
		}
	}

	return errors;
}

export function formToJSON(form: FormData) {
	const data: Record<string, string | File | Array<string | File>> = {};
	for (const [key, value] of form) {
		if (key in data) {
			let entry = data[key];
			entry = [entry].flat();
			entry.push(value);
			data[key] = entry;
		} else {
			data[key] = value;
		}
	}

	return data;
}
