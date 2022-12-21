import React, {useState} from "react";
import ApiInterface from "../classes/ApiInterface.js";

const ChangeNameOptions = ({ license, errorState }) => {
    const [showOptions, setShowOptions] = useState(false)
    const toggleOptions = () => {
        setShowOptions(!showOptions);
        errorState("");
    }
    const [username, setUsername] = useState("")
    const executeChangeName = async () => {
        setShowOptions(false);
        if(username === "") {
            errorState("Username is empty.");
            return;
        }
        errorState("");
        const response = await ApiInterface.JsonRequest("PATCH", "/root/player/username", JSON.stringify({
            license: license,
            username: username
        }));
        if(response.code === 1) {
            window.location.reload();
        } else {
            errorState(response.message);
        }
    }
    return (
        <div>
            <button onClick={toggleOptions} className={"ml-2 text-white text-sm bg-orange-500 py-1 px-3 rounded-md w-fit duration-200 ring-orange-500/50 hover:ring-4 active:bg-orange-400"}>Edit</button>
            {showOptions &&
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl flex items-center justify-center z-[2]" onClick={() => { setShowOptions(false) }}>
                    <div className={"bg-light-900 dark:bg-dark-400 p-5 rounded-lg mx-10 shadow-lg shadow-black/25"} onClick={e => { e.stopPropagation(); }}>
                        <div className={"flex flex-row items-center gap-3"}>
                            <input onInput={evt => setUsername(evt.target.value)} type={"text"} placeholder={"New Username"} className={"outline-none text-xs bg-light-800 dark:bg-dark-500 text-black dark:text-white px-3 py-2 rounded-md w-full duration-200 ring-green-400/50 hover:ring-4 focus:ring-green-400/50 focus:ring-4"}></input>
                            <button onClick={executeChangeName} className={"text-white text-xs font-bold bg-orange-500 w-full rounded-md px-3 py-2 duration-200 ring-orange-500/50 hover:ring-4 active:bg-orange-400"}>Change Username.</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChangeNameOptions