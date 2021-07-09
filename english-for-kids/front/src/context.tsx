import React, { createContext } from "react";

type Context = {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const context = createContext<Context>({
  active: false,
  setActive(value: ((prevState: boolean) => boolean) | boolean): void {
    value.valueOf();
  },
});

export default context;
