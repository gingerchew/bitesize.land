import { useEffect, useState } from "preact/hooks";
import Icons from "#/components/Icons.tsx";
import IconToggle from "#/components/IconToggle.tsx";

const messages:Record<string, string> = {
    dark: "Disable Dark Mode",
    light: "Enable Dark Mode"
}

export default function DarkmodeToggle() {
    const ls = new Proxy({} as Record<string, string>, {
        get(target, p:string, _receiver) {
            if (window.localStorage) return localStorage[p];

            return target[p];
        },
        set(target, p:string, newValue, _receiver) {
            target[p] = newValue;
            if (window.localStorage) localStorage[p] = newValue;
            
            return true;
        },
    });

    const updateClass = (next:string) => {
        document.documentElement.classList.add(next);
        document.documentElement.classList.remove(next === 'dark' ? 'light' : 'dark');
    }
    /*
    // Get the current darkmode from localStorage
    let curr = ls.dm || ;
    !document.documentElement.className.length && updateClass(curr);
    // if no local storage, set ls.dm and curr to 'dark'
    if (!curr) curr = ls.dm = matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    document.documentElement.classList
    */
    // const curr = getInitialMode();
    // use curr to set state
    const [mode, setMode] = useState('dark');

    const onClick = () => {
        const c = mode;
        const n = c === 'dark' ? 'light' : 'dark';
        setMode(n);
        ls.dm = n;
        updateClass(n);
    }

    useEffect(() => {
        const root = document.documentElement;

        if (!ls.dm) {
            const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;

            if (prefersDark) {
                // root.classList.add('dark');
                ls.dm = 'dark';
            } else {
                // root.classList.add('light');
                ls.dm = 'light';
            }
        }
        root.classList.add(ls.dm);
        setMode(ls.dm);
    })
    
    return <>
        <IconToggle isActive={mode === 'dark'} onClick={onClick} label={messages[mode]}>
            {mode === 'dark' ? <Icons.Moon /> : <Icons.Sun />}
        </IconToggle>
    </>
}