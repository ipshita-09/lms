import { useEffect, useState } from "react";
import API from "../../services/api";

export default function MembershipReport() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/reports/memberships").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Memberships</h2>
      {users.map(u => (
        <p key={u._id}>{u.name} ({u.membershipType})</p>
      ))}
    </div>
  );
}
