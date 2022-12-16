import ApiInterface from "../classes/ApiInterface.js";

const UnbanOptions = ({ license, errorState }) => {
    const executeUnban = async () => {
        errorState("");
        const response = await ApiInterface.Request("DELETE", "/specimen/ban", `license=${license}`);
        if(response.code !== 1) {
            errorState(response.message);
        }
    }
    return (
        <div>
            <button onClick={executeUnban} className={"my-2 text-white text-sm bg-orange-500 py-1 px-3 rounded-md w-fit duration-200 ring-orange-500/50 hover:ring-4 active:bg-orange-400"}>Unban</button>
        </div>
    )
}

export default UnbanOptions