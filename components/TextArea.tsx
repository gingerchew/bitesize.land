import { JSX, Ref } from 'preact';

interface TextAreaProps extends JSX.HTMLAttributes<HTMLTextAreaElement> {
    childRef: Ref<HTMLTextAreaElement>
}

export default function TextArea(props: TextAreaProps) {
    return (
        <>
            <div className="textarea-wrapper">
                <textarea rows={10}
                    ref={props.childRef}
                    onInput={props.onInput}
                    onKeyUp={props.onInput}></textarea>
                {props.children}
            </div>
        </>
    )
}