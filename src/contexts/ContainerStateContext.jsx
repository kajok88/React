import React, { createContext, useContext, useState } from 'react';

const ContainerStateContext = createContext();

export const useContainerState = () => useContext(ContainerStateContext);

export const ContainerStateProvider = ({ children }) => {
  const [containerState, setContainerStates] = useState({
    yourLocationContainer: true,
    pinLocationContainer: true,
    redInfoContainer: true,
    blueInfoContainer: true,
  });

  const handleContainerState = (containerId, isVisible) => {
    setContainerStates(prevState => ({
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
