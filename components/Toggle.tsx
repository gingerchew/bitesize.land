import { paper, ink } from "#/routes/_app.tsx"
import { JSX } from "https://esm.sh/v94/preact@10.11.0/jsx-runtime/src/index.d.ts"

// https://web.dev/building-a-switch-component/
const trackStyles = `
    .gui-switch {
        --track-size: calc(var(--thumb-size) * 2);
        --track-padding: 3px;
        /* Colors found in _app */
    }

    .gui-switch {
        display: flex;
        gap:1ch;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }

    .gui-switch > input {
        appearance: none;
        border: none;
        outline-offset: 5px;
        box-sizing: content-box;
        touch-action: pan-y;
        background: var(--track-color-inactive);
        border-radius: var(--track-size);
        border: 2px solid var(--track-color-active);
        inline-size: var(--track-size);
        block-size: var(--thumb-size);
        /*padding: var(--track-padding);*/
        transition: background-color 0.25s ease 0.1s;
        flex-shrink: 0;
        display: grid;
        align-items: center;
        grid: [track] 1fr / [track] 1fr;
    }
    .gui-switch > input:checked {
        background-color: var(--track-color-active);
    }
`

const thumbStyles = `
    /* Thumb Styles */
    .gui-switch {
        --thumb-size: 1rem;
        --thumb: hsl(0 0% 100%);
        --thumb-highlight: hsl(0 0% 0% / 25%);

        --thumb-color: var(--thumb);
        --thumb-color-highlight: var(--thumb-highlight);
    }
    /* Thumb element */
    .gui-switch > input::before {
        content: '';
        grid-area: track;
        inline-size: var(--thumb-size);
        block-size: var(--thumb-size);
        background: var(--thumb-color);
        border-radius: 50%;
        box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);
    }
    /* Thumb position */
    .gui-switch > input {
        --thumb-position: 0%;
    }
    .gui-switch > input::before {
        transition: transform 0.25s ease;
        transform: translateX(var(--thumb-position));
    }

    .gui-switch > input:checked {
        --thumb-position: calc(var(--track-size) - 100%);
    }
`

export const toggleStyles = [trackStyles, thumbStyles].join('')

export default function Toggle(props: JSX.HTMLAttributes<HTMLLabelElement>) {
    return <label for={props.for} class="gui-switch">
        {props.label}
        <input type="checkbox" role="switch" id={props.for} onChange={(e) => 
            // @ts-ignore: Typescript being weird
            props.onChange?.(e)
        } />
    </label>
}