import { ByteLength, ControlContext } from '#/islands/EditorArea.tsx';
import { useContext } from 'preact/hooks';

export default function List(props: { 
    byteSize: ByteLength
}) {
    const {
        currentControls: {
            isGzipChecked,
            isBrotliChecked
        }
    } = useContext(ControlContext)

    const byteSize = props.byteSize;

    return (
        <>
            <div class="byte-count">
                <span>{byteSize.length || '0 Bytes'}</span>
                <small aria-hidden={!isGzipChecked}>
                    {byteSize.gzip || "0 Bytes"} (gzip)
                </small>
                <small aria-hidden={!isBrotliChecked}>
                    {byteSize.brotli || "0 Bytes"} (br)
                </small>
            </div>
        </>
    )
}