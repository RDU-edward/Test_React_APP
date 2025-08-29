import { useState } from "react";

const OpenFiling = ({ dept, setCandidacyOpened, setShowElectionForm }) => {
  const [formData, setFormData] = useState({
    adminId: "",
    adminPassword: "",
    closeFileDate: "",
    department: dept,
    filingStatus: "open",
  });
  //

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    localStorage.setItem("electionData", JSON.stringify(formData));
    setTimeout(() => {
      setCandidacyOpened(true);
      setShowElectionForm(false);
    }, 3000);
  };

  return (
    <div className="max-w-md h-96 mx-auto bg-base-100 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Open {dept} Filing
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Admin ID"
          name="adminId"
          className="input input-bordered w-full"
          value={formData.adminId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          name="adminPassword"
          className="input input-bordered w-full"
          value={formData.adminPassword}
          onChange={handleChange}
          required
        />
        <label className="block font-medium">Candidate Filing Close Date</label>
        <input
          type="datetime-local"
          className="input input-bordered w-full"
          name="closeFileDate"
          value={formData.closeFileDate}
          onChange={handleChange}
          required
        />
        <button
          className="btn bg-gray-800 text-white w-full"
          onClick={handleSubmit}
        >
          Open Election
        </button>
      </form>
    </div>
  );
};

export default OpenFiling;
