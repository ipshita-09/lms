import { useEffect, useState } from "react";
import API from "../../services/api";

export default function MasterBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/reports/books").then(res => setBooks(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Books</h2>
      {books.map(b => (
        <p key={b._id}>{b.title}</p>
      ))}
    </div>
  );
}
