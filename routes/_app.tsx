import { AppProps } from "$fresh/server.ts";
import Icons from "#/components/Icons.tsx";
import { Head,asset } from "$fresh/runtime.ts";
import { injectGlobal } from "emotion"
import { toggleStyles } from "#/components/Toggle.tsx"
import { textAreaStyles } from "#/components/TextArea.tsx";
import { byteCountStyles } from "#/islands/SizeList.tsx";
import { buttonStyles } from "#/components/Button.tsx";
import { controlStyles } from "#/islands/Controls.tsx";
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
  footer .icon-wrapper {
    max-width: 1.5rem;
  }
  footer .icon-wrapper > svg {
    color: var(--ink);
    width: 100%;
  }
  ${controlStyles}
  ${buttonStyles}

  .gui-switch {
    --track-inactive: ${paper};
    --track-active: ${ink};

    --track-color-inactive: ${paper};
    --track-color-active: ${ink};
  }

  ${byteCountStyles}
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
