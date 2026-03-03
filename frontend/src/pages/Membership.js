import { useState } from "react";
import API from "../services/api";

function Membership() {
  const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  contactNumber: "",
  contactAddress: "",
  aadhaar: "",
  startDate: "",
  endDate: "",
  membershipType: "6months",
});

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
  if (
    !form.firstName ||
    !form.lastName ||
    !form.contactNumber ||
    !form.contactAddress ||
    !form.aadhaar ||
    !form.startDate ||
    !form.endDate
  ) {
    alert("All fields are mandatory");
    return;
  }

  try {
    await API.post("/membership", form);
    alert("Membership Updated Successfully");
  } catch (err) {
    alert("Update failed");
  }
};

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Add Membership
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input name="firstName" placeholder="First Name"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg" />

        <input name="lastName" placeholder="Last Name"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg" />

        <input name="contactNumber" placeholder="Contact Number"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg" />

        <input name="contactAddress" placeholder="Contact Address"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg" />

        <input name="aadhaar" placeholder="Aadhaar Card No"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg" />

        <div>
          <input type="date" name="startDate"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg" />
        </div>

        <div>
          <input type="date" name="endDate"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg" />
        </div>
      </div>

      {/* Membership Radio Buttons */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">
          Membership Type
        </label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="membershipType"
              value="6months"
              checked={form.membershipType === "6months"}
              onChange={handleChange} />
            6 Months
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="membershipType"
              value="1year"
              checked={form.membershipType === "1year"}
              onChange={handleChange} />
            1 Year
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="membershipType"
              value="2years"
              checked={form.membershipType === "2years"}
              onChange={handleChange} />
            2 Years
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);
}

export default Membership;