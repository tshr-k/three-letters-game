'use client';

import { useEffect, useState } from "react";

interface ErrorBoxProps {
    message: string;
    isError: boolean;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ErrorBox({ message, isError, setIsError }: ErrorBoxProps) {
    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                setIsError(false);
            }, 1000);
        
            return () => clearTimeout(timer);
        }
    }, [isError]);

    return (
        <div className="h-13 w-full flex justify-center relative top-6">
            <div className={`self-center bg-bad-input text-white ${isError ? "opacity-100" : "opacity-0"} roboto-mono-heavy pl-2 pr-2 rounded-full transition duration-500`}>
                {message}
            </div>
        </div>
    )
}