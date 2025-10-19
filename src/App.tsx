import Closing from "./components/Closing";
import Opening from "./components/Opening";
import RandomSlidingUpTexts from "./components/RandomSlidingUpTexts";
import { ClosingProvider } from "./contexts/ClosingProvider";
import { FirstSlidingProvider } from "./contexts/FirstSlidingProvider";
import { OpeningProvider } from "./contexts/OpeningProvider";

import opening from "./opening.json";
import wishes from "./wishes.json";
const AFTER_CREDIT = [
    "Có lẽ bây giờ, nhiều người trong chúng ta đang cảm giác mông lung về lựa chọn đối với ngành này.",
    "Dù sao thì, hãy luôn nhớ rằng, các bạn đã rất tuyệt vời khi đậu vào đây, và mong rằng các bạn sẽ sống thật tốt, thành công trên con đường mình chọn sau này."
];

function shuffle(array: any[]) {
    let currentIndex = array.length;
    let newArray = array.slice();

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex],
            newArray[currentIndex]
        ];
    }
    return newArray;
}

function App() {
    return (
        <>
            <OpeningProvider>
                <FirstSlidingProvider>
                    <ClosingProvider>
                        {" "}
                        <div className="w-full h-full bg-[#F8E8E8]">
                            <Opening
                                texts={opening}
                                speed={2}
                                className="font-bold text-xl"
                            ></Opening>
                            <RandomSlidingUpTexts
                                texts={shuffle(wishes)}
                                className="font-bold"
                                speed={2}
                            />
                            <Closing
                                texts={AFTER_CREDIT}
                                speed={2}
                                className="font-bold text-xl"
                            ></Closing>
                        </div>
                    </ClosingProvider>
                </FirstSlidingProvider>
            </OpeningProvider>
        </>
    );
}

export default App;
