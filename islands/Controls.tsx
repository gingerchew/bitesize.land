import Control from "#/islands/Control.tsx";
import Toggle from "#/components/Toggle.tsx";
import { useContext } from "preact/hooks";
import { JSX } from "https://esm.sh/v94/preact@10.11.0/jsx-runtime/src/index.d.ts";
import { ControlContext } from "#/islands/EditorArea.tsx";

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
          checked={!currentControls.isWhiteSpaceIgnored}
          onChange={({ target }) => setControl({
            ...currentControls,
            isWhiteSpaceIgnored: (target as HTMLInputElement)?.checked
          })}
        />
      </div>
  );
}
