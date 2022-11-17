import { StateUpdater, useState } from "preact/hooks";
import { createContext, createRef } from "preact";
import TextArea from "#/components/TextArea.tsx";
import SizeList from "#/islands/SizeList.tsx";
import Controls from "#/islands/Controls.tsx";
import Icons from "#/components/Icons.tsx";

const ControlDefaults = {
  isGzipChecked: false,
  isBrotliChecked: false,
  isWhiteSpaceIgnored: false,
  gzipLevel: 6,
  paneState: false,
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

export const textareaRef = createRef<HTMLTextAreaElement>();

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
    paneState: false,
    gzipLevel: 6
  });

  const onInput = (target: HTMLTextAreaElement) => setState(target.value);
  const onClick = () => setControl({ ...currentControls, paneState: !currentControls.paneState });

  return (
    <>
      <ControlContext.Provider value={{ currentControls, setControl }}>
        <TextArea
          onInput={(e) => onInput(e.target as unknown as HTMLTextAreaElement)}
          onClick={onClick}
        >
          <div className="controls" data-pane={currentControls.paneState}>
            <div className="btn-wrapper">
              <button id="toggleSettingsPane" onClick={_ => {
                  // @ts-ignore: Something about `this`
                  onClick?.(null)
              }}>
                  Advanced Options 
                  <Icons.Settings />
              </button>
            </div>
            <Controls />
          </div>
          <SizeList
            value={state}
          />
        </TextArea>
      </ControlContext.Provider>
    </>
  );
}
