import BouncingText from "./components/BoucingText"

const texts = ["Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test"];

function randomSize() {
    const colors = ["text-5xl", "text-6xl", "text-7xl", "text-8xl"];
    const max = colors.length;
    const random = Math.floor(Math.random() * max);
    return colors[random];

}

function App() {
    return (
        <>
            <div className="w-full h-full bg-[#F8E8E8]">
                {
                    texts.map((text) => <BouncingText text={text} className={`font-bold text-[#2C2C2C] ${randomSize()}`} />)
                }
            </div>
        </>
    )
}

export default App;
