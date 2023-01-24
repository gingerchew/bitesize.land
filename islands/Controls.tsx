import Toggle from "#/components/Toggle.tsx";
import { useContext } from "preact/hooks";
import { GeneralContext } from "#/islands/EditorArea.tsx";

export const controlStyles = `
.controls {
  padding: 1vmin;
  padding-left: 2vmin;
  width: 100%;
  grid-column: 1;
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
}
.controls > * {
  grid-row: 1;
}
.controls-compression {
  height: auto;
  transition: max-height 0.25s ease-out;
  justify-content: start;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  grid-row: 2;
  grid-column: 1 / -1;
}
.controls svg {
  --stroke-color: transparent;
  overflow: visible;
}
.controls[data-pane="true"] svg {
  transition: color 0.25s ease-out;
  color: var(--paper);
  --stroke-color: var(--ink);
}

.controls path {
  stroke-width: 2rem;
  stroke: var(--stroke-color);
  transition: stroke-color 0.25s ease-out;
}
@media (min-width: 768px) {
  .controls {
    grid-template-columns: minmax(min-content, max-content) 2fr;
    grid-auto-rows: auto;
    gap: 1rem;
  }
  .controls-compression {
    overflow: hidden;
    max-height: 4ch;
  }
  .controls:not([data-pane="true"]) .controls-compression{
    max-height: 0px;
  }
  .controls .controls-compression {
    grid-column: 2;
    grid-row: 1;
  }
}
.control {
  display: flex;
  gap: 0.25ch;
  justify-content: center;
}

@media (min-width: 768px) {
  .control {
    justify-content: start;
    text-align: left;
  }
}`


export default function Controls() {
  const { currentStates, setStates } = useContext(GeneralContext);
  
  return <>
    <div class="controls-compression">
      <label class="gui-switch" for="useGzip">
        GZIP
        <input type="checkbox" 
          role="switch" 
          id="useGzip"
          name="useGzip"
          checked={currentStates.isGzipChecked}
          onChange={({ target }) => setStates({
            ...currentStates,
            isGzipChecked: (target as HTMLInputElement)?.checked
          })}
        />
      </label>
      <label for="useBrotli" className="gui-switch">
        Brotli
        <input type="checkbox"
          name="useBrotli"
          id="useBrotli"
          role="switch"
          checked={currentStates.isBrotliChecked}
          onChange={({ target }) => setStates({
            ...currentStates,
            isBrotliChecked: (target as HTMLInputElement)?.checked
          })}
        />
      </label>
      <label for="includeWhiteSpace" className="gui-switch">
        Include White Space
        <input type="checkbox"
          name="includeWhiteSpace"
          id="includeWhiteSpace"
          role="switch"
          checked={currentStates.isWhiteSpaceIncluded}
          onChange={({ target }) => setStates({
            ...currentStates,
            isWhiteSpaceIncluded: (target as HTMLInputElement)?.checked
          })}
        />
      </label>
    </div>
  </>
}
