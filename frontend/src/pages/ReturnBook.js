import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ReturnBook() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [fine, setFine] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    const res = await API.get("/books/issued"); // create this route
    setBooks(res.data);
  };
  
  const selectedBook = books.find((b) => b._id === selectedBookId);

  useEffect(() => {
    if (!selectedBook || !returnDate) {
      setFine(0);
      return;
    }

    const issueDate = new Date(selectedBook.issuedAt);
    const retDate = new Date(returnDate);

    const days =
      Math.ceil((retDate - issueDate) / (1000 * 60 * 60 * 24));

    setFine(days > 10 ? (days - 10) * 5 : 0);
  }, [selectedBook, returnDate]);

  const refreshUser = async () => {
    const res = await API.get("/users/me");
    localStorage.setItem("user", JSON.stringify(res.data));
  };
  const handleReturn = async () => {
  if (!selectedBookId || !returnDate) {
    alert("Please select book and return date");
    return;
  }

  try {
    await API.post("/books/return", {
      bookId: selectedBookId,
      returnDate,
    });

    await refreshUser();  
    navigate("/dashboard"); 
  } catch (err) {
    alert("Return failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Return Book
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book */}
          <div>
            <label className="text-sm font-medium">Book Name</label>
            <select
              className="w-full border px-4 py-2 rounded-lg"
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
            >
              <option value="">Select Book</option>
              {books.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="text-sm font-medium">Author</label>
            <input
              disabled
              value={selectedBook?.author || ""}
              className="w-full border px-4 py-2 rounded-lg bg-gray-100"
            />
          </div>

          {/* Issue Date */}
          <div>
            <label className="text-sm font-medium">Issue Date</label>
            <input
              disabled
              value={
                selectedBook
                  ? new Date(selectedBook.issuedAt).toLocaleDateString()
                  : ""
              }
              className="w-full border px-4 py-2 rounded-lg bg-gray-100"
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="text-sm font-medium">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Fine */}
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold">
            Fine: <span className="text-red-600">₹{fine}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border rounded-xl"
          >
            Cancel
          </button>

          <button
            disabled={!selectedBookId || !returnDate}
            onClick={handleReturn}
            className="px-8 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            Confirm Return
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReturnBook;