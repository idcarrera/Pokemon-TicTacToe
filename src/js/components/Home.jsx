import React, { useState } from "react";
import Start from "./Start";
import Choose from "./Choose";
import Board from "./Board"; // ← opcional por ahora

function Home() {
    const [step, setStep] = useState("start");
    const [players, setPlayers] = useState({ player1: "", player2: "" });
    const [avatars, setAvatars] = useState({ player1: null, player2: null });

    function handleStart(data) {
        setPlayers(data);
        setStep("choose");
    }

    function handleChooseAvatars(data) {
        setAvatars(data);
        setStep("game");
    }

    function handleRestartGame() {
        setPlayers({ player1: "", player2: "" });
        setAvatars({ player1: null, player2: null });
        setStep("start");
    }

    return (
        <div className="container text-center mt-5">
            {step === "start" && <Start onStart={handleStart} />}
            {step === "choose" && (
                <Choose players={players} onSelect={handleChooseAvatars} />
            )}
            {step === "game" && (
                <Board
                    players={players}
                    avatars={avatars}
                    onRestart={handleRestartGame} // 👈 Aquí se pasa
                />
            )}
        </div>
    );
}
export default Home;
