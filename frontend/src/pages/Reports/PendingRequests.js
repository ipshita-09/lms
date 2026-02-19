import { useEffect, useState } from "react";
import API from "../../services/api";

export default function PendingRequests() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/reports/pending").then(res => setData(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Pending Issue Requests</h2>
      {data.map(p => (
        <p key={p._id}>{p.user.name} → {p.book.title}</p>
      ))}
    </div>
  );
}
