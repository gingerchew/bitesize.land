import { AppProps } from "https://deno.land/x/fresh@1.1.2/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Component />
    </>
  );
}
