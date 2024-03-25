import { useQuery } from "@tanstack/react-query";
import supabase from "./services/supabase";

const PlayerStatus = function ({ roomPin }) {
  const { data: game } = useQuery({
    queryKey: ["game"],
    queryFn: async () => {
      const game = await supabase
        .from("games")
        .select()
        .eq("pin", roomPin)
        .single();
      return game.data;
    },
  });
  console.log(game);
  return <p>{game.players.length < 2 ? "Waitng for other player" : null}</p>;
};

export default PlayerStatus;
