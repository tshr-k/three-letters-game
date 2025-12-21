"use client";

interface TargetTrigramProps {
    targetTrigram: string;
    className?: string;
}

export function TargetTrigram({ targetTrigram, className }: TargetTrigramProps) {
    return (
        <h1 className={"roboto-mono-heavy text-9xl self-center " + className}>{targetTrigram}</h1>
    )
}