import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: ""}});
socket.connect();

let channel = socket.channel("game:1", {});

let gameState = {
  guesses: [],
  won: false,
  lost: false,
  error: "",
};

let callback = null;

function state_update(st) {
  gameState = st;
  if (callback) {
    callback(st);
  }
}

export function ch_join(cb) {
  callback = cb;
  callback(gameState);
}

export function ch_push(type, msg) {
  channel.push(type, msg)
    .receive("ok", state_update)
    .receive("error", resp => console.log("Unable to push", resp));
}

channel.join()
  .receive("ok", state_update)
  .receive("error", resp => console.log("Unable to join", resp));
