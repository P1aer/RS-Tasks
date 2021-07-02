import React from "react";

    interface Context {
        cards : { name: string; image: string; id: number; }[],
    }

const context = React.createContext<Context>({
  cards: [],
});

export default context;
