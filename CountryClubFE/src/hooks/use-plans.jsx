import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import {  useContext, createContext } from 'react';

import { httpGetAllSportsplans } from './requests';

const SportPlansContext = createContext();

function SportPlansContextProvider({ children }) {
  const {  data: sportplans } = useQuery({
    queryKey: ['sportplans'],
    queryFn: httpGetAllSportsplans,
  });

  const plansCount = sportplans?.length
  return (
    <SportPlansContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        sportplans,
        plansCount
      }}
    >
      {children}
    </SportPlansContext.Provider>
  );
}

export function usePlans() {
  const context = useContext(SportPlansContext);
  if (!context) throw new Error('usePlans was used out of scope');
  return context;
}

SportPlansContextProvider.propTypes = {
  children: PropTypes.node,
};

export default SportPlansContextProvider;
