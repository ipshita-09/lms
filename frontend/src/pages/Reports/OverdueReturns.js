import { useEffect, useState } from "react";
import API from "../../services/api";

export default function OverdueReturns() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/reports/overdue").then(res => setData(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Overdue Returns</h2>
      {data.map(i => (
        <p key={i._id}>{i.user.name} → {i.book.title}</p>
      ))}
    </div>
  );
}
