import Toggle from "#/components/Toggle.tsx";
import { useContext } from "preact/hooks";
import { ControlContext } from "#/islands/EditorArea.tsx";

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
  const { currentControls, setControl } = useContext(ControlContext);

  return (
      <div class="controls-compression">
        <Toggle 
            for="useGzip"
            label="GZIP"
            checked={currentControls.isGzipChecked}
            onChange={({ target }) => setControl({
                ...currentControls,
                isGzipChecked: (target as HTMLInputElement)?.checked
            })}
        />
        <Toggle 
            for="useBrotli"
            label="Brotli"
            checked={currentControls.isBrotliChecked}
            onChange={({ target }) => setControl({
                ...currentControls,
                isBrotliChecked: (target as HTMLInputElement)?.checked
            })}
        />
        <Toggle
          for="includeWhiteSpace"
          label="Include White Space"
          checked={currentControls.isWhiteSpaceIncluded}
          onChange={({ target }) => setControl({
            ...currentControls,
            isWhiteSpaceIncluded: (target as HTMLInputElement)?.checked
          })}
        />
      </div>
  );
}
