import { useLocation } from "react-router-dom";

export default function Game(){
    const location = useLocation();
    const game = location.state?.clickedGame || "";

    console.log(`the game is `,game)
    return(
        <>
            <h1>{game.name}</h1>
            <h1>{game.price}</h1>
        </>
    )
}