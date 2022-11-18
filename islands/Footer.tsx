import Icons from "#/components/Icons.tsx";
import IconToggle from "#/components/IconToggle.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";

const checkDarkModeState = () => {
  if (IS_BROWSER) {
    const ls = localStorage.getItem("darkmode");
    const media = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return (media || ls === "dark");
  }
  return false;
};

export default function Footer() {
  const [darkModeState, setDarkModeState] = useState(checkDarkModeState);

  useEffect(() => {
    if (IS_BROWSER) {
      localStorage.setItem("darkmode", `${darkModeState ? "dark" : "light"}`);
      document.documentElement.classList.toggle("dark", darkModeState);
    } else {
        const savedDarkMode = getCookies('darkmode');
        console.log(savedDarkMode);
    }
  }, [darkModeState]);

  checkDarkModeState();

  return (
    <>
      <footer>
        <IconToggle
          isActive={darkModeState}
          onClick={() => setDarkModeState(!darkModeState)}
        >
          {darkModeState ? <Icons.Moon /> : <Icons.Sun />}
        </IconToggle>
        <a
          href="https://github.com/gingerchew/bitesize.land"
          className="icon-wrapper"
        >
          <span class="sr-only">Github</span>
          <Icons.Github />
        </a>
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge-dark.svg"
            alt="Made with Fresh"
          />
        </a>
        <a href="https://twitter.com/gingercheww" className="icon-wrapper">
          <span class="sr-only">Twitter</span>
          <Icons.Twitter />
        </a>
        {/*<script defer data-domain="bitesize.land" src="https://plausible.io/js/script.js"></script>*/}
      </footer>
    </>
  );
}
