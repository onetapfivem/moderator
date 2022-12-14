import React from 'react';
import {useAsync} from "react-async"
import ApiInterface from "./modules/ApiInterface.js";

const apiInterface = new ApiInterface();

const fetchPlayer = async ({ license }) => {
    const response = await apiInterface.Request("GET", "/player/", `license=${license}`);
    return response["data"];
}

const Player = ({ license }) => {
    const { data } = useAsync({ promiseFn: fetchPlayer, license });
    if(data) {
        return (
            <h1>Username: {data["username"]}</h1>
        )
    }
}

const App = () => {
    return <Player license={"root"} />
}

export default App