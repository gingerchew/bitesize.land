import Control from "#/islands/Control.tsx";
import { useContext } from "preact/hooks";
import { JSX } from "https://esm.sh/v94/preact@10.11.0/jsx-runtime/src/index.d.ts";
import { ControlContext } from "#/islands/EditorArea.tsx";

const SummaryWrapper = (props: JSX.HTMLAttributes<HTMLDetailsElement>) => {
    return <details>
        <summary>{props.title}</summary>
        <div className="content">
            {props.children}
        </div>
    </details>
}


export default function Controls() {

    const { currentControls, setControl } = useContext(ControlContext);

    return <>
    <Control
        id="useGzip"
        label="Enable GZIP"
        type="checkbox"
        checked={currentControls?.isGzipChecked}
        onChange={({ target }) => {
            const el = target as HTMLInputElement;
            
            setControl({
                ...currentControls,
                isGzipChecked: el?.checked
            })

        }}
    />
    <Control
        id="useBrotli"
        label="Enable Brotli"
        type="checkbox"
        checked={currentControls.isBrotliChecked}
        onChange={({ target }) => {
            const el = target as HTMLInputElement;
            setControl({
                ...currentControls,
                isBrotliChecked: el?.checked
            })
        }}
    />
    <Control
        id="includeWhiteSpace"
        label="Include White Space?"
        type="checkbox"
        checked={!currentControls.isWhiteSpaceIgnored}
        onChange={({ target }) => {
            const el = target as HTMLInputElement;
            setControl({
                ...currentControls,
                isWhiteSpaceIgnored: !el?.checked
            })
        }}
    />
    <SummaryWrapper title="Advanced">
        <Control
            id="gzipLevel"
            label="GZIP Level"
            type="select"
            onChange={({ target }) => {
                const el = target as HTMLSelectElement;
                setControl({
                    ...currentControls,
                    gzipLevel: +el.value
                })
            }}
        >
            <option selected={currentControls.gzipLevel === 1} value="1">Low</option>
            <option selected={currentControls.gzipLevel === 6} value="6">
                Default
            </option>
            <option selected={currentControls.gzipLevel === 9} value="9">High</option>
        </Control>
    </SummaryWrapper>
  </>
}