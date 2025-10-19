import { useState, useRef, useEffect, useMemo } from "react";
import { useOpening } from "../contexts/OpeningProvider";
import { useFirstSliding } from "../contexts/FirstSlidingProvider";
import { useClosing } from "../contexts/ClosingProvider";

const RANDOM_SIZES = ["text-lg", "text-xl", "text-2xl", "text-3xl"];

const TEXT_PADDING = 80;

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
    const { isFirst, setIsFirst } = useFirstSliding();
    const { isOpening } = useOpening();
    const { setIsClosing } = useClosing();
    const [position, setPosition] = useState({
        x: 0,
        y: window.innerHeight
    });
    const [xOffsets, setXOffsets] = useState<number[]>([]);
    const [random, setRandom] = useState(false);
    const [isLeft, setIsLeft] = useState(true);
    const textsRef = useRef<HTMLDivElement>(null);
    const animateRef = useRef<number | null>(null);

    const sizes = useMemo(() => {
        return texts.map(() => {
            const random = Math.random();
            const i = Math.floor(random * RANDOM_SIZES.length);
            return RANDOM_SIZES[i];
        });
    }, [texts]);

    useEffect(() => {
        const halfWidth = window.innerWidth / 2;

        const offsets = texts.map(() => {
            const maxRandom = isLeft ? window.innerWidth : halfWidth - 1;
            const offset =
                Math.random() * (maxRandom - TEXT_PADDING * 4 + 1) +
                TEXT_PADDING;

            setIsLeft((isLeft) => !isLeft);

            return offset;
        });

        setXOffsets(offsets);
    }, [texts, random]);

    useEffect(() => {
        if (!isOpening && isFirst) {
            const animate = () => {
                setPosition((prev) => {
                    if (!textsRef.current) {
                        return prev;
                    }
                    const rect = textsRef.current.getBoundingClientRect();
                    let newY = prev.y - speed;
                    if (newY <= -rect.height) {
                        setIsFirst(false);
                        setIsClosing(true);
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
    }, [isOpening, isFirst, speed]);

    useEffect(() => {
        const handleResize = () => {
            setPosition((prev) => {
                return {
                    x: 0,
                    y: prev.y
                };
            });
            setRandom((prev) => !prev);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return !isOpening && isFirst ? (
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
                        className={`select-none cursor-default pb-4 ml-4 ${sizes[index]} ${className}`}
                        style={{
                            marginLeft: xOffsets[index],
                            maxWidth: `${window.innerWidth - xOffsets[index] - TEXT_PADDING}px`,
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "pre-line"
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
