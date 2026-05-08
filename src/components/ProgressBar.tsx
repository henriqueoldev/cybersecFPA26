import type { JSX } from "react";

type Props = {
    points: number;
    progress: number;
}

export default function ProgressBar({ points, progress }: Props) {
    let pointsElements: JSX.Element[] = [];
    for (let i = 0; i < points; i++) {
        if (i < progress) {
            pointsElements.push(
                <li className="ActivePoint w-4 h-4 bg-secondary z-1 rounded-full">{}</li>
            )
        } else {
            pointsElements.push(
                <li className="ActivePoint w-4 h-4 bg-primary z-1 rounded-full">{}</li>
            )
        }
    }
    return (
        <div className="backdrop-blur-[2px] bg-dark-green-50 p-5 rounded-xl flex flex-col gap-5 font-bold">
            <h3>QUESTÃO {progress} DE {points}</h3>
            <ul className="flex items-center justify-around relative">
            <div className="w-full absolute h-[5px] rounded-xl bg-secondary-50"></div>
            {pointsElements}
        </ul>
        </div>
    )
}