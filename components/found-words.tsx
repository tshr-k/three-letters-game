'use client';

import { nanoid } from "nanoid";

interface FoundWordsBoxProps {
    foundWords: string[];
}

export function FoundWordsBox({ foundWords }: FoundWordsBoxProps) {
    const listItems = foundWords.map(word => {
        return (
            <li key={nanoid()}>
                {`${word.toUpperCase()}`}
            </li>
        )    
    })

    return (
        <ul className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-cols-fr overflow-y-auto min-h-0 scroll-shadow self-center text-center ${foundWords.length ? "grow h-full" : "grow-0"} transition-all duration-700 roboto-mono-heavy text-2xl text-gray`}>
            {listItems}
        </ul>
    )
}