import { useState } from "react";
import API from "../services/api";

function ReturnBook() {
  const [transactionId, setTransactionId] = useState("");

  const handleReturn = async () => {
    if (!transactionId) return alert("Enter transaction ID");

    const res = await API.post("/transactions/return", { transactionId });
    alert(`Returned. Fine: ₹${res.data.fine}`);
  };

  return (
    <div>
      <h2>Return Book</h2>
      <input placeholder="Transaction ID"
        onChange={(e) => setTransactionId(e.target.value)} />
      <button onClick={handleReturn}>Return</button>
    </div>
  );
}

export default ReturnBook;
