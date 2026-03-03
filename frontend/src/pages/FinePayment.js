import API from "../services/api";

function FinePayment() {
  const payFine = async () => {
    await API.post("/transactions/payfine");
    alert("Fine Paid");
  };

  return (
    <div className="card">
      <h2>Fine Payment</h2>
      <button onClick={payFine}>Pay Fine</button>
    </div>
  );
}

export default FinePayment;
