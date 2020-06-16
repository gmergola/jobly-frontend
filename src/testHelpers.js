import React from "react";
import TokenContext from "./TokenContext";

const DEMO_TOKEN = 'TOKEN';

const TokenProvider = ({ children, currentToken = DEMO_TOKEN }) => (
  <TokenContext.Provider value={{currentToken}}>
    {children}
  </TokenContext.Provider>
);

export { TokenProvider };
