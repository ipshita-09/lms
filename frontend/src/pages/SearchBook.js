import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function SearchBook() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await API.get("/books/available");
    setBooks(res.data);
  };
  const issueBook = async () => {
  try {
    await API.post("/books/issue", { bookId: selectedBook });
    alert("Book issued successfully");
    setSelectedBook(null);
    fetchBooks(); // refresh list
  } catch (err) {
    alert(err.response?.data?.message || "Issue failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Search Books
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Book Name</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Serial No</th>
                <th className="p-3 text-left">Availability</th>
                <th className="p-3 text-center">Issue</th>
              </tr>
            </thead>

            <tbody>
                {books.map((book) => (
                  <tr key={book._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">
                      {book.title}
                    </td>

                    <td className="p-3 text-gray-700">
                      {book.author}
                    </td>

                    <td className="p-3 text-gray-700">
                      {book.serialNo}
                    </td>

                    <td className={`p-3 font-semibold ${
                      book.isAvailable ? "text-green-600" : "text-red-600"
                    }`}>
                      {book.isAvailable ? "Available" : "Issued"}
                    </td>

                    <td className="p-3 text-center">
                      <input
                        type="radio"
                        name="issueBook"
                        disabled={!book.isAvailable}
                        checked={selectedBook === book._id}
                        onChange={() => setSelectedBook(book._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>

        <div className="mt-6 text-right">
          <button
            disabled={!selectedBook}
            onClick={() => navigate("/issue-book")}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl
             hover:bg-blue-700 disabled:bg-gray-400"
          >
            Issue Selected Book
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchBook;