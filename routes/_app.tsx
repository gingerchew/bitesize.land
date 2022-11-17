import { AppProps } from "$fresh/server.ts";
import Icons from "#/components/Icons.tsx";
import { Head,asset } from "$fresh/runtime.ts";
import { injectGlobal } from "emotion"
import { toggleStyles } from "#/components/Toggle.tsx"
import { textAreaStyles } from "#/components/TextArea.tsx";
/*
export const ink = "#b51bed",
  paper = "#f5fad9"
*/
export const ink = "#03104e",
  paper = "skyblue";

injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    --ink: ${ink};
    --paper: ${paper};
  }
  html,
  body {
    margin: 0;
    min-height: 100vh;
    height: 100%;
  }
  body {
    width: clamp(414px, 95vw, 880px);
    display: grid;
    margin: 0 auto;
    font-family: system-ui, sans-serif;
    background-color: var(--paper);
    color: var(--ink);
    grid-auto-rows: min-content;
    grid-template-columns: 1fr;
    grid-template-areas: 'header' 'controls' 'body' 'footer';
    gap: 1rem;
  }

  @media (min-width: 768px) {
    body {
      grid-template-rows: auto min-content 1fr 1fr;
    }
  }
  header {
    display: grid;
    gap: 1rem;
    align-content: center;
    grid-area: header;
    padding-top: 10vh;
  }
  header > * {
    margin: 0;
    padding: 0;
    text-align: center;
  }
  footer {
    grid-area: footer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  h1 {
    font-size: clamp(36px, 36px + 2.5vw, 64px);
    letter-spacing: -3px;
    word-spacing: 10px;
  }
  p {
    letter-spacing: 0.5px;
  }
  a {
    color: var(--ink);
    font-weight: 700;
    letter-spacing: 0;
  }
  a:visited {
    text-decoration-style: dashed;
  }
  .textarea-wrapper {
    padding: 1vmin;
    color: #121314;
    display: grid;
    justify-content: end;
    grid-template-columns: 1fr max-content;
    gap: 2rem;
    grid-area: body;
  }
  @media (min-width: 768px) {
    .textarea-wrapper {
      grid-template-rows: subgrid;
    }
  }
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
  }

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
  }
  textarea {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    border: 3px solid var(--ink);
    border-radius: 0;
    resize: vertical;
    grid-column: 1 / 1;
    grid-row: 1 / 1;
  }
  input {
    accent-color: var(--ink);
    color: var(--ink);
    border-color: var(--ink);
  }
  .byte-count {
    text-align: right;
    font-size: clamp(24px, 24px + 1vw, 35px);
    font-weight: 800;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1em);
    gap: 0.5ch;
  }
  .byte-count small {
    font-weight: 500;
    font-size: clamp(18px, 18px + 1vw, 28px);
  }
  .byte-count [aria-hidden="true"],
  .sr-only {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    position: absolute;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    width: 1px;
    grid-row: 4;
  }
  .byte-count * {
    font-variant: tabular-num;
  }
  footer .icon-wrapper {
    max-width: 1.5rem;
  }
  footer .icon-wrapper > svg {
    color: var(--ink);
    width: 100%;
  }

  .gui-switch {
    --track-inactive: ${paper};
    --track-active: ${ink};

    --track-color-inactive: ${paper};
    --track-color-active: ${ink};
  }
  ${toggleStyles}

  ${textAreaStyles}
`;


export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link href={asset('favicon.svg')} rel="icon" type="image/svg+xml" />
        <link href={asset('favicon.png')} rel="icon" type="image/png" />
        <meta name="theme-color" content={ink} />
      </Head>
      <header>
        <h1>BiteSize.Land</h1>
        <p>Inspired by <a href="https://bytesizematters.com">ByteSizeMatters</a> by <a href="https://lea.verou.me/">Lea Verou</a></p>
      </header>
      <Component />
      <footer>
        <a href="https://github.com/gingerchew/bitesize.land" className="icon-wrapper">
          <span class="sr-only">Github</span>
          <Icons.Github />
        </a>
        <a href="https://fresh.deno.dev">
          <img width="197" height="37" src="https://fresh.deno.dev/fresh-badge-dark.svg" alt="Made with Fresh" />
        </a>
        <a href="https://twitter.com/gingercheww" className="icon-wrapper">
          <span class="sr-only">Twitter</span>
          <Icons.Twitter />
        </a>
      </footer>
      <script defer data-domain="bitesize.land" src="https://plausible.io/js/script.js"></script>
    </>
  );
}
