import {useState, useEffect, CSSProperties} from 'react'

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20) => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) : number => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }

                        return prev + scGap 
                    })
                    
                })
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        const resizeListener = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        window.addEventListener('resize', resizeListener, false)
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    })
    return {
        w, 
        h
    }
}

interface UseStyleProps {
   parentStyle : () => CSSProperties,
   boxStyle : () => CSSProperties,
   middleBarStyle : (i : number) => CSSProperties 
}

export const useStyle = (w : number, h : number, scale : number) : UseStyleProps  => {
    const size : number = Math.min(w, h) / 10
    const barW : number = size / 4
    const background : string = "indigo"
    const middleBarBackground : string = "#212121"
    const position = 'absolute'
    return {
        parentStyle() : CSSProperties {
            const left = `${w / 2}px`
            const top = `${h / 2}px`
            return {
                position, 
                left, 
                top 
            }
        },
        boxStyle() {
            return {
                position,
                left: `${-size / 2}px`,
                top: `${-size / 2}px`,
                width: `${size}px`,
                height: `${size}px`,
                background
            }
        },
        middleBarStyle(i : number) : CSSProperties {
            return {
                position,
                left: `${-barW / 2}px`,
                top: `${-size / 2}px`,
                width: `${barW}px`,
                height: `${size}px`,
                transform: `rotate(${90 * i}deg)`,
                background: middleBarBackground 
            }
        }
    }
}