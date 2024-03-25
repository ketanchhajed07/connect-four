import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

function Game() {
  const getGame = async () => {
    const game = await supabase.from("games").select();
    return game;
  };
  const query = useQuery({ queryKey: ["games"], queryFn: getGame });
  const board = query.data?.data[2].board;
  return (
    <div className="board">
      {board?.map((board, i) => (
        <div key={i} className="column">
          {board.map((cell, j) => (
            <div key={j} className="cell">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Game;
