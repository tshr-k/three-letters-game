"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react"

interface InputBoxProps {
    isError: boolean;
    checkSubmission(submission: string, setInputValue: React.Dispatch<React.SetStateAction<string>>): void;
    targetTrigram: string;
}

export function InputBox({ isError, checkSubmission, targetTrigram }: InputBoxProps) {
    let [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setInputValue("");
    }, [targetTrigram]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value.toUpperCase().trim().replace(/[^a-zA-Z]/g, ""));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        checkSubmission(inputValue, setInputValue);
    }

    return (
        <form className="h-fit w-fit self-center mt-4 mb-5" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} autoFocus={true} maxLength={13} placeholder={"type here"} value={inputValue} className={`text-xl border-accent bg-black border-2 placeholder-accent focus:placeholder-transparent h-10 w-50 text-black selection:bg-accent-selected focus:bg-accent -outline-offset-1 ${isError ? "outline-bad-input text-bad-input" : "outline-transparent"} transition duration-200 rounded-xl ps-2.5 pe-2.5 text-center roboto-mono-heavy text-2xl`}/>
        </form>
    )
}