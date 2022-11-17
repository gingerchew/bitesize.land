import { StateUpdater, useState } from "preact/hooks";
import { createContext, createRef } from "preact";
import TextArea from "#/components/TextArea.tsx";
import SizeList from "#/islands/SizeList.tsx";
import Controls from "#/islands/Controls.tsx";

const ControlDefaults = {
  isGzipChecked: false,
  isBrotliChecked: false,
  isWhiteSpaceIgnored: false,
  gzipLevel: 6
}

export type ControlStates = typeof ControlDefaults

export type SizeListProps = Omit<{
  value: string;
} & ControlStates, "isWhiteSpaceIgnored">;

type ControlContext = {
  currentControls: ControlStates;
  setControl: StateUpdater<ControlStates>
}

export const ControlContext = createContext<ControlContext>({} as ControlContext);


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

export default function EditorArea() {
  const [state, setState] = useState("");

  const [currentControls, setControl] = useState<ControlStates>({
    isGzipChecked: false,
    isBrotliChecked: false,
    isWhiteSpaceIgnored: false,
    gzipLevel: 6
  });

  const onInput = (target: HTMLTextAreaElement) => setState(target.value);

  return (
    <>
      <ControlContext.Provider value={{ currentControls, setControl }}>
        <div className="controls">
          <Controls />
        </div>
        <TextArea
          childRef={textareaRef}
          onInput={(e) => onInput(e.target as unknown as HTMLTextAreaElement)}
        >
          <SizeList
            value={state}
            gzipLevel={currentControls.gzipLevel}
            isBrotliChecked={currentControls.isBrotliChecked}
            isGzipChecked={currentControls.isGzipChecked}
          />
        </TextArea>
      </ControlContext.Provider>
    </>
  );
}
