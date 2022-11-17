import { JSX } from 'preact';
import { textareaRef } from "#/islands/EditorArea.tsx";

function FloatingLabel(props: JSX.HTMLAttributes<HTMLElement>) {
    return <span class="floating-label">
        {props.children}
    </span>
}

export const textAreaStyles = `
.textarea {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    border: 3px solid var(--ink);
    border-radius: 10px;
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    min-height: 10vh;
    background: #fff;
}
.textarea:has(:focus-visible) {
    outline: 1px solid;
}
.textarea:has(:focus-visible) textarea {
    outline: unset;
}
/* @TODO: confusing, refactor later :) */
.textarea textarea {
    border-color: transparent;
    resize: vertical;
    width: 100%;
    outline-offset: 10px;
}
.textarea-wrapper {
    padding: 1vmin;
    color: #121314;
    justify-content: end;
    grid-area: body;
    display: grid;
    grid-template-columns: 1fr minmax(3rem, max-content);
    grid-template-rows: 1fr min-content max-content;
    column-gap: 1ch;
    row-gap: 1rem;
}
@media (min-width: 768px) {
    .textarea-wrapper {
        grid-template-rows: subgrid;
    }
}
.textarea-wrapper > * {
    grid-column: 1 / -1;
    grid-row: 2 / span 2;
}
.textarea-wrapper .textarea {
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
            <div className="textarea">
                <textarea rows={10}
                    ref={textareaRef}
                    onInput={props.onInput}></textarea>
            </div>
            {props.children}
        </div>
    )
}