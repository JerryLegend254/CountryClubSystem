import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useState, useContext, createContext } from 'react';

import { httpDeletePlan, httpGetAllSportsplans } from './requests';

const SportPlansContext = createContext();

function SportPlansContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: sportplans } = useQuery({
    queryKey: ['sportplans'],
    queryFn: httpGetAllSportsplans,
  });

  async function deletePlan(id) {
    try {
      setIsLoading(true);
      const res = await httpDeletePlan(id);
      await res.json();
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const plansCount = sportplans?.length;
  return (
    <SportPlansContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        sportplans,
        plansCount,
        deletePlan,
        isLoading
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
