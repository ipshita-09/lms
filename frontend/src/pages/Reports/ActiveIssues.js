import { useEffect, useState } from "react";
import API from "../../services/api";

function ActiveIssues() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/reports/active").then(res => setData(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Active Issues</h2>
      {data.map(t => (
        <p key={t._id}>
          {t.user.name} → {t.book.title}
        </p>
      ))}
    </div>
  );
}

export default ActiveIssues;
