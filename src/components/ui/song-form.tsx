import type { songs } from 'drizzle/api';

import './song-form.css';
import { Button, LinkButton } from '~/components/elements/button';
import '~/components/elements/form-field/text-field.css';

interface Props {
	type: 'new' | 'edit'
	input?: songs.InputValue;
	cancelUrl?: string;
	errors?: {
		root?: string;
		fields?: Record<string, string>;
	}
}

export function SongForm(props: Props) {
	return <form method="post" class="flow">
		{props.errors?.root && <output class="_error"><p><b>Error:</b> {props.errors?.root}</p></output>}

		<div class='form-field'>
			<label for="form-title">Title</label>
			<input class="input" data-type="text" type="text" name="title" id="form-title" required autocapitalize="words" value={props.input?.title} />

			{props.errors?.fields?.title &&
				<div class="_error">
					<p>{props.errors?.fields.title}</p>
				</div>
			}
		</div>
		{/* <div class="form-field">
			<label for="form-key">Key Signature</label>
			<!-- Ideally, this would be a combobox (a text-field with autocomplete) -->
			<input class="input" data-type="text" type="text" name="key" id="form-key" pattern="[A-G][b#]?m?" size={3} />
			<!-- TODO: hint text with example key signatures -->
		</div> */}
		<div class="form-field">
			<label for="form-content">Content</label>
			{/* <!-- Idea: Progressive enhancement: JS which adds a song-part fieldset (title+content) when a button is clicked --> */}
			<textarea class="input" name="content" id="form-content" spellcheck={false} autocomplete="off" required>{props.input?.content}</textarea>

			{props.errors?.fields?.content &&
				<div class="_error">
					<p>{props.errors?.fields.content}</p>
				</div>
			}
		</div>

		<div class="l-cluster">
			{props.cancelUrl && <LinkButton variant='soft' href={props.cancelUrl}>Cancel</LinkButton>}
			<Button type="submit">{props.type === 'new' ? 'Create' : 'Save'}</Button>
		</div>
	</form>
}
