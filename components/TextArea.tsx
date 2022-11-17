import { JSX } from 'preact';
import { textareaRef } from "#/islands/EditorArea.tsx";
import Icons from "#/components/Icons.tsx";

export default function TextArea(props: JSX.HTMLAttributes<HTMLTextAreaElement>) {
    return (
        <>
            <div className="textarea-wrapper">
                <textarea rows={10}
                    ref={textareaRef}
                    onInput={props.onInput}></textarea>
                <button id="toggleSettingsPane" onClick={_ => {
                    // @ts-ignore: Something about `this`
                    props.onClick?.(null)
                }}>
                    <Icons.Settings />
                </button>
                {props.children}
            </div>
        </>
    )
}