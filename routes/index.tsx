import { Head } from "$fresh/runtime.ts";
import EditorArea from "#/islands/EditorArea.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chomp Chomp</title>
      </Head>
      <EditorArea />
    </>
  );
}
