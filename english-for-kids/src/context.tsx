import React from "react";

    interface Context {
        cards : { name: string; image: string; id: number; }[],
        state: {menu:boolean, play:boolean},
        setState:React.Dispatch<React.SetStateAction<{ menu: boolean; play: boolean; }>>,
        exitMenu:()=>void
    }

const context = React.createContext<Context>({
  exitMenu(): void {
    const arr: string[] = ["6"];
    arr.includes("6");
  },
  cards: [],
  state: { menu: false, play: false },
  setState(value: ((prevState: { menu: boolean; play: boolean }) => {
      menu: boolean; play: boolean })
      | { menu: boolean; play: boolean }): void {
    value.toString();
  },
});

export default context;
