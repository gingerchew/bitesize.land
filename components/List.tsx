import { ByteLength } from '#/islands/EditorArea.tsx';

export default function List(props: { 
    byteSize: ByteLength,
    isGzipChecked: boolean;
    isBrotliChecked: boolean;
}) {

    const byteSize = props.byteSize;

    return (
        <>
            <div class="byte-count">
                <span>{byteSize.length || '0 Bytes'}</span>
                <small aria-hidden={!props.isGzipChecked}>
                    {byteSize.gzip} (gzip)
                </small>
                <small aria-hidden={!props.isBrotliChecked}>
                    {byteSize.brotli} (br)
                </small>
            </div>
        </>
    )
}