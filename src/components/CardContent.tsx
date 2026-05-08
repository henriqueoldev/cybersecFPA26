import type { JSX } from "react";

type Props = {
    Text: string;
    Placeholder?: string | null;
}

export default function CardContent({ Text, Placeholder } : Props) {
    let inputField: JSX.Element = <></>;
    if (Placeholder) {
       inputField = <input id="userInput" placeholder={Placeholder} className="w-full border-3 border-primary rounded-xl p-3 bg-dark-green" type="text" />
    }

    return (
        <div className="flex flex-col gap-5">
            {Text}
            {inputField}
        </div>
    )
}