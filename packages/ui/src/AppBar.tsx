import { Button } from "./button"

interface AppBarProps{
    onSignIn : any;
    onSignOut : any;
    user? : {
        name? : string | null
    }
}
export const AppBar =({onSignIn, onSignOut, user} : AppBarProps) => {
    return (
        <div className="flex justify-between border-b px-4">
            <div className="text-lg flex flex-col justify-center">
                PayTM
            </div>
            <div className="flex flex-col justify-center pt-2">
                <Button onClick={user ? onSignOut : onSignIn}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}