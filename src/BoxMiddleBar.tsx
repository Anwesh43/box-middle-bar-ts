import React from "react";
import { useAnimatedScale, useStyle } from "./hooks";
import withContext from "./withContext";

interface BoxMiddleBarProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void 
}


const BoxMiddleBar = (props : BoxMiddleBarProps) => {
    const {parentStyle, boxStyle, middleBarStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()}>
            <div style = {boxStyle()}>
            </div>
            {[0, 1].map((i : number) => (<div style = {middleBarStyle(i)}></div>))}
        </div>
    )
}

export default withContext(BoxMiddleBar)