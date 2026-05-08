import type { Icon } from "@phosphor-icons/react";

type Props = {
    Text?: string;
    Icon?: Icon;
    Size?: Number;
    IconLeft?: Boolean;
    Fallback?: () => void;
};

export default function Btn({Text, Icon, Size, Fallback, IconLeft}: Props) {
    let TextRight = IconLeft ? Text?.toUpperCase() : ''
    Text = IconLeft ? '' : Text?.toUpperCase()
    return (
        <button onClick={Fallback} className="bg-accent font-bold hover:cursor-pointer flex p-2 rounded-xl items-center justify-center gap-1 border-accent border-3 hover:-translate-y-1 active:-translate-y-0 text-white transition duration-100">
            {Text}
            {Icon ? <Icon size={'' + (Size ? Size : 16)} ></Icon> : null}
            {TextRight}
        </button>
    )
}