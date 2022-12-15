import React from 'react';
import {useAsync} from "react-async";
import ApiInterface from "../classes/ApiInterface.js";

const fetchPlayer = async ({ license }) => {
    const response = await ApiInterface.Request("GET", "/player/", `license=${license}`);
    return response["data"];
}

const Avatar = ({ url }) => {
    if(url !== null) {
        return (
            <img src={url} alt={"Avatar"} className={"object-cover w-full h-full rounded-full shadow-lg shadow-black/20"}></img>
        )
    }
    return null;
}

const Player = ({ license }) => {
    const { data, isPending } = useAsync({ promiseFn: fetchPlayer, license });
    if(isPending) {
        return (
            <h1>Loading...</h1>
        )
    }
    if(data) {
        return (
            <div className={"bg-light-900 dark:bg-dark-800 text-black dark:text-white flex flex-col w-64 md:w-fit p-5 rounded-lg shadow-lg shadow-black/10 dark:shadow-none duration-200 hover:shadow-black/25 hover:shadow-lg"}>
                <div className={"flex flex-row items-center"}>
                    <div className={"w-10 h-10 mr-2"}>
                        <Avatar url={data["avatar"]}></Avatar>
                    </div>
                    <h1 className={"font-bold text-xl truncate max-w-xs"}>{data["username"]}</h1>
                </div>
                <div className={"flex flex-row items-center"}>
                    <p className={"text-xs text-light-500 w-32 md:w-fit truncate"}>{data["license"]}</p>
                    <button onClick={() =>{navigator.clipboard.writeText(data["license"]).then()} } className={"text-xs outline-none bg-light-800 dark:bg-dark-600 ml-2 p-1 duration-200 rounded-md ring-green-400/50 active:ring-4"}>Kopieren</button>
                </div>
                <hr className={"border-2 rounded-md border-black dark:border-white w-full my-2"}></hr>
            </div>
        );
    }
}

export default Player