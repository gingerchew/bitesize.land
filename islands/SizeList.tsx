import List from '#/components/List.tsx';
import { compress as _brotli } from "https://deno.land/x/brotli@0.1.7/mod.ts";
import { gzipEncode as gzip } from "https://raw.githubusercontent.com/manyuanrong/wasm_gzip/master/mod.ts";
import { ByteLength, ControlStates, ControlContext } from '#/islands/EditorArea.tsx';
import { useContext, useEffect, useState } from 'preact/hooks';

export const byteCountStyles = `
    .byte-count {
    text-align: right;
    font-size: clamp(24px, 24px + 1vw, 35px);
    font-weight: 800;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1em);
    gap: 0.5ch;
  }
  .byte-count small {
    font-weight: 500;
    font-size: clamp(18px, 18px + 1vw, 28px);
  }
  .byte-count * {
    font-variant: tabular-num;
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
  }`


const byte0 = '0 B';
const encoder = new TextEncoder();
const k = 1024
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export const getUnit = (value:number, decimals = 2) => {
    if (value === 0) return byte0;

    const i = Math.floor(Math.log(value) / Math.log(k))
    const v = value / Math.pow(k, i);
    
    return `${parseFloat(v.toFixed(decimals < 0 ? 0 : decimals))} ${sizes[i]}`;
}

const calculateByteSize = (value:string, options: ControlStates, cb: (state: ByteLength) => void) => {
    const res = {
        gzip: byte0,
        brotli: byte0,
        length: byte0
    };

    if (!value) {
        cb(res);
        return;
    }
    
    let v = value as string;
    if (!options.isWhiteSpaceIncluded) {
        v = v.replaceAll(/\s/gm, '');
    }

    const encodedValue = encoder.encode(v);
    
    const encodedLength = encodedValue.length;
    
    const length = getUnit(encodedLength);

    res.length = length;

    if (options.isGzipChecked && v) {
        const output = gzip(encodedValue);

        res.gzip = getUnit(output.length);
    }

    if (options.isBrotliChecked && v) {
        const input = new Uint8Array(encodedValue);
        
        const output = _brotli(input)

        res.brotli = getUnit(output.length) // output.length
    }
    
    cb(res);
}

export default function SizeList(props: { value: string }) {
    const {
        currentControls
    } = useContext(ControlContext);

    const [byteSize, setByteSize] = useState<ByteLength>({})
    
    useEffect(() => {
        calculateByteSize(props.value, {
                ...currentControls
            },
            setByteSize
        );
    }, [ currentControls, props.value ]);

    return <List 
        byteSize={byteSize}
        isGzipChecked={currentControls.isGzipChecked}
        isBrotliChecked={currentControls.isBrotliChecked}
    />
}