import { useEffect, useState } from "react";

type Heart = {
    id: number;
    x: number;
    y: number;
};

const N_HEARTS = 120;

function Hearts({ className = "" }: { className?: string }) {
    const [hearts, setHearts] = useState<Heart[]>([]);
    useEffect(() => {
        const generateHearts = () => {
            const heartsArray: Heart[] = [];

            for (let i = 0; i < N_HEARTS; i++) {
                const side = i % 4;
                let x = 0,
                    y = 0;

                switch (side) {
                    case 0:
                        x = Math.random() * window.innerWidth;
                        y = Math.random() * 40;
                        break;
                    case 1:
                        x = window.innerWidth - Math.random() * 40;
                        y = Math.random() * window.innerHeight;
                        break;
                    case 2:
                        x = Math.random() * window.innerWidth;
                        y = window.innerHeight - Math.random() * 40;
                        break;
                    case 3:
                        x = Math.random() * 40;
                        y = Math.random() * window.innerHeight;
                        break;
                }

                heartsArray.push({ id: i, x, y });
            }
            setHearts(heartsArray);
        };

        generateHearts();

        window.addEventListener("resize", generateHearts);
        return () => window.removeEventListener("resize", generateHearts);
    }, []);

    return (
        <div className={`fixed inset-0 pointer-events-none ${className}`}>
            {hearts.map((heart) => (
                <img
                    key={heart.id}
                    src="/vietnamese_womens_day/heart.png"
                    alt="heart"
                    className="absolute w-6 h-6 opacity-70 animate-pulse"
                    style={{
                        left: heart.x,
                        top: heart.y
                    }}
                />
            ))}
        </div>
    );
}

export default Hearts;
