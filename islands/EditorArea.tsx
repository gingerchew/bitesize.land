import { StateUpdater, useState } from "preact/hooks";
import { createContext, createRef, JSX } from "preact";
import TextArea from "#/components/TextArea.tsx";
import SettingsButton from "#/components/SettingsButton.tsx";
import DarkmodeToggle from "#/islands/DarkmodeToggle.tsx";
import SizeList from "#/islands/SizeList.tsx";
import Controls from "#/islands/Controls.tsx";

const GeneralDefaults = {
  isGzipChecked: false,
  isBrotliChecked: false,
  isWhiteSpaceIncluded: true
}

export type GeneralStates = typeof GeneralDefaults

export type SizeListProps = Omit<{
  value: string;
} & GeneralStates, "isWhiteSpaceIgnored">;

type GeneralContext = {
  currentStates: GeneralStates;
  setStates: StateUpdater<GeneralStates>
}

export const GeneralContext = createContext<GeneralContext>({} as GeneralContext);

export const textareaRef = createRef<HTMLTextAreaElement>();

export interface ByteLength {
  gzip?: string;
  brotli?: string;
  length?: string;
}

export default function EditorArea() {
  const [state, setState] = useState("");
  const [paneState, setPaneState] = useState(false);
  const [currentStates, setStates] = useState<GeneralStates>({
    isGzipChecked: false,
    isBrotliChecked: false,
    isWhiteSpaceIncluded: true
  });

  const onInput = (event: JSX.TargetedEvent<HTMLTextAreaElement,Event>) => {
    const target = event.target as unknown as HTMLTextAreaElement;
    
    setState(target.value);
  }


  return (
    <>
      <GeneralContext.Provider value={{ currentStates, setStates }}>
        <TextArea
          onInput={onInput}
        >
          <div className="controls" data-pane={paneState}>
            <SettingsButton onClick={() => setPaneState(!paneState)} />
            <Controls />
          </div>
          <SizeList
            value={state}
          />
        </TextArea>
      </GeneralContext.Provider>
    </>
  );
}
