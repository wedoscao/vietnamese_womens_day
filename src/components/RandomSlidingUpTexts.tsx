import { useState, useRef, useEffect, useMemo } from "react";
import { useWishing } from "../contexts/WishingProvider";

const randomSizes = ["text-5xl", "text-6xl", "text-7xl", "text-8xl"];

interface RandomSlidingUpTextsProps {
    className?: string,
    speed?: number,
    texts: string[]
}


function RandomSlidingUpTexts({ className = '', speed = 1, texts }: RandomSlidingUpTextsProps) {
    const [position, setPosition] = useState({
        x: 0,
        y: window.innerHeight,
    });
    const [random, setRandom] = useState(0);
    const { isWishing } = useWishing();

    const textsRef = useRef<HTMLDivElement>(null);
    const animateRef = useRef<number | null>(null);

    const xOffsets = useMemo(() => {
        return texts.map(() => { return Math.random() * (window.innerWidth - 200) })
    }, [texts, innerWidth, random]);

    const sizes = useMemo(() => {
        return texts.map(() => {
            const random = Math.random();
            const i = Math.floor(random * randomSizes.length);
            return randomSizes[i];
        })
    }, [texts, random])

    useEffect(() => {
        if (!isWishing) {
            const animate = () => {
                setPosition(prev => {
                    if (!textsRef.current) {
                        return prev;
                    }
                    const rect = textsRef.current.getBoundingClientRect();
                    let newY = prev.y - speed;

                    if (newY <= -rect.height) {
                        newY = window.innerHeight;
                        setRandom(random + 1);
                    }
                    return { x: prev.x, y: newY };
                })
                animateRef.current = requestAnimationFrame(animate);
            }

            animateRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animateRef.current) {
                cancelAnimationFrame(animateRef.current);
            }
        }
    }, [isWishing, speed]);

    useEffect(() => {
        const handleResize = () => {
            setPosition((prev) => {
                return {
                    x: 0,
                    y: prev.y,
                }
            })
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        !isWishing ?
            <>
                <div
                    ref={textsRef}
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transition: "none"
                    }}
                    className="fixed"
                >
                    {texts.map((text, index) => (
                        <div
                            key={index}
                            className={`select-none cursor-default ${sizes[index]} ${className}`}
                            style={{ marginLeft: `${xOffsets[index]}px` }}
                        >
                            {text}
                        </div>
                    ))}
                </div>
            </> :
            <></>
    );
}

export default RandomSlidingUpTexts;
