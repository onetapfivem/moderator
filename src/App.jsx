import ModeratorUser from "./classes/ModeratorUser.js";
import {useAsync} from "react-async";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import Login from "./pages/Login.jsx";
import Player from "./components/Player.jsx";

let moderatingUser = null;
const fetchModeratingUser = async () => {
    try {
        moderatingUser = await ModeratorUser.fromSession();
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
            return (
                <Player license={"efbcd83e2a2a893214f6dd2f1db84e80fba67919"} optionBan={moderatingUser.hasPermission("specimenBan")} optionUnban={moderatingUser.hasPermission("specimenUnban")} optionKick={moderatingUser.hasPermission("specimenKick")}/>
            )
        } else {
            return (
                <Login/>
            )
        }
    }
}

export default App