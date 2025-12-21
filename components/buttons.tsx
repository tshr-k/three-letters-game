'use client';

import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faEye, faShuffle, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

interface WithClassName {
    className?: string;
}

interface WithHandleClick {
    handleClick?: React.MouseEventHandler<HTMLAnchorElement>;
}


interface ButtonProps extends React.ComponentProps<'a'>, WithClassName, React.PropsWithChildren {}

function Button(props: ButtonProps) {
    return (
        <Link title={props.title??""} onClick={props.onClick??(()=>{})} href={(props.href??"") as Url} className={`size-15 flex justify-center hover:bg-background-hover active:bg-background-pressed active:scale-90 transition duration-75 self-center p-3 rounded-full ${props.className??""}`}>
            {props.children}
        </Link>
    )
}


interface ShuffleButtonProps extends WithClassName, WithHandleClick {}

export function ShuffleButton({ handleClick, className }: ShuffleButtonProps) {
    return (
        <Button title="new puzzle" onClick={handleClick} className={className}>
            <FontAwesomeIcon icon={faShuffle} className="text-3xl text-foreground self-center select-none"/>
        </Button>
    )
}


interface HelpButtonProps extends WithClassName, WithHandleClick {}

export function HelpButton({ handleClick, className }: HelpButtonProps) {
    return (
        <Button title="help" onClick={handleClick} className={className}>
            <FontAwesomeIcon icon={faQuestionCircle} className="text-3xl text-foreground self-center select-none"/>
        </Button>
    )
}


interface AnswersButtonProps extends WithClassName, WithHandleClick {}

export function AnswersButton({ handleClick, className }: AnswersButtonProps) {
    return (
        <Button title="show answers" onClick={handleClick} className={className}>
            <FontAwesomeIcon icon={faEye} className="text-3xl text-foreground self-center select-none"/>
        </Button>
    )
}

interface LightDarkButtonProps extends WithClassName, WithHandleClick {
    isDark: boolean;
}

export function LightDarkButton({ handleClick, className, isDark }: LightDarkButtonProps) {
    return (
        <Button title={isDark ? "enable light mode" : "enable dark mode"} onClick={handleClick} className={className}>
            <FontAwesomeIcon icon={isDark ? faMoon : faSun} className="text-3xl text-foreground self-center select-none"/>
        </Button>
    )
}


interface CloseButtonProps extends WithClassName, WithHandleClick {}

export function CloseButton({ handleClick, className }: CloseButtonProps) {
    return (
        <Button onClick={handleClick} className={className}>
            <FontAwesomeIcon icon={faXmark} className="text-3xl text-foreground self-center select-none"/>
        </Button>
    )
}