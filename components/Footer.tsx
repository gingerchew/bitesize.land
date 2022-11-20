import Icons from "#/components/Icons.tsx";

export default function Footer() {
  return (
    <>
      <footer>
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
      </footer>
    </>
  );
}
