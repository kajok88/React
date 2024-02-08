import React, { createContext, useContext, useState } from 'react';

const ContainerStateContext = createContext();

export const useContainerState = () => useContext(ContainerStateContext);

export const ContainerStateProvider = ({ children }) => {
  const [containerState, setContainerState] = useState({
    yourLocationContainer: true,
    redPinLocationContainer: true,
    redInfoContainer: true,
    blueInfoContainer: true,
  });

  const handleContainerState = (containerId, isVisible) => {
    setContainerState(prevState => ({
      ...prevState,
      [containerId]: isVisible,
    }));
  };

  return (
    <ContainerStateContext.Provider value={{ containerState, handleContainerState }}>
      {children}
    </ContainerStateContext.Provider>
  );
};
