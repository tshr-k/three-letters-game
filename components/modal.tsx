'use client';

import { CloseButton } from "./buttons";
import { Screen } from "./game";

interface ModalProps {
    heading: string;
    meScreen: Screen;
    activeScreen: Screen;
    setActiveScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

export function Modal({ heading, meScreen, activeScreen, setActiveScreen }: ModalProps) {
    return (
        <div className={`${activeScreen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed size-full z-50 p-5 transition-opacity duration-300`}>
            <div className="flex flex-col size-full bg-background-hover relative rounded-[45]">
                <h2 className="block self-center bg-accent text-black text-3xl sm:text-6xl pt-3 pb-3 sm:pt-5 sm:pb-5 mt-5 sm:mt-10 h-fit pl-8 pr-8 rounded-full roboto-mono-heavy">{heading}</h2>
                <div className="mt-10 roboto-mono-heavy self-center text-3xl">Hello everyone. <br />hi guys</div> 
                <CloseButton handleClick={()=>{setActiveScreen(Screen.Main)}} className="hover:bg-background-pressed absolute top-5 right-5"/>
            </div>
        </div>
    )
}