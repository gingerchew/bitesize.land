import { JSX } from "https://esm.sh/v94/preact@10.11.0/jsx-runtime/src/index.d.ts";

export const iconToggleStyles = `
    .icon-toggle button {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        max-width: 1.5rem;
        max-height: 1.5rem;
    }

    .icon-toggle button > * {
        grid-row: 1;
        grid-column: 1;
        pointer-events: none;
    }
`
type IconToggleProps = {
    isActive: boolean;
} & JSX.HTMLAttributes<HTMLButtonElement>

export default function IconToggle(props: IconToggleProps) {
    const {
        onClick
    } = props;
    return (
        <div class="icon-toggle">
            <button onClick={onClick}>
                <span class="sr-only">{props.label}</span>
                {props.children}
            </button>
        </div>
    )
}