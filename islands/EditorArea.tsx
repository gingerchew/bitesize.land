import { useState } from "preact/hooks";
import { createRef } from "preact";
import TextArea from "#/components/TextArea.tsx";
import Control from "#/islands/Control.tsx";
import SizeList from "#/islands/SizeList.tsx";

/**
 * @NOTE Moving to preact/Signals and running into some rough spots.
 *
 * The state.byteChecks is undefined for some reason, despite the
 * context being created in _app.tsx with an actual object
 *
 * Need to look more into using context like this, or revert to
 * just passing props all the way down
 */

const textareaRef = createRef<HTMLTextAreaElement>();

export interface ByteLength {
  gzip?: string;
  brotli?: string;
  length?: string;
}

export interface ByteState {
  byteSize: string;
  byteChecks: {
    isGzipChecked: boolean;
    isBrotliChecked: boolean;
    isWhiteSpaceIgnored: boolean;
  };
  gzipLevel: number;
}


export default function EditorArea() {
  const [state, setState] = useState<ByteState>({
    byteSize: "",
    byteChecks: {
      isGzipChecked: false,
      isBrotliChecked: false,
      isWhiteSpaceIgnored: false,
    },
    gzipLevel: 6,
  });

  const onInput = (target: HTMLTextAreaElement) => {
	setState({
		...state,
		byteSize: target.value
	})
}
  return (
    <>
      <div className="controls">
        <Control
          id="useGzip"
          label="Enable GZIP"
          type="checkbox"
		  checked={state.byteChecks.isGzipChecked}
          onChange={({ target }) => {
            const el = target as HTMLInputElement;

            setState({
              ...state,
              byteChecks: {
                ...state.byteChecks,
                isGzipChecked: el?.checked,
              },
            });
          }}
        />
        <Control
          id="useBrotli"
          label="Enable Brotli"
          type="checkbox"
		  checked={state.byteChecks.isBrotliChecked}
          onChange={({ target }) => {
            const el = target as HTMLInputElement;

            setState({
              ...state,
              byteChecks: {
                ...state.byteChecks,
                isBrotliChecked: el?.checked,
              },
            });
          }}
        />
        <Control
          id="includeWhiteSpace"
          label="Include White Space?"
          type="checkbox"
		  checked={!state.byteChecks.isWhiteSpaceIgnored}
          onChange={({ target }) => {
            const el = target as HTMLInputElement;

            setState({
              ...state,
              byteChecks: {
                ...state.byteChecks,
                isWhiteSpaceIgnored: !el?.checked,
              },
            });
          }}
        />
        <details>
          <summary>Advanced</summary>
          <Control
            id="gzipLevel"
            label="GZIP Level"
            type="select"
            onChange={({ target }) => {
              const el = target as HTMLSelectElement;
              setState({
                ...state,
                gzipLevel: +el.value || 6,
              });
            }}
          >
            <option selected={state.gzipLevel === 1} value="1">Low</option>
            <option selected={state.gzipLevel === 6} value="6">
              Default
            </option>
            <option selected={state.gzipLevel === 9} value="9">High</option>
          </Control>
        </details>
      </div>
      <TextArea
        childRef={textareaRef}
		onInput={(e) => onInput(e.target as unknown as HTMLTextAreaElement)}
      >
        <SizeList
          byteSize={state.byteSize}
          gzipLevel={state.gzipLevel}
          byteChecks={state.byteChecks}
        />
      </TextArea>
    </>
  );
}
