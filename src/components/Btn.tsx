import type { Icon } from "@phosphor-icons/react";

type Props = {
    Text?: string;
    Icon?: Icon;
    Size?: Number;
};

export default function Btn({Text, Icon, Size}: Props) {
    Text = Text.toUpperCase()
    return (
        <button className="bg-accent font-bold hover:cursor-pointer flex p-2 rounded-xl items-center justify-center gap-1 border-accent border-3 hover:bg-white hover:text-accent text-white transition duration-100">
            {Text}
            {Icon ? <Icon size={'' + (Size ? Size : 16)} ></Icon> : null}
        </button>
    )
}