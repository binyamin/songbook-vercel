import './text-field.css';

import { createUniqueId, type ComponentProps, mergeProps, type ParentProps, Show, splitProps } from 'solid-js';

export interface BaseProps {
	label?: string;
}

type InputType =
	| 'date' | 'datetime-local' | 'email' | 'month'
	| 'number' | 'password' | 'search' | 'tel' | 'text'
	| 'time' | 'url' | 'week';

interface DomProps extends Omit<ComponentProps<'input'>, 'text'> {
	/**
	 * @default 'text'
	 */
	type?: InputType,
}

interface Props extends BaseProps, DomProps, ParentProps {}

export function TextField(props: Props) {
	props = mergeProps({
		id: createUniqueId(),
		type: 'text' as const,
	}, props);

	const [localProps, inputProps] = splitProps(props, ['children', 'label']);

	return <div class='form-field'>
		<Show when={localProps.label}>
			<label for={props.id}>{localProps.label}
			{/* {props.required && <span aria-label='required'> *</span>} */}
			</label>
		</Show>

		<input {...inputProps} class='input' data-type='text' />
		{localProps.children}
	</div>
}
