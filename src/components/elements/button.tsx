/**
 * Button component
 */

import './button.css';
import { type ComponentProps, splitProps } from 'solid-js';

type StatusType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'discovery';

export interface BaseProps {
	/**
	 * visual style
	 * @default 'solid'
	 */
	variant?: 'solid' | 'soft' | 'outline' | 'text';

	/**
	 * Only applies when {@linkcode variant} is either `solid`, `soft`, or `text`.
	 *
	 * @default 'primary'
	 * @todo
	 */
	color?: StatusType;
}

interface ButtonProps extends Omit<ComponentProps<'button'>, 'color'>, BaseProps {}

export function Button(props: ButtonProps) {
	const [{ color, variant = 'solid' }, domProps] = splitProps(props, ['color', 'variant']);

	return <button
		{...domProps}
		class={'button'}
		data-color={color}
		data-variant={variant}
	/>
}

interface LinkButtonProps extends Omit<ComponentProps<'a'>, 'color'>, BaseProps {}

export function LinkButton(props: LinkButtonProps) {
	const [{ color, variant = 'solid' }, domProps] = splitProps(props, ['color', 'variant']);

	return <a
		{...domProps}
		class={'button'}
		data-color={color}
		data-variant={variant}
	/>
}
