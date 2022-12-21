import ModeratorUser from "./classes/ModeratorUser.js";
import {useAsync} from "react-async";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {faCircleNodes} from "@fortawesome/free-solid-svg-icons";
import {faPerson} from "@fortawesome/free-solid-svg-icons";
import Login from "./pages/Login.jsx";
import Player from "./components/Player.jsx";
import ApiInterface from "./classes/ApiInterface.js";

let moderatingUser = null;
let players = [];
let specimens = [];
let connections = [];
const fetchModeratingUser = async () => {
    try {
        moderatingUser = await ModeratorUser.fromSession();
        let response = await ApiInterface.Request("GET", "/root/all/players");
        if(response.code === 1) {
            players = response.data;
        }
        response = await ApiInterface.Request("GET", "/root/all/specimens");
        if(response.code === 1) {
            specimens = response.data;
        }
        response = await ApiInterface.Request("GET", "/root/all/connections");
        if(response.code === 1) {
            connections = response.data;
        }
    } catch (exception) {
        return null;
    }
}
const App = () => {
    const { data, isPending, isFulfilled } = useAsync({ promiseFn: fetchModeratingUser });
    if(isPending) {
        return (
            <div className={"fixed top-0 bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-[2] gap-1"}>
                <FontAwesomeIcon className={"text-black dark:text-white text-2xl"} icon={faSpinner} spin/>
                <h1 className={"text-black dark:text-white font-bold text-xl"}>Moderator</h1>
                <p className={"text-black dark:text-white text-sm"}>Loading...</p>
            </div>
        )
    }
    if(isFulfilled) {
        if(data !== null) {
            const playerElements = players.map(player =>
                <Player key={player["license"]} license={player["license"]}
                        optionBan={moderatingUser.hasPermission("specimenBan")}
                        optionUnban={moderatingUser.hasPermission("specimenUnban")}
                        optionKick={moderatingUser.hasPermission("specimenKick")}
                        optionRemoveAvatar={moderatingUser.hasPermission("playerRemoveAvatar")}
                />
            );
            return (
                <div>
                    <div className={"p-10 bg-light-900 dark:bg-dark-400 sticky top-0 w-full drop-shadow-xl shadow-black/10"}>
                        <h1 className={"text-black dark:text-white font-bold text-3xl mb-2"}>Statistics</h1>
                        <div className={"flex flex-row items-center"}>
                            <FontAwesomeIcon className={"text-black dark:text-white text-sm mr-2"} icon={faCircleNodes}/>
                            <p className={"text-black dark:text-white text-sm"}>{connections.length} connections in total.</p>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <FontAwesomeIcon className={"text-black dark:text-white text-sm mr-2"} icon={faPerson}/>
                            <p className={"text-black dark:text-white text-sm"}>{players.length} players in total.</p>
                        </div>
                    </div>
                    <div className={"px-10 py-2"}>
                        <h2 className={"text-black dark:text-white font-bold text-2xl my-10"}>Players</h2>
                        <div className={"flex-1 overflow-auto flex flex-row flex-wrap items-center justify-center w-full gap-5"}>
                            {playerElements}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <Login/>
            )
        }
    }
}

export default App