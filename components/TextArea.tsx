import { JSX } from 'preact';
import { textareaRef } from "#/islands/EditorArea.tsx";
// import Icons from "#/components/Icons.tsx";

function FloatingLabel(props: JSX.HTMLAttributes<HTMLElement>) {
    return <span class="floating-label">
        {props.children}
    </span>
}

export const textAreaStyles = `
.textarea-wrapper {
    display: grid;
    grid-template-columns: 1fr minmax(3rem, max-content);
    grid-template-rows: 1fr min-content max-content;
    column-gap: 1ch;
    row-gap: 1rem;
}
.textarea-wrapper > * {
    grid-column: 1 / -1;
    grid-row: 2 / span 2;
}
.textarea-wrapper textarea {
    grid-row: 1;
}
.textarea-wrapper .byte-count {
    grid-column: 2;
}
.textarea-wrapper .controls {
    grid-column: 1;
    grid-row: 2 / span 1;
}
`;

export default function TextArea(props: JSX.HTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div className="textarea-wrapper">
            <textarea rows={10}
                ref={textareaRef}
                onInput={props.onInput}></textarea>
            {props.children}
        </div>
    )
}