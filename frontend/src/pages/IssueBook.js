import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function IssueBook() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    bookId: "",
    issueDate: "",
    returnDate: "",
    remarks: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const fetchAvailableBooks = async () => {
    try {
      const res = await API.get("/books/available");
      setBooks(res.data);
    } catch (err) {
      alert("Failed to load books");
    }
  };

  const selectedBook = books.find((b) => b._id === form.bookId);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setForm({
      bookId: "",
      issueDate: "",
      returnDate: "",
      remarks: "",
    });
  };

  const handleConfirm = async () => {
    if (!form.bookId || !form.issueDate || !form.returnDate) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await API.post("/books/issue", form);
      alert("Book issued successfully");
      navigate("/search-books");
    } catch (err) {
      alert(err.response?.data?.message || "Issue failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-5">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Book Issue
        </h2>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Book Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Book Name
            </label>
            <select
              name="bookId"
              value={form.bookId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Author
            </label>
            <input
              type="text"
              value={selectedBook?.author || ""}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Serial Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Serial Number
            </label>
            <input
              type="text"
              value={selectedBook?.serialNo || ""}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Issue Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Issue Date
            </label>
            <input
              type="date"
              name="issueDate"
              value={form.issueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              value={form.returnDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Availability
            </label>
            <input
              type="text"
              value={selectedBook ? "Available" : ""}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-green-50 text-green-700 font-semibold"
            />
          </div>
        </div>

        {/* Remarks */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Remarks (Optional)
          </label>
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Any notes about the book issue..."
          />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="px-8 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!form.bookId}
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}

export default IssueBook;