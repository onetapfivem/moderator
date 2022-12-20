import ApiInterface from "../classes/ApiInterface.js";

const RemoveAvatarOptions = ({ license, errorState }) => {
    const executeRemoveAvatar = async () => {
        errorState("");
        const response = await ApiInterface.Request("DELETE", "/root/player/avatar", `license=${license}`);
        if(response.code === 1) {
            window.location.reload();
        } else {
            errorState(response.message);
        }
    }
    return (
        <div>
            <button onClick={executeRemoveAvatar} className={"my-2 text-white text-sm bg-purple-500 py-1 px-3 rounded-md w-fit duration-200 ring-purple-500/50 hover:ring-4 active:bg-purple-400"}>Remove Avatar</button>
        </div>
    )
}

export default RemoveAvatarOptions