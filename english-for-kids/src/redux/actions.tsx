import {
  ChangeMenu, ExitMenu, GameStart, GameStop, Toggle,
} from "./types";

export function changeMenu() {
  return {
    type: ChangeMenu,
  };
}
export function exitMenu() {
  return {
    type: ExitMenu,
  };
}
export function toggle() {
  return {
    type: Toggle,
  };
}
export function startGame(audio:string[]) {
  new Audio(`audio/${audio[audio.length - 1]}.mp3`).play();
  return {
    type: GameStart,
    data: audio,
  };
}
export function stopGame() {
  return {
    type: GameStop,
  };
}
