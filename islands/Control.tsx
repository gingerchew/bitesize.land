import { JSX } from 'https://esm.sh/v94/preact@10.11.0/jsx-runtime/src/index.d.ts';
interface ControlProps extends JSX.HTMLAttributes<HTMLInputElement|HTMLSelectElement> {
    label: string;
}

export default function Control(props: ControlProps) {
    /* Preserving just in case
    const SelectControl = () => (
        <select id={props.id} onSelect={props.onChange} onChange={props.onChange}>
            {props.children}
        </select>
    )

    const InputControl = () => (
        <input type={props.type} id={props.id} checked={props.checked} onChange={props.onChange} />
    )*/


    return (
        <div class="control">
            <label for={props.id}>
                {props.label}
            </label>
            <input type={props.type} id={props.id} checked={props.checked} onChange={props.onChange} />
        </div>
    )
}