import { useContext } from 'https://esm.sh/v94/preact@10.11.0/hooks/src/index.d.ts';
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
                    onInput={props.onInput}></textarea>
                {props.children}
            </div>
        </>
    )
}