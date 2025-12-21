'use client';

import { useEffect, useState } from "react"
import { FoundWordsBox } from "./found-words"
import { InputBox } from "./input-box"
import { TargetTrigram } from "./target-trigram"
import { TrigramToWordIdxs } from "../app/page"
import { ErrorBox } from "./error-box";
import { ShuffleButton, LightDarkButton, HelpButton, AnswersButton } from "./buttons";
import { Modal } from "./modal";

export enum Screen {
    Main,
    Help,
    Answers
};

interface GameProps {
    trigramCumulativeP: [number, string][];
    trigramToWordIdxs: TrigramToWordIdxs;
    words: string[];
}

export function Game({ trigramCumulativeP, trigramToWordIdxs, words }: GameProps) {
    function randomTrigram() {
        const x = Math.random();
        let s = 0;
        for (let [cumulativeP, trigram] of trigramCumulativeP) {
            s += cumulativeP;
            if (s > x) {
                return trigram;
            }
        }
        return "lol";
    }
    
    let [targetTrigram, setTargetTrigram] = useState(randomTrigram());
    let [foundWords, setFoundWords] = useState<string[]>([]);
    let [errorMessage, setErrorMessage] = useState('');
    let [isError, setIsError] = useState(false);
    let [isDark, setIsDark] = useState(true);
    let [activeScreen, setActiveScreen] = useState(Screen.Main);

    if (typeof window !== "undefined") {
        const root = window.document.documentElement;
        useEffect(() => {
            if (isDark) root.classList.add("dark");
            else root.classList.remove("dark");
        }, [isDark])
    }

    function checkSubmission(submittedInput: string, setInputValue: Function) {
        const submittedInputLower = submittedInput.toLowerCase();
        if (!submittedInputLower.includes(targetTrigram)) {
            setErrorMessage(`'${targetTrigram.toUpperCase()}' missing`);
            setIsError(true);
        } else if (!words.includes(submittedInputLower)) {
            setErrorMessage("Invalid word");
            setIsError(true);
        } else if (foundWords.includes(submittedInput)) {
            setErrorMessage("Already guessed");
            setIsError(true);
        } else {
            setFoundWords(foundWords.concat(submittedInput));
            setInputValue('');
            setIsError(false);
        }
    }

    function newTrigram(): string {
        const newTrigram = randomTrigram();
        setTargetTrigram(newTrigram);
        setFoundWords([]);
        setIsError(false);
        return newTrigram;
    }

    const answers = trigramToWordIdxs[targetTrigram].map(wordIdx => words[wordIdx]);

    return (
        <div className="flex flex-col h-full w-full relative">
            <Modal heading={"Help"} meScreen={Screen.Help} activeScreen={activeScreen} setActiveScreen={setActiveScreen}/>
            <ErrorBox message={errorMessage} isError={isError} setIsError={setIsError}/>
            <TargetTrigram targetTrigram={targetTrigram}/>
            <InputBox isError={isError} checkSubmission={checkSubmission} targetTrigram={targetTrigram}/>
            <FoundWordsBox foundWords={foundWords}/>
            <div className={`${foundWords.length ? "mb-3 w-full" : "mb-auto w-70"} transition-all duration-700 flex h-fit self-center justify-between pl-6 pr-6`}>
                <HelpButton handleClick={() => setActiveScreen(Screen.Help)}/>
                <LightDarkButton isDark={isDark} handleClick={() => setIsDark(!isDark)} className={`${foundWords.length ? "absolute top-6 right-6 z-20 ml-0": ""}`}/>
                <AnswersButton handleClick={() => setActiveScreen(Screen.Answers)} className={`${foundWords.length ? "absolute top-6 left-6 z-20": ""}`}/>
                <ShuffleButton handleClick={newTrigram} className={`${foundWords.length ? "visible" : "invisible hidden"}`}/>
            </div>
        </div>
    )
}