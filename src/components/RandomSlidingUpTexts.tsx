import { useState, useRef, useEffect, useMemo } from "react";
import { useWishing } from "../contexts/WishingProvider";

const RANDOM_SIZES = ["text-xl", "text-2xl", "text-3xl", "text-4xl"];

const TEXT_PADDING = 20;

interface RandomSlidingUpTextsProps {
    className?: string;
    speed?: number;
    texts: string[];
}

function RandomSlidingUpTexts({
    className = "",
    speed = 1,
    texts
}: RandomSlidingUpTextsProps) {
    const [position, setPosition] = useState({
        x: 0,
        y: window.innerHeight
    });
    const [random, setRandom] = useState(0);
    const { isWishing } = useWishing();
    const textsRef = useRef<HTMLDivElement>(null);
    const animateRef = useRef<number | null>(null);

    const sizes = useMemo(() => {
        return texts.map(() => {
            const random = Math.random();
            const i = Math.floor(random * RANDOM_SIZES.length);
            return RANDOM_SIZES[i];
        });
    }, [texts, random]);

    const xOffsets = useMemo(() => {
        return texts.map(() => {
            return Math.random() * (window.innerWidth - TEXT_PADDING * 4);
        });
    }, [texts, window.innerWidth, random]);

    useEffect(() => {
        if (!isWishing) {
            const animate = () => {
                setPosition((prev) => {
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
                });
                animateRef.current = requestAnimationFrame(animate);
            };
            animateRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (animateRef.current) {
                cancelAnimationFrame(animateRef.current);
            }
        };
    }, [isWishing, speed]);

    useEffect(() => {
        const handleResize = () => {
            setPosition((prev) => {
                return {
                    x: 0,
                    y: prev.y
                };
            });
            setRandom((prev) => prev + 1);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return !isWishing ? (
        <>
            <div
                ref={textsRef}
                style={{
                    left: 0,
                    top: position.y,
                    transition: "none"
                }}
                className="fixed n-0"
            >
                {texts.map((text, index) => (
                    <div
                        key={index}
                        className={`select-none cursor-default pb-2 ${sizes[index]} ${className}`}
                        style={{
                            marginLeft: xOffsets[index],
                            maxWidth: `${window.innerWidth - xOffsets[index] - TEXT_PADDING}px`,
                            wordWrap: "break-word",
                            overflowWrap: "break-word"
                        }}
                    >
                        {text}
                    </div>
                ))}
            </div>
        </>
    ) : (
        <></>
    );
}

export default RandomSlidingUpTexts;
