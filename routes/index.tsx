import { Head, asset } from "$fresh/runtime.ts";
import EditorArea from "#/islands/EditorArea.tsx";
import { injectGlobal } from "emotion";
import Icons from "#/components/Icons.tsx";


const ink = "#b51bed",
  paper = "#f5fad9"


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
    width: clamp(414px, 95vw, 992px);
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
      grid-template-areas: 'header header' 'controls body' '. body' 'footer footer';
      grid-template-columns: minmax(min-content, max-content) 1fr;
    }
  }

  header {
    display: grid;
    gap: 1rem;
    align-content: center;
    grid-area: header;
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
    grid-template-columns: 1fr;
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    grid-area: controls;
  }
  @media (min-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: start;
      justify-content: center;
      gap: 1rem;
    }
  }
  .control {
    display: flex;
    gap: 1ch;
  }
  textarea {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    border: 3px solid var(--ink);
    border-radius: 0;
    resize: vertical;
  }
  input {
    accent-color: var(--ink);
    color: var(--ink);
    border-color: var(--ink);
  }
  .byte-count {
    text-align: right;
    font-size: clamp(24px, 24px + 1vw, 45px);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1em);
    gap: 0.5ch;
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
  footer .icon-wrapper {
    max-width: 1.5rem;
  }
  footer .icon-wrapper > svg {
    color: var(--ink);
    width: 100%;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Chomp Chomp</title>
        <link href={asset('favicon.svg')} rel="icon" type="image/svg+xml" />
        <link href={asset('favicon.png')} rel="icon" type="image/png" />
        <meta name="theme-color" content={ink} />
      </Head>
      <header>
        <h1>Chomp Chomp</h1>
        <p>Inspired by <a href="https://bytesizematters.com">ByteSizeMatters</a> by <a href="https://lea.verou.me/">Lea Verou</a></p>
      </header>

      <EditorArea />
      <footer>
        <a href="https://github.com/gingerchew/bitesize.land" className="icon-wrapper">
          <span class="sr-only">Github</span>
          <Icons name="Github" />
        </a>
        <a href="https://fresh.deno.dev">
          <img width="197" height="37" src="https://fresh.deno.dev/fresh-badge-dark.svg" alt="Made with Fresh" />
        </a>
        <a href="https://twitter.com/gingercheww" className="icon-wrapper">
          <span class="sr-only">Twitter</span>
          <Icons name="Twitter" />
        </a>
      </footer>
    </>
  );
}
