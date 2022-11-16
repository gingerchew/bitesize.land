import { HandlerContext } from "https://deno.land/x/fresh@1.1.2/server.ts";

import { compress as _brotli } from "https://deno.land/x/brotli@0.1.7/mod.ts";
import { zip } from "https://esm.sh/gzip-js@0.3.2";
import { getUnit } from "#/islands/SizeList.tsx";

export const handler = async (_req: Request, _ctx: HandlerContext) => {
    const json = await _req.json()
    
    const body = {} as {
        gzip: string;
        brotli: string;
    };

    if (json.gzip) {
        const gzipOutput = zip(json.text);
        body.gzip = getUnit(gzipOutput.length);
    }
    /** @NOTE disabled due to bug where brotli always return 1 Byte */
    /*
    if (json.brotli) {
        // console.log(json.text);
        const input = new Uint8Array(json.text);
        const brotliOutput = _brotli(input);
        // console.log(brotliOutput);
        body.brotli = getUnit(brotliOutput.length);
    }
    */

    const res = new Response(JSON.stringify(body), {
        headers: {
            "content-type":"application/json; charset=utf-8"
        }
    });
    
    return res;
}