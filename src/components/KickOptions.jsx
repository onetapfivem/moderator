import React, {useState} from "react";
import ApiInterface from "../classes/ApiInterface.js";

const KickOptions = ({ license, errorState }) => {
    const [showOptions, setShowOptions] = useState(false)
    const toggleOptions = () => {
        setShowOptions(!showOptions);
        errorState("");
    }
    const OptionsModal = ({ children, shown, close }) => {
        return shown ? (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[2]" onClick={() => { close() }}>
                <div className={"bg-light-900 dark:bg-dark-400 p-5 rounded-lg mx-10"} onClick={e => { e.stopPropagation(); }}>
                    {children}
                </div>
            </div>
        ) : null;
    }
    const [reason, setReason] = useState("")
    const executeKick = async () => {
        setShowOptions(false);
        if(reason === "") {
            errorState("Reason is empty.");
            return;
        }
        errorState("");
        const response = await ApiInterface.JsonRequest("POST", "/specimen/kick", JSON.stringify({
            license: license,
            reason: reason
        }));
        if(response.code === 1) {
            setShowOptions(false);
        } else {
            errorState(response.message);
        }
    }
    return (
        <div>
            <button onClick={toggleOptions} className={"my-2 text-white text-sm bg-blue-500 py-1 px-3 rounded-md w-fit duration-200 ring-blue-500/50 hover:ring-4 active:bg-blue-400"}>Kick</button>
            <OptionsModal shown={showOptions} close={() => {setShowOptions(false)}}>
                <div className={"flex flex-row items-center gap-3"}>
                    <input onInput={evt => setReason(evt.target.value)} type={"text"} placeholder={"Reason"} className={"outline-none text-xs bg-light-800 dark:bg-dark-500 text-black dark:text-white px-3 py-2 rounded-md w-full duration-200 ring-green-400/50 hover:ring-4 focus:ring-green-400/50 focus:ring-4"}></input>
                    <button onClick={executeKick} className={"text-white text-xs font-bold bg-blue-500 w-full rounded-md px-3 py-2 duration-200 ring-blue-500/50 hover:ring-4 active:bg-blue-400"}>Finalize Kick.</button>
                </div>
            </OptionsModal>
        </div>
    )
}

export default KickOptions