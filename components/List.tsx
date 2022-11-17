import { ByteLength } from '#/islands/EditorArea.tsx';

export default function List(props: { 
    byteSize: ByteLength;
    isGzipChecked: boolean;
    isBrotliChecked: boolean;
}) {
    const {
        byteSize,
        isGzipChecked,
        isBrotliChecked
    } = props;

    return (
        <>
            <div class="byte-count">
                <span>{byteSize.length || "0 B"}</span>
                <small aria-hidden={!isGzipChecked}>
                    {byteSize.gzip || "0 B"} (gzip)
                </small>
                <small aria-hidden={!isBrotliChecked}>
                    {byteSize.brotli || "0 B"} (br)
                </small>
            </div>
        </>
    )
}