import IconToggle from "#/components/IconToggle.tsx";
import Icons from "#/components/Icons.tsx";
import { JSX } from "preact/jsx-runtime";


type DarkModeToggleProps = {
    isActive: boolean;
} & JSX.HTMLAttributes<HTMLButtonElement>

export default function DarkModeToggle(props: DarkModeToggleProps) {
    const {
        isActive,
        onClick
    } = props;

    /**
     * isActive = true
     *     turn darkmode on
     * isActive = false
     *     turn darkmode off
     */

    return (
        <IconToggle onClick={onClick} label="Toggle dark mode">
            {isActive ? <Icons.Moon /> : <Icons.Sun />}
        </IconToggle>
    );
}