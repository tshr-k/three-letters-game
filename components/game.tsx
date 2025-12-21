'use client';

import { useEffect, useState } from "react"
import { FoundWordsBox } from "./found-words"
import { InputBox } from "./input-box"
import { TargetTrigram } from "./target-trigram"
import { TrigramToWordIdxs } from "../app/page"
import { ErrorBox } from "./error-box";
import { ShuffleButton, LightDarkButton, HelpButton, AnswersButton } from "./buttons";
import { Modal } from "./modal";
import { nanoid } from "nanoid";

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
    
    let [targetTrigram, setTargetTrigram] = useState("");
    let [foundWords, setFoundWords] = useState<string[]>([]);
    let [errorMessage, setErrorMessage] = useState('');
    let [isError, setIsError] = useState(false);
    let [isDark, setIsDark] = useState(true);
    let [activeScreen, setActiveScreen] = useState(Screen.Main);

    useEffect(() => {
        setTargetTrigram(randomTrigram());
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [isDark])


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

    let answers: string[] = [];
    if (targetTrigram) {    
        answers = trigramToWordIdxs[targetTrigram].map(wordIdx => words[wordIdx]);
    }

    return (
        <div className="flex flex-col h-full w-full relative">
            <Modal heading={"Help"} meScreen={Screen.Help} activeScreen={activeScreen} setActiveScreen={setActiveScreen}>
                Find words that contain the given letter combination!
                <ul className="list">
                    <li key="newpuzzle"><ShuffleButton className="inline pointer-events-none"/>Start a new puzzle</li>
                    <li key="lightdark"><LightDarkButton className="inline pointer-events-none" isDark={isDark}/>Switch to {isDark ? "light" : "dark"} mode</li>
                    <li key="revealanswers"><AnswersButton className="inline pointer-events-none"/>Reveal the answers</li>
                </ul>
            </Modal>

            <Modal heading={"Answers"} meScreen={Screen.Answers} activeScreen={activeScreen} setActiveScreen={setActiveScreen}>
                <div className="w-fit">tap to reveal</div>
                <ul tabIndex={0} className="h-full rounded-[5px] text-transparent bg-gray pl-5 pb-10 hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground pr-2.5 text-xl overflow-y-auto sm:overflow-y-hidden overflow-x-hidden hover:pr-0 hover:overflow-y-auto scroll-smooth hover-scroll-shadow w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {answers.filter((answer) => answer.length <= 13).map(answer => <li key={nanoid()} className={foundWords.includes(answer.toUpperCase()) ? "text-gray" : "text-inherit"}>{answer}</li>)}
                </ul>
            </Modal>

            <ErrorBox message={errorMessage} isError={isError} setIsError={setIsError}/>
            
            <TargetTrigram targetTrigram={targetTrigram || "..."} className={foundWords.length ? "mt-12" : "mt-auto"}/>
            
            <InputBox isError={isError} checkSubmission={checkSubmission} targetTrigram={targetTrigram}/>
            
            <FoundWordsBox foundWords={foundWords}/>
            
            <div className={`${foundWords.length ? "mb-3 w-full" : "mb-auto w-65"} transition-all duration-700 flex h-fit self-center justify-between pl-6 pr-6`}>
                <HelpButton handleClick={() => setActiveScreen(Screen.Help)}/>
                <LightDarkButton isDark={isDark} handleClick={() => setIsDark(!isDark)} className={`${foundWords.length ? "absolute top-6 right-6 z-20 ml-0": ""}`}/>
                <AnswersButton handleClick={() => setActiveScreen(Screen.Answers)} className={`${foundWords.length ? "visible absolute top-6 left-6 z-20": "invisible hidden"}`}/>
                <ShuffleButton handleClick={newTrigram}/>
            </div>
        </div>
    )
}
