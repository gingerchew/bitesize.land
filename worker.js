import { compress as brotli } from "https://deno.land/x/brotli@0.1.7/mod.ts";
import { zip } from "https://esm.sh/gzip-js@0.3.2";

// Based on this stackoverflow: https://stackoverflow.com/a/18650828
const getUnit = (value, decimals = 2) => {
    if (value === 0) return '0 Bytes';
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(value) / Math.log(k))

    return `${parseFloat((value / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const calculateByteSize = (value, options) => {
    /*
    const target = textareaRef.current;
    let value = target?.value || '';
    */

    const {
        isGzipChecked,
        isBrotliChecked,
        gzipLevel,
        isWhiteSpaceIncluded
    } = options
    if (!isWhiteSpaceIncluded) {
        value = value.replaceAll(/\s/gm, '');
    }
    const encodedValue = new TextEncoder().encode(value);
    const encodedLength = encodedValue.length;

    const length = getUnit(encodedLength)

    const byteLength = {
        length,
        gzip: getUnit(0),
        brotli: getUnit(0),
    };

    // console.log({ level: options?.gzipLevel });

    if (isGzipChecked && value) {
        const level = gzipLevel || 6;

        const output = zip(value, {
            level
        });

        byteLength.gzip = getUnit(output.length);
    }

    if (isBrotliChecked && value) {
        const input = new Uint8Array(encodedValue);
        const output = brotli(input)
        // const output = brotli(Buffer.from(value));
        // console.log(output);
        byteLength.brotli = getUnit(output.length) // output.length
    }

    return byteLength;
}


addEventListener('message', ({ data }) => {
    const [
        value,
        options
    ] = JSON.parse(data);

    const byteSize = calculateByteSize(value, options);

    self.postMessage(JSON.stringify(byteSize));
})