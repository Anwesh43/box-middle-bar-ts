import React from "react";
import { useAnimatedScale, useDimension } from "./hooks";

const withContext = (MainFc : React.FC<any>) : React.FC<any> => {
    return (props : any) => {
        const {w, h} = useDimension()
        const {scale, start : onClick} = useAnimatedScale()
        const newProps = {
            ...props,
            w, 
            h, 
            scale, 
            onClick 
        }
        return (<MainFc {...newProps}>

        </MainFc>)
    }
}

export default withContext