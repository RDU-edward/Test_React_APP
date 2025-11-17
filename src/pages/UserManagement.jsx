import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaPlus } from "react-icons/fa";
import Footer from "../components/Footer";
import axios from "axios";

const TestAdmin = [
  {
    id: 1,
    name: "Edward Catapan",
    dept: "SSG, BSIT",
    img: "https://img.daisyui.com/images/profile/demo/1@94.webp",
    position: "Dean",
  },
  {
    id: 2,
    name: "Jane Doe",
    dept: "CJE ",
    img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    position: "Demon Slayer",
  },
  {
    id: 3,
    name: "John Smith",
    dept: "CBA",
    img: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    position: "Pirates",
  },
  {
    id: 4,
    name: "Alice Blue",
    dept: "CTE",
    img: "https://img.daisyui.com/images/profile/demo/4@94.webp",
    position: "Navy Admiral",
  },
  {
    id: 5,
    name: "Bob Green",
    dept: "PYSCH",
    img: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    position: "Emperors of the Sea",
  },
  //   {
  //     id: 6,
  //     name: "Bob Green",
  //     song: "Mountain Call",
  //     img: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  //     details: "Bob Green's Mountain Call is climbing the charts.",
  //   },
  //   {
  //     id: 7,
  //     name: "Bob Green",
  //     song: "Mountain Call",
  //     img: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  //     details: "Bob Green's Mountain Call is climbing the charts.",
  //   },
  //   {
  //     id: 8,
  //     name: "Bob Green",
  //     song: "Mountain Call",
  //     img: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  //     details: "Bob Green's Mountain Call is climbing the charts.",
  //   },
];
export default function UserManagement() {
  const [isFormOpen, setIsformOpen] = useState(false);
  const [adminData, setAdminData] = useState({
    admin_id: "",
    password: "test",
    fullname: "",
    email: "",
    departments: [],
    position: "",
    added_by: "",
  });

  const toggleForm = () => {
    setIsformOpen(!isFormOpen);
  };
  console.log(isFormOpen);
  // Handle changes for both text inputs and checkboxes
  const handleChanges = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle department checkbox logic
      setAdminData((prevData) => {
        let updatedDepartments = [...prevData.departments];

        if (checked) {
          // Add department to array if checked
          updatedDepartments.push(value);
        } else {
          // Remove department from array if unchecked
          updatedDepartments = updatedDepartments.filter(
            (dept) => dept !== value
          );
        }

        return {
          ...prevData,
          departments: updatedDepartments,
        };
      });
    } else {
      // Handle other inputs like text fields
      setAdminData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [emptyFields, setEmptyFields] = useState({
    admin_id: false,
    fullname: false,
    email: false,
    departments: false, // Fixed typo
    position: false,
  });

  const [responseMessage, setResponseMessage] = useState({
    message: "",
    type: "",
  });

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    console.log(adminData);
    const requiredFields = [
      "admin_id",
      "fullname",
      "email",
      "departments",
      "position",
    ];

    let newEmptyFields = { ...emptyFields };

    // Check if any required field is empty and mark it in the state
    requiredFields.forEach((field) => {
      if (field === "departments") {
        // Check if departments is an empty array
        newEmptyFields[field] = adminData[field].length === 0;
      } else {
        // Check for other empty fields
        newEmptyFields[field] = !adminData[field];
      }
    });

    setEmptyFields(newEmptyFields);

    // If any field is empty, prevent submission
    if (requiredFields.some((field) => newEmptyFields[field])) {
      console.log("Please fill in all required fields.");
      return;
    }

    // If validation passes, proceed with the API request
    try {
      const response = await axios.post(
        "http://localhost:3004/smart-vote/create-admin", // Fix URL
        adminData
      );
      setResponseMessage({
        message: "Admin created successfully!",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      setResponseMessage({
        message: "An error occurred while creating the admin.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200 overflow-auto">
      <div className="p-8 space-y-6 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          User Management
        </h1>
        <div className="btn btn-outline" onClick={toggleForm}>
          {isFormOpen ? (
            <>
              <FaArrowLeft /> Go Back
            </>
          ) : (
            <>
              <FaPlus /> Add Admin
            </>
          )}
        </div>

        {/* show form if isformopen is true */}
        {isFormOpen ? (
          <form action="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="fullname"
                  value={adminData.fullname || ""}
                  placeholder="Full Name"
                  onChange={handleChanges}
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="email"
                  value={adminData.email || ""}
                  placeholder="Email"
                  onChange={handleChanges}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="">Admin ID</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="admin_id"
                  value={adminData.admin_id}
                  placeholder="Admin ID"
                  onChange={handleChanges}
                />
              </div>

              <div>
                <label htmlFor="">Position</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="position"
                  value={adminData.position}
                  placeholder="Position"
                  onChange={handleChanges}
                />
              </div>
            </div>
            <h1 className="mb-2">Select Departments</h1>
            <div className="w-full border p-4 space-y-6 rounded">
              <div className="grid grid-cols-3 md:grid-cols-3">
                {["CCS", "CTE", "CBA", "PSYCH", "CJE", "SSG"].map((dept) => (
                  <div key={dept} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      name="departments"
                      value={dept}
                      checked={adminData.departments.includes(dept)} // Check if department is selected
                      onChange={handleChanges}
                    />
                    <span className="ml-2">{dept}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="btn btn-secondary w-full md:w-32 mt-4"
              onClick={handleCreateAdmin}
            >
              Submit
            </button>
          </form>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table bg-base-100 rounded-box shadow-md w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Position</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {TestAdmin.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-base-200 cursor-pointer transition"
                    >
                      <td className="flex items-center gap-2 px-4 py-2">
                        <img
                          className="size-10 rounded-box"
                          src={user.img}
                          alt={user.name}
                        />
                        <span>{user.name}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-xs uppercase font-semibold">
                          {user.dept}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {/* {(() => {
                        const statusClass =
                          {
                            Pending: "text-blue-500",
                            Accepted: "text-green-600",
                            Rejected: "text-red-500",
                          }[user.status] || "";

                        return (
                          <span
                            className={`text-xs uppercase  ${statusClass} font-extrabold tracking-wide`}
                          >
                            {user.status}
                          </span>
                        );
                      })()} */}
                        <span className="text-xs uppercase font-semibold">
                          {user.position}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          className="btn btn-sm btn-outline w-20"
                          // onClick={() => setSelected(user)}
                        >
                          <span>
                            <FaEye />
                          </span>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="mb-4">
        <Footer />
      </div>
    </div>
  );
}
