import { useEffect, useState } from "react";
import API from "../services/api";

function IssueBook() {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    API.get("/books").then(res => setBooks(res.data));
  }, []);

  const handleIssue = async () => {
    if (!selected) return alert("Select a book");
    await API.post("/transactions/issue", { bookId: selected });
    alert("Issued Successfully");
  };

  return (
    <div>
      <h2>Issue Book</h2>
      {books.map(book => (
        <div key={book._id}>
          <input type="radio"
            name="book"
            value={book._id}
            onChange={(e) => setSelected(e.target.value)} />
          {book.title}
        </div>
      ))}
      <button onClick={handleIssue}>Issue</button>
    </div>
  );
}

export default IssueBook;
