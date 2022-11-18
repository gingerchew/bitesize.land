import { setCookie, getCookies } from "https://deno.land/std/http/cookie.ts";
import { Handlers } from "$fresh/server.ts";

// deno-lint-ignore no-explicit-any
export const handler:Handlers<any, { name?: string }> = {
    // @ERROR handler1 is not a function
    // What gives?!
    GET(req, ctx) {
        const cookies = getCookies(req.headers);
        console.log(cookies);

        return ctx.render();
    }
}