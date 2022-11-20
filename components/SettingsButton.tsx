import Icons from "#/components/Icons.tsx"
import { JSX } from "https://esm.sh/v94/preact@10.11.0/jsx-runtime/src/index.d.ts"

export const buttonStyles = `
  button {
    background-color: transparent;
    color: var(--ink);
    border: unset;
    padding: 0.5rem 0;
    position: relative;
    display: none;
    align-items: center;
    gap: 1.5ch;
  }
  @media (min-width: 768px) {
    button {
      display: flex;
    }
  }
  
  .btn-wrapper {
    grid-column: 1 / -1;
  }
  @media (min-width: 768px) {
    .btn-wrapper {
      grid-column: 1;
    }
  }
  button > svg {
    max-width: 2rem;
    width: 100%;
  }`


export default function SettingsButton(props: JSX.HTMLAttributes<HTMLButtonElement>) {
    const {
        onClick
    } = props;
    return <div className="btn-wrapper">
        <button id="toggleSettingsPane" onClick={onClick}>
            Advanced Options 
            <Icons.Settings />
        </button>
    </div>
}