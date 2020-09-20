import React, { createContext } from 'react';

const defaultContext:{} = {};

const CanvasContext: React.Context<{}> = createContext(defaultContext);

export default CanvasContext;
