import RandomSlidingUpTexts from "./components/RandomSlidingUpTexts";
import Wishes from "./components/Wishes";
import { WishingProvider } from "./contexts/WishingProvider";
import wishes from "./wishes.json";

const texts = [
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt",
    "Chúc các bạn nữ luôn xinh đẹp",
    "Chúc các bạn nữ có thật nhiều sức khoẻ",
    "Chúc các bạn nữ có kết quả học tập tốt"
];

function App() {
    return (
        <>
            <WishingProvider>
                <div className="w-full h-full bg-[#F8E8E8]">
                    <Wishes
                        texts={texts}
                        speed={2}
                        className="font-bold text-xl"
                    ></Wishes>
                    <RandomSlidingUpTexts
                        texts={wishes}
                        className="font-bold"
                        speed={2}
                    />
                </div>
            </WishingProvider>
        </>
    );
}

export default App;
