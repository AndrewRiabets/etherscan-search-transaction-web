import React from "react";
import uniqid from "uniqid";

export default function Table({ data }) {
  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return (
    <div className="_container">
      {data?.transactions ? (
        <table className="table">
          <thead>
            <tr>
              <th>Block number</th>
              <th>Transaction ID</th>
              <th>Sender address</th>
              <th>Recipient's address</th>
              <th>Block confirmations</th>
              <th>Date</th>
              <th>Value</th>
              <th>Transaction Fee</th>
            </tr>
          </thead>

          <tbody>
            {data.transactions.map((el) => (
              <tr key={uniqid()}>
                <td className="table__blockNumber">{el.blockNumber}</td>
                <td className="table__transactionId">{el.transactionId}</td>
                <td className="table__senderAddress">{el.senderAddress}</td>
                <td className="table__recipientsAddress">
                  {el.recipientsAddress}
                </td>
                <td className="table__latestBlock">
                  {data.latestBlock - el.blockNumber}
                </td>
                <td className="table__date">
                  {new Date(el.date)
                    .toLocaleString("en-US", options)
                    .toString()}
                </td>
                <td className="table__value">{el.value}</td>
                <td className="table__transactionFee">{el.transactionFee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="table__enter-data">
          Please, enter a search query to populate the tabale data!
        </p>
      )}
    </div>
  );
}
