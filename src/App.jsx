import ModeratorUser from "./classes/ModeratorUser.js";
import {useAsync} from "react-async";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const fetchModeratingUser = async () => {
    try {
        return await ModeratorUser.fromSession();
    } catch (exception) {
        return null;
    }
}
const App = () => {
    const { data, isPending, isFulfilled } = useAsync({ promiseFn: fetchModeratingUser });
    if(isPending) {
        return (
            <div className={"fixed top-0 bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-[2] gap-1"}>
                <FontAwesomeIcon className={"text-black dark:text-white text-xl"} icon={faSpinner} spin/>
                <h1 className={"text-black dark:text-white font-bold text-xl"}>Moderator</h1>
                <p className={"text-black dark:text-white text-sm"}>Fetching moderating user...</p>
            </div>
        )
    }
    if(isFulfilled) {
        if(data !== null) {
            // show dashboard
        } else {
            // show login
        }
    }
}

export default App