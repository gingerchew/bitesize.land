import List from '#/components/List.tsx';
import { compress as _brotli } from "https://deno.land/x/brotli@0.1.7/mod.ts";
import { zip } from "https://esm.sh/gzip-js@0.3.2";
import { ByteLength, SizeListProps } from '#/islands/EditorArea.tsx';
import { useContext, useEffect, useState } from 'preact/hooks';
import { ControlContext } from "#/islands/EditorArea.tsx";
// import Control from './Control.tsx';

interface Options {
    isGzipChecked: boolean;
    isBrotliChecked: boolean;
    isWhiteSpaceIgnored: boolean;
    gzipLevel: number;
}

const byte0 = '0 Bytes';
const encoder = new TextEncoder();
const k = 1024
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export const getUnit = (value:number, decimals = 2) => {
    if (value === 0) return byte0;

    const i = Math.floor(Math.log(value) / Math.log(k))
    const v = value / Math.pow(k, i);
    
    return `${parseFloat(v.toFixed(decimals < 0 ? 0 : decimals))} ${sizes[i]}`;
}

const calculateByteSize = (value:string, options: Options, cb: (state: ByteLength) => void) => {
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
    if (options.isWhiteSpaceIgnored) {
        v = v.replaceAll(/\s/gm, '');
    }

    const encodedValue = encoder.encode(v);
    
    const encodedLength = encodedValue.length;
    
    const length = getUnit(encodedLength);

    res.length = length;

    if (options.isGzipChecked && v) {
        const level = options.gzipLevel || 6;

        const output = zip(v, {
            level
        });

        res.gzip = getUnit(output.length);
    }

    if (options.isBrotliChecked && v) {
        const input = new Uint8Array(encodedValue);
        
        const output = _brotli(input)

        res.brotli = getUnit(output.length) // output.length
    }
    
    cb(res);
}

export default function SizeList(props: SizeListProps) {
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
    }, [ currentControls, props.value, props.gzipLevel ]);

    return <List 
        byteSize={byteSize}
    />
}