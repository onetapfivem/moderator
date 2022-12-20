import React, {useState} from 'react';
import {useAsync} from "react-async";
import ApiInterface from "../classes/ApiInterface.js";
import BanOptions from "./BanOptions.jsx";
import UnbanOptions from "./UnbanOptions.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import KickOptions from "./KickOptions.jsx";
import RemoveAvatarOptions from "./RemoveAvatarOptions.jsx";

const fetchPlayer = async ({ license }) => {
    const response = await ApiInterface.Request("GET", "/player/", `license=${license}`);
    return response["data"];
}

const Avatar = ({ url }) => {
    if(url !== null) {
        return (
            <div className={"w-10 h-10 mr-2"}>
                <img src={url} alt={"Avatar"} className={"object-cover w-full h-full rounded-full shadow-lg shadow-black/20"}></img>
            </div>
        )
    }
    return null;
}

const Player = ({ license, optionBan = false, optionUnban = false, optionKick = false, optionRemoveAvatar = false }) => {
    const { data } = useAsync({ promiseFn: fetchPlayer, license });
    const [error, setError] = useState("");
    if(data) {
        return (
            <div className={"bg-light-900 dark:bg-dark-800 text-black dark:text-white flex flex-col w-full p-5 max-w-2xl h-40 rounded-md md:shadow-xl shadow-black/25 shadow-none"}>
                <div className={"flex flex-row items-center"}>
                    <Avatar url={data["avatar"]}></Avatar>
                    <h1 className={"font-bold text-xl truncate max-w-xs"}>{data["username"]}</h1>
                </div>
                <div className={"flex flex-row items-center"}>
                    <p className={"text-xs text-light-500 truncate"}>{data["license"]}</p>
                    <button onClick={() =>{navigator.clipboard.writeText(data["license"]).then()} } className={"text-xs outline-none bg-light-800 dark:bg-dark-600 ml-2 p-1 duration-200 rounded-md ring-green-400/50 active:ring-4"}>Copy</button>
                </div>
                <hr className={"border-2 rounded-md border-black dark:border-white w-full my-2"}></hr>
                <div className={"flex flex-row gap-2"}>
                    {optionUnban && <UnbanOptions errorState={setError} license={data["license"]}/>}
                    {optionBan && <BanOptions errorState={setError} license={data["license"]}/>}
                    {optionKick && <KickOptions errorState={setError} license={data["license"]}/>}
                    {optionRemoveAvatar && <RemoveAvatarOptions errorState={setError} license={data["license"]}/>}
                </div>
                {error !== "" ?
                    <div className={"flex flex-row items-center text-red-500 mt-2 p-2 bg-light-900 dark:bg-dark-600 rounded-md border-2 border-red-500/20"}>
                        <FontAwesomeIcon className={"text-sm mr-1"} icon={faTriangleExclamation}/>
                        <p className={"text-sm"}>{error}</p>
                    </div> : null
                }
            </div>
        );
    }
}

export default Player