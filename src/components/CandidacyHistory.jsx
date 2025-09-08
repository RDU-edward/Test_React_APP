import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FaMessage, FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import Navbar from "./Navbar";

const initialUsers = [
  {
    id: 1,
    name: "Dio Lupa",
    status: "Pending",
    position: "President",
    img: "https://img.daisyui.com/images/profile/demo/1@94.webp",
    details: "Dio Lupa is a top artist this week. Song: Remaining Reason.",
    election: "SSG ELECTION",
  },
  {
    id: 2,
    name: "Jane Doe",
    status: "Rejected",
    position: "Auditor",
    img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    details: "Jane Doe's hit single Sky High is trending.",
    election: "BSIT ELECTION",
  },
  {
    id: 3,
    name: "Jane Doe",
    status: "Rejected",
    position: "President",
    img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    details: "Jane Doe's hit single Sky High is trending.",
    election: "SSG ELECTION",
  },
];
export default function CandidacyHistory() {
  const [users, setUsers] = useState(initialUsers);
  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    if (selected) {
      const modal = document.getElementById("my_modal_4");
      if (modal) {
        modal.showModal();
      }
    }
  }, [selected]);

  // Pagination logic
  //   const totalPages = Math.ceil(users.length / usersPerPage);
  //   const startIdx = (currentPage - 1) * usersPerPage;
  //   const paginatedUsers = users.slice(startIdx, startIdx + usersPerPage);

  return (
    <div className="min-h-screen bg-base-200 w-full overflow-auto">
      <Navbar />

      <div className="mt-14 px-6 md:px-20 py-8 flex flex-col justify-center">
        <div className=" flex flex-col justify-center overflow-x-auto ">
          <div className="text-2xl font-bold mb-4 mt-4">Candidacy History</div>
          <table className="table bg-base-100 rounded-box shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Election</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
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
                      {user.position}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-xs uppercase font-semibold">
                      {user.election}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {(() => {
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
                    })()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="btn btn-sm btn-outline w-20"
                      onClick={() => setSelected(user)}
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
      </div>

      {selected && (
        <div className="w-96">
          {/* Modal Backdrop - more transparent */}
          {/* <div
                            className="fixed inset-0 bg-black opacity-70  z-40"
                            onClick={() => setSelected(null)}
                          ></div> */}
          {/* Modal Content */}
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl h-auto">
              {(() => {
                const statusClass =
                  {
                    Pending: "text-blue-500",
                    Accepted: "text-green-600",
                    Rejected: "text-red-500",
                  }[selected?.status] || "";

                return (
                  <span
                    className={`text-xs uppercase  ${statusClass} font-extrabold tracking-wider`}
                  >
                    {selected?.status}
                  </span>
                );
              })()}
              <div className="mt-2">
                <form method="dialog">
                  <div className="">
                    <img
                      className="size-12 rounded-box"
                      src={selected.img}
                      alt={selected.name}
                    />
                    <div>
                      <div className="font-bold text-lg">{selected.name}</div>
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {selected.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">{selected.details}</div>

                  {/* if status is rejected */}
                  {selected?.status === "Rejected" && (
                    <div className="border border-red-500 bg-red-200 h-auto p-2 mt-4 rounded-md ">
                      <div className="flex font-bold text-red-500 items-center gap-2">
                        <FaRegCircleXmark className="text-xl" />
                        Candidate Rejected
                      </div>
                      <p className="text-black mt-2 text-justify">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Possimus alias earum quo culpa expedita quibusdam,
                        qui quae est ratione delectus.
                      </p>
                    </div>
                  )}

                  {/* if there is a button, it will close the modal */}
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                      setSelected(null);
                    }}
                  >
                    ✕
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
      {/* Pagination Controls */}
      {/* <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span className="px-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
