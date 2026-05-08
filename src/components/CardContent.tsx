type Props = {
    Text: string;
}

export default function CardContent({ Text } : Props) {
    return (
        <div>
            {Text}
        </div>
    )
}