import { useState } from "react";
import API from "../services/api";

function Membership() {
  const [type, setType] = useState("6months");

  const handleUpdate = async () => {
    await API.post("/membership", { type });
    alert("Membership Updated");
  };

  return (
    <div>
      <h2>Membership</h2>

      <select onChange={(e) => setType(e.target.value)}>
        <option value="6months">6 Months</option>
        <option value="1year">1 Year</option>
        <option value="2years">2 Years</option>
      </select>

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Membership;
