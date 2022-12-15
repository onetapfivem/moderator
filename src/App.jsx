import Player from "./components/Player.jsx";

function App() {
    return (
        <div className={"text-black dark:text-white p-5"}>
            <h1 className={"text-xl font-bold"}>Players</h1>
            <Player license={"1283475b2ecc03ae6d18b5a1a6248d04ac197a71"}/>
        </div>
    )
}

export default App