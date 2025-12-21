interface TargetTrigramProps {
    targetTrigram: string
}

export function TargetTrigram({ targetTrigram }: TargetTrigramProps) {
    return (
        <h1 className="roboto-mono-heavy text-9xl self-center mt-auto">{targetTrigram}</h1>
    )
}