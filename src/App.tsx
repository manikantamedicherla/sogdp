import React from 'react';
import { CanvasContextProvider, ImageContextProvider } from 'context'
import { Base } from 'pages'

const  App:React.FC = () => {
  return (
    <CanvasContextProvider>
      <ImageContextProvider>
        <Base />
      </ImageContextProvider>
    </CanvasContextProvider>
  );
}

export default App;
