import supabase from "./supabase";

// channelId: game:pin => game:1234
// event *: ALL | INSERT | UPDATE | DELETE
// callback: (payload) => {}

export const subscribeToChannel = function (channelId, event, callback) {
  const subscription = supabase
    .channel(channelId)
    .on(
      "postgres_changes",
      {
        event,
        schema: "public",
        table: "games",
        filter: `pin=eq.${channelId.split(":")[1]}`,
      },
      callback
    )
    .subscribe();
  return subscription;
};

export const unsubscribeChannel = function (subscription) {
  supabase.removeChannel(subscription);
};
