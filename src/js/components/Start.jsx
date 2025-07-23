import React, { useState } from "react";

function Start({ onStart }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [mode, setMode] = useState("vsPlayer"); // 👈 modo por defecto

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed1 = player1.trim();
    const trimmed2 = mode === "vsIA" ? "IA" : player2.trim();

    if (trimmed1 && trimmed2) {
      onStart({ player1: trimmed1, player2: trimmed2 });
    }
  }

  return (
    <div className="console-frame text-center mt-5">
      <h1 className="title-typewriter mb-4">Pokémon Tic Tac Toe</h1>
      <h3 className="subtitle-glow mb-4">¡Selecciona el modo de juego!</h3>

      <div className="button-group">
        <label>
          <input
            type="radio"
            name="mode"
            value="vsPlayer"
            checked={mode === "vsPlayer"}
            onChange={() => setMode("vsPlayer")}
          />
          Jugar contra otro Entrenador
        </label>

        <label>
          <input
            type="radio"
            name="mode"
            value="vsIA"
            checked={mode === "vsIA"}
            onChange={() => setMode("vsIA")}
          />
          Jugar contra Lider de Gimnasio
        </label>
      </div>

      <form
        className="w-100 mt-4"
        style={{ maxWidth: "500px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Nombre de Entrenador 1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          required
        />

        {mode === "vsPlayer" && (
          <input
            type="text"
            placeholder="Nombre de Entrenador 2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            required
          />
        )}

        <button type="submit">¡Continuar!</button>
      </form>
    </div>
  );
}

export default Start;
