import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useContext, createContext } from 'react';

import { usePlans } from './use-plans';
import { httpGetAllPayments } from './requests';

const PaymentsContext = createContext();



function PaymentsContextProvider({ children }) {
  const { data: payments } = useQuery({
    queryKey: ['payments'],
    queryFn: httpGetAllPayments,
  });

  const calculateTotalPrice = (paymentData) => {
    const totalPrice = paymentData?.reduce(
      (accumulator, currentPayment) => accumulator + currentPayment.price,
      0
    );

    return totalPrice;
  };

  const calculateTotalPaymentsByUser = (paymentData, userId) => {
    const totalPaymentsByUser = {};

    paymentData?.forEach((payment) => {

      if (userId) {
        if (!totalPaymentsByUser[userId]) {
          totalPaymentsByUser[userId] = {
            total: 0,
            payments: [], // Array to store payment details
          };
        }

        totalPaymentsByUser[userId].total += payment.price;
        totalPaymentsByUser[userId].payments.push(payment); // Store payment details
      }
    });

    return totalPaymentsByUser;
  };
  const calculateTotalPaymentsBySportplan = (paymentData, sportsPlans) => {
    const totalPaymentsBySportplan = [];

    paymentData?.forEach((payment) => {
      const matchingSportPlan = sportsPlans?.find((plan) => plan.id === payment.sportplanId);

      if (matchingSportPlan) {
        const existingEntry = totalPaymentsBySportplan.find(
          (entry) => entry.id === matchingSportPlan.id
        );

        if (existingEntry) {
          existingEntry.total += payment.price;
        } else {
          totalPaymentsBySportplan.push({
            id: matchingSportPlan.id,
            label: matchingSportPlan.name,
            value: payment.price,
          });
        }
      }
    });

    return totalPaymentsBySportplan;
  };


  const paymentCount = payments?.length;
  const totalRevenue = calculateTotalPrice(payments);

  const { sportplans } = usePlans();
  const spns = sportplans?.map((sp) => ({ name: sp.name, id: sp.id }));

  const totalPayments = calculateTotalPaymentsBySportplan(payments, spns);
  return (
    <PaymentsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        payments,
        paymentCount,
        totalRevenue,
        totalPayments,
        calculateTotalPaymentsByUser,
        calculateTotalPrice
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
}

export function usePayments() {
  const context = useContext(PaymentsContext);
  if (!context) throw new Error('usePayments was used out of scope');
  return context;
}
PaymentsContextProvider.propTypes = {
  children: PropTypes.node,
};

export default PaymentsContextProvider;
