import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';
import { GET_TRANSACTIONSMAIN_BY_CUSTOMER } from '../utils/queries';
import '../styles/orderHistory.css';

export default function OrderHistory() {
  const navigate = useNavigate();
  const customer = AuthService.getProfile();
  const customerId = customer ? customer.data._id : null;

  const { loading, error, data } = useQuery(GET_TRANSACTIONSMAIN_BY_CUSTOMER, {
    variables: { customer_id: customerId },
    skip: !customerId, // Use the skip option to conditionally skip the query
  });

  if (!customerId) {
    return <p>Error: Customer not found</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure data and transactionMain2 are defined
  const transactions = data?.transactionMain2 || [];

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.customer_id === customerId && transaction.ordered === true
  );

  const handleOrderDetailsClick = (orderId) => {
    navigate(`/orderDetails/${orderId}`, { state: { orderId } });
  };

  return (
    <div className="containerFluid mt-5">
      <h1 className="text-center mb-4">Order History</h1>
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="tableResponsive">
            <table className="table tableBordered">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col2">Date</th>
                  <th scope="col3">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="clickableRow" onClick={() => handleOrderDetailsClick(transaction._id)}>
                    <td>{transaction._id}</td>
                    <td>10/2023</td>
                    <td>${transaction.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}