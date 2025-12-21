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
        <ul className={`flex flex-wrap flex-col min-h-0 w-fit gap-x-10 self-center text-center ${foundWords.length ? "grow" : "grow-0"} transition-all duration-700 roboto-mono-heavy text-2xl text-gray-300 selection:bg-accent selection:text-black`}>
            {listItems}
        </ul>
    )
}