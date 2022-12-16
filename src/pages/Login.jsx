import {useState} from "react";
import ModeratorUser from "../classes/ModeratorUser.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

const executeLogin = async (username, password, errorState) => {
    try {
        await ModeratorUser.login(username, password);
        return true;
    } catch (exception) {
        errorState(exception.message);
    }
}
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onLoginClick = () => {
        executeLogin(username, password, setError).then((result) => {
            if(result) {
                window.location.reload();
            }
        });
    }
    return (
        <div className={"w-screen h-screen flex flex-col items-center justify-center"}>
            <div className={"text-black dark:text-white px-10 w-full md:w-96"}>
                <h1 className={"text-2xl font-bold"}>Login</h1>
                <hr className={"border-2 rounded-md border-black dark:border-white w-full my-2"}></hr>
                <div className={"w-full flex flex-col items-center gap-3"}>
                    <input onInput={evt => setUsername(evt.target.value)} className={"outline-none rounded-md bg-light-900 dark:bg-dark-500 py-2 px-3 text-sm w-full duration-200 ring-green-400/50 hover:ring-4 focus:ring-4"} type={"text"} placeholder={"Username"}/>
                    <input onInput={evt => setPassword(evt.target.value)} className={"outline-none rounded-md bg-light-900 dark:bg-dark-500 py-2 px-3 text-sm w-full duration-200 ring-green-400/50 hover:ring-4 focus:ring-4"} type={"password"} placeholder={"Password"}/>
                    <button onClick={onLoginClick} className={"rounded-md bg-light-900 dark:bg-dark-500 py-2 px-3 text-sm w-full duration-200 ring-green-400/50 hover:ring-4 active:bg-light-800 dark:active:bg-dark-400"}>Login</button>
                </div>
                {error !== "" ?
                    <div className={"flex flex-row items-center text-red-500 mt-2 p-2 bg-light-900 dark:bg-dark-600 rounded-md border-2 border-red-500/20"}>
                        <FontAwesomeIcon className={"text-sm mr-1"} icon={faTriangleExclamation}/>
                        <p className={"text-sm"}>{error}</p>
                    </div> : null
                }
            </div>
        </div>
    )
}
export default Login