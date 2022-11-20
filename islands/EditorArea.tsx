import { StateUpdater, useState } from "preact/hooks";
import { createContext, createRef } from "preact";
import TextArea from "#/components/TextArea.tsx";
import SettingsButton from "#/components/SettingsButton.tsx";
import SizeList from "#/islands/SizeList.tsx";
import Controls from "#/islands/Controls.tsx";

const ControlDefaults = {
  isGzipChecked: false,
  isBrotliChecked: false,
  isWhiteSpaceIncluded: true,
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
  const [paneState, setPaneState] = useState(false);
  const [currentControls, setControl] = useState<ControlStates>({
    isGzipChecked: false,
    isBrotliChecked: false,
    isWhiteSpaceIncluded: true,
    paneState: false,
    gzipLevel: 6
  });

  const onInput = (target: HTMLTextAreaElement) => setState(target.value);
  const onClick = () => setPaneState(!paneState);


  return (
    <>
      <ControlContext.Provider value={{ currentControls, setControl }}>
        <TextArea
          onInput={(e) => onInput(e.target as unknown as HTMLTextAreaElement)}
        >
          <div className="controls" data-pane={currentControls.paneState}>
            <SettingsButton onClick={onClick} />
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
