import { useState, useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";
import CountDown from "../../components/CountDown";
import OpenFiling from "../../components/OpenFiling";

const initialUsers = [
  {
    id: 1,
    name: "Dio Lupa",
    song: "Remaining Reason",
    img: "https://img.daisyui.com/images/profile/demo/1@94.webp",
    details: "Dio Lupa is a top artist this week. Song: Remaining Reason.",
  },
  {
    id: 2,
    name: "Jane Doe",
    song: "Sky High",
    img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    details: "Jane Doe's hit single Sky High is trending.",
  },
  {
    id: 3,
    name: "John Smith",
    song: "Night Drive",
    img: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    details: "John Smith released Night Drive last month.",
  },
  {
    id: 4,
    name: "Alice Blue",
    song: "Ocean Eyes",
    img: "https://img.daisyui.com/images/profile/demo/4@94.webp",
    details: "Alice Blue's Ocean Eyes is a fan favorite.",
  },
  {
    id: 5,
    name: "Bob Green",
    song: "Mountain Call",
    img: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    details: "Bob Green's Mountain Call is climbing the charts.",
  },
  {
    id: 6,
    name: "Bob Green",
    song: "Mountain Call",
    img: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    details: "Bob Green's Mountain Call is climbing the charts.",
  },
  {
    id: 7,
    name: "Bob Green",
    song: "Mountain Call",
    img: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    details: "Bob Green's Mountain Call is climbing the charts.",
  },
  {
    id: 8,
    name: "Bob Green",
    song: "Mountain Call",
    img: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    details: "Bob Green's Mountain Call is climbing the charts.",
  },
];
const dept = "SSG";

export const SsgCandidacy = () => {
  const [showCandidacyForm, setShowCandidacyForm] = useState(true);
  const [candidacyOpened, setCandidacyOpened] = useState(false);
  const [closeDate, setCloseDate] = useState("");

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const data = JSON.parse(localStorage.getItem("electionData"));

  useEffect(() => {
    if (data && data.filingStatus === "open") {
      setCandidacyOpened(true);
      setShowCandidacyForm(false);
    } else {
      setCandidacyOpened(false);
      setShowCandidacyForm(true);
    }
  }, [data]);

  // Update countdown every second
  useEffect(() => {
    if (!candidacyOpened || !closeDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(closeDate);
      const diff = Math.max(0, end - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [candidacyOpened, closeDate]);

  const [users, setUsers] = useState(initialUsers);
  const [selected, setSelected] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Get users for current page
  const startIdx = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIdx, startIdx + usersPerPage);

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    if (selected && selected.id === id) setSelected(null);
    // If deleting last item on page, go to previous page if needed
    if (paginatedUsers.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div>
        {/* Election Form */}
        {showCandidacyForm && (
          <OpenFiling
            dept={dept}
            setCandidacyOpened={setCandidacyOpened}
            setShowCandidacyForm={setShowCandidacyForm}
          />
        )}
        {!showCandidacyForm && (
          <div className="flex flex-col mb-6 w-full">
            <CountDown countdown={countdown} dept={dept} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2 mt-4">
              <div className="card w-full bg-base-100 card-xs shadow-sm">
                <div className="card-body cursor-pointer hover:bg-red-200 transition px-6">
                  <h2 className="text-sm font-medium text-gray-900">
                    Rejected Candidates
                  </h2>
                  <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-extrabold text-red-500">
                      200
                    </h1>
                    <FaLayerGroup className="text-2xl" />
                  </div>
                </div>
              </div>
              <div className="card w-full bg-base-100 card-xs shadow-sm">
                <div className="card-body cursor-pointer hover:bg-purple-200 transition px-6">
                  <h2 className="text-sm font-medium text-gray-900">
                    Pending Candidates
                  </h2>
                  <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-extrabold text-purple-500">
                      500
                    </h1>
                    <FaLayerGroup className="text-2xl" />
                  </div>
                </div>
              </div>
              <div className="card w-full bg-base-100 card-xs shadow-sm">
                <div className="card-body cursor-pointer hover:bg-green-200 transition px-6">
                  <h2 className="text-sm font-medium text-gray-700">
                    Accepted Candidates
                  </h2>
                  <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-extrabold text-green-500">
                      1000
                    </h1>
                    <FaLayerGroup className="text-2xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* User List and Details */}
            <div className="w-full mt-4 ">
              <ul className="list bg-base-100 rounded-box shadow-md p-4 ">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                  Recently Added Candidates
                </li>
                {paginatedUsers.map((user) => (
                  <li
                    key={user.id}
                    className={`list-row cursor-pointer hover:bg-base-200 transition flex items-center gap-2 px-4 py-2`}
                    onClick={() => setSelected(user)}
                  >
                    <img
                      className="size-10 rounded-box"
                      src={user.img}
                      alt={user.name}
                    />
                    <div className="flex-1">
                      <div>{user.name}</div>
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {user.song}
                      </div>
                    </div>
                    <button className="btn btn-square btn-ghost" title="Play">
                      <svg
                        className="size-[1.2em]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M6 3L20 12 6 21 6 3z"></path>
                        </g>
                      </svg>
                    </button>
                    <button
                      className="btn btn-square btn-ghost text-error"
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                      }}
                    >
                      <svg
                        className="size-[1.2em]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M6 6L18 18M6 18L18 6"></path>
                        </g>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-2 mt-4">
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
              </div>
              {selected && (
                <div>
                  {/* Modal Backdrop - more transparent */}
                  <div
                    className="fixed inset-0 bg-black opacity-70  z-40"
                    onClick={() => setSelected(null)}
                  ></div>
                  {/* Modal Content */}
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-base-100 rounded-box shadow-lg p-6 w-full max-w-md relative">
                      <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => setSelected(null)}
                      >
                        ✕
                      </button>
                      <div className="flex items-center gap-4 mb-2">
                        <img
                          className="size-12 rounded-box"
                          src={selected.img}
                          alt={selected.name}
                        />
                        <div>
                          <div className="font-bold text-lg">
                            {selected.name}
                          </div>
                          <div className="text-xs uppercase font-semibold opacity-60">
                            {selected.song}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">{selected.details}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Countdown */}
      </div>
    </div>
  );
};
