import useCreateGameAndSubscribe from "../hooks/useCreateGameAndSubscribe";
import PlayerStatus from "../PlayerStatus";
import { useState } from "react";

function Start() {
  const [roomPin, setRoomPin] = useState("");
  const {
    data: game,
    mutate: createGame,
    isPending,
    isSuccess,
  } = useCreateGameAndSubscribe("Player 1");

  return (
    <section>
      <button
        onClick={() => {
          createGame();
        }}
      >
        {isPending ? "Creating game..." : "Create a game"}
      </button>
      {game && <p>Game ID: {game.pin}</p>}
      {isSuccess && <PlayerStatus roomPin={game.pin} />}

      <form>
        <input
          type="number"
          placeholder="enter game ID"
          value={roomPin}
          onChange={(e) => setRoomPin(e.target.value)}
        />

        <button>Join a game</button>
      </form>
    </section>
  );
}

export default Start;
