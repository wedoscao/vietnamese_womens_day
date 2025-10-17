import RandomSlidingUpTexts from "./components/RandomSlidingUpTexts";
import Wishes from "./components/Wishes";
import { WishingProvider } from "./contexts/WishingProvider";

const wishes = ["Wish", "Wish", "Wish", "Wish", "Wish", "Wish", "Wish", "Wish", "Wish", "Wish", "Wish", "Wish", "Wish", "Wish", "Wish"]

const texts = ["Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test"];

function App() {
    return (
        <>
            <WishingProvider>
                <div className="w-full h-full bg-[#F8E8E8]">
                    <Wishes wishes={wishes} speed={2} className="font-bold text-3xl"></Wishes>
                    <RandomSlidingUpTexts texts={texts} className="font-bold" speed={2} />
                </div>
            </WishingProvider >
        </>
    )
}

export default App;
