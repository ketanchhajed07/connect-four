import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../services/supabase";
import { useEffect } from "react";

function useCreateGameAndSubscribe(playerName) {
  const queryClient = useQueryClient();

  const createGameMutation = useMutation({
    mutationFn: async () => {
      const { data: game, error } = await supabase
        .from("games")
        .insert([{ players: [{ name: playerName, score: 0 }] }])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return game;
    },
    onSuccess: (game) => {
      const subscription = supabase
        .channel(`game:${game.pin}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "games" },
          () => {
            queryClient.invalidateQueries(["game"]);
          }
        )
        .subscribe();

      queryClient.setQueryData(["game"], game);
      queryClient.setQueryData(["subscription"], subscription);
    },
  });

  useEffect(() => {
    return () => {
      const subscription = queryClient.getQueryData(["subscription"]);
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [queryClient]);

  return createGameMutation;
}

export default useCreateGameAndSubscribe;
