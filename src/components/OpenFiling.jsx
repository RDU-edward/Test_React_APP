import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";

const OpenFiling = ({ dept, setCandidacyOpened, setShowCandidacyForm }) => {
  const admin = JSON.parse(localStorage.getItem("AdminData"));
  const [candidacySchedule, setCandidacySchedule] = useState();
  const [formData, setFormData] = useState({
    close_date: "",
    candidacy_type: dept,
    status: "OPEN",
    opened_by: admin[0]?.admin_id,
  });
  //

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //* Get Candidacy Schedule
  const getCandidacySchedule = async (e) => {
    try {
      const response = await axios.post(
        `http://localhost:3004/smart-vote/get-candidacy-schedule/${dept}`
      );

      if (response.data.success === true) {
        setCandidacySchedule(response.data.data[0]);
        localStorage.setItem(
          "candidacyData",
          JSON.stringify(response.data.data[0])
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCandidacySchedule();
  }, [dept]);

  useEffect(() => {
    if (candidacySchedule?.status === "OPEN") {
      setCandidacyOpened(true);
      setShowCandidacyForm(false);
    }
  }, [candidacySchedule]);

  //* Updated Candidacy
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3004/smart-vote/update-candidacy",
        formData
      );
      if (response.data.success === true) {
        localStorage.setItem("candidacyData", JSON.stringify(formData));
        setTimeout(() => {
          setCandidacyOpened(true);
          setShowCandidacyForm(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-md h-auto mx-auto bg-base-100 p-6 rounded-xl shadow-lg mt-20">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-75">
          {/* Prevent interaction with content behind */}
          <div className="pointer-events-none">
            <Loader />
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-4">
        Open {dept} Filing
      </h2>
      <form className="space-y-4">
        {/* <input
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
        /> */}
        <label className="block font-medium">Candidate Filing Close Date</label>
        <input
          type="datetime-local"
          className="input input-bordered w-full"
          name="close_date"
          value={formData.close_date}
          onChange={handleChange}
          required
        />
        <button
          className="btn bg-gray-800 text-white w-full"
          onClick={handleSubmit}
        >
          Open Filing
        </button>
      </form>
    </div>
  );
};

export default OpenFiling;
