import React from "react";
import TokenContext from "./TokenContext";

const demoToken = 'TOKEN';

const TokenProvider = ({ children, currentToken = demoToken }) => (
  <TokenContext.Provider value={{currentToken}}>
    {children}
  </TokenContext.Provider>
);

export { TokenProvider };
