import { AppProps } from "$fresh/server.ts";
import { Head, asset } from "$fresh/runtime.ts";
import { injectGlobal } from "emotion"
import { toggleStyles } from "#/components/Toggle.tsx"
import { textAreaStyles } from "#/components/TextArea.tsx";
import { byteCountStyles } from "#/islands/SizeList.tsx";
import { buttonStyles } from "#/components/SettingsButton.tsx";
import { controlStyles } from "#/islands/Controls.tsx";
import { iconToggleStyles } from "#/components/IconToggle.tsx";
import Footer from "#/components/Footer.tsx";

/*
export const ink = "#b51bed",
  paper = "#f5fad9"
*/
export const ink = "#03104e",
  paper = "skyblue";

injectGlobal`
:root {
  color-scheme: dark light;
  --ink: ${ink};
  --paper: ${paper};
}
:root.dark {
  --ink: ${paper};
  --paper: ${ink}
}
@media (prefers-color-scheme: dark) {
  :root {
    --ink: ${paper};
    --paper: ${ink};
  }
}
.gui-switch {
  --track-inactive: ${paper};
  --track-active: ${ink};
  --track-color-inactive: ${paper};
  --track-color-active: ${ink};
}
@media (prefers-color-scheme: dark) {
  .gui-switch {
    --track-inactive: ${ink};
    --track-active: ${paper};
    --track-color-inactive: ${ink};
    --track-color-active: ${paper}
  }
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    min-height: 100vh;
    height: 100%;
  }
  body {
    width: clamp(414px, 95vw, 880px);
    max-width: 100vw;
    display: grid;
    margin: 0 auto;
    font-family: system-ui, sans-serif;
    background-color: var(--paper);
    color: var(--ink);
    transition: all 0.25s ease;
    transition-property: color, background-color;
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
  svg {
    pointer-events: none;
  }
  p {
    letter-spacing: 0.5px;
  }
  a {
    color: var(--ink);
    transition: color 0.25s ease;
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
  ${iconToggleStyles}
  ${byteCountStyles}
  ${toggleStyles}
  ${textAreaStyles}
`;


export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <meta name="color-scheme" content="dark light" />
        <link href={asset('favicon.svg')} rel="icon" type="image/svg+xml" />
        <link href={asset('favicon.png')} rel="icon" type="image/png" />
        <meta name="theme-color" content={ink} />
      </Head>
      <header>
        <h1>BiteSize.Land</h1>
        <p>
          Inspired by <a href="https://bytesizematters.com">ByteSizeMatters</a> by <a href="https://lea.verou.me/">Lea Verou</a>.
        </p>
      </header>
      <Component />
      <Footer />
    </>
  );
}
