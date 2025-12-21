"use client";

import React from "react";
import { CloseButton } from "./buttons";
import { Screen } from "./game";

interface ModalProps extends React.PropsWithChildren {
    heading: string;
    meScreen: Screen;
    activeScreen: Screen;
    setActiveScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

export function Modal(props: ModalProps) {
    return (
        <div className={`${(props.activeScreen==props.meScreen) ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed size-full z-50 p-2 sm:p-5 transition-opacity duration-300`}>
            <div className="flex flex-col justify-center size-full relative bg-background-hover rounded-[25] sm:rounded-[45] p-5 sm:p-10">
                <h2 className="block self-center bg-accent text-black text-4xl sm:text-5xl pt-3 pb-3 sm:pt-5 sm:pb-5 h-fit pl-8 pr-8 rounded-full roboto-mono-heavy">{props.heading}</h2>
                <div className="size-full mt-10 roboto-mono-heavy self-center overflow-y-hidden text-2xl sm:text-4xl relative flex flex-col text-center">
                    {props.children}
                </div> 
                <CloseButton handleClick={()=>{props.setActiveScreen(Screen.Main)}} className="hover:bg-background-pressed absolute top-1.5 right-1.5 sm:top-5 sm:right-5"/>
            </div>
        </div>
    )
}