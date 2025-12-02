import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { QRCodeSVG } from "qrcode.react";
import { FaEye } from "react-icons/fa";
import Footer from "./Footer";
import axios from "axios";

const initialUsers = [
  {
    id: 1,
    reference_no: "Dio Lupa",
    status: "Pending",
    position: "President",
    img: "https://img.daisyui.com/images/profile/demo/1@94.webp",
    details: "Dio Lupa is a top artist this week. Song: Remaining Reason.",
    election: "SSG ELECTION",
  },
  {
    id: 2,
    reference_no: "Jane Doe",
    status: "Rejected",
    position: "Auditor",
    img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    details: "Jane Doe's hit single Sky High is trending.",
    election: "BSIT ELECTION",
  },
];

export default function ElectionReceipt() {
  const loggedUser = JSON.parse(localStorage.getItem("UserData"));

  const [voteHistory, setVoteHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const getVoteHistory = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3004/smart-vote/vote-history",
        {
          student_id: loggedUser?.student_id,
          voters_id: loggedUser?.voters_id,
        }
      );

      if (response.data.success === true) {
        setVoteHistory(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVoteHistory();
  }, []);

  console.log(voteHistory);

  const qrValue = `
    -- SmartVote System -- 

    Voters ID: ${selectedHistory?.voters_id}
    Student ID: ${selectedHistory?.student_id}
    Full Name: ${selectedHistory?.fullname}
    Department: ${selectedHistory?.department}
    Election Type: ${selectedHistory?.election_type}
    Election Date: ${selectedHistory?.voted_date}
    Voted Date: ${selectedHistory?.voted_date}
  
  `;

  console.log(selectedHistory);

  return (
    <div className="flex flex-col min-h-screen bg-base-200 overflow-auto">
      <Navbar />
      <div className="mt-14 px-4 sm:px-6 md:px-20 py-8 flex-1 flex-col justify-center text-xl sm:text-2xl font-bold">
        <div>Vote History</div>
        <div className=" flex flex-col justify-center overflow-x-auto ">
          <table className="table bg-base-100 rounded-box shadow-md mt-6">
            <thead>
              <tr>
                <th className="px-4 py-2">Reference No</th>
                <th className="px-4 py-2">Voters ID</th>
                <th className="px-4 py-2">Election</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {voteHistory.map((data, index) => (
                <tr
                  key={index}
                  className={`hover:bg-base-200 cursor-pointer transition ${
                    index % 2 ? "bg-base-300" : ""
                  }`}
                >
                  <td className="flex items-center gap-2 px-4 py-2">
                    {/* <img
                      className="size-10 rounded-box"
                      src={data.img}
                      alt={data.reference_no}
                    /> */}
                    <span>{data.student_id}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-xs uppercase font-semibold">
                      {data.voters_id}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-xs uppercase font-semibold">
                      {data.election_type} ELECTION
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-xs uppercase font-semibold">
                      {data.department}
                    </span>
                  </td>

                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="btn btn-sm btn-outline w-20"
                      onClick={() => {
                        document.getElementById("receipt-modal").showModal(),
                          setSelectedHistory(data);
                      }}
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

        <dialog id="receipt-modal" className="modal w-full ">
          <div className="modal-box md:w-1/2 max-w-5xl">
            {" "}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="mt-6 rounded-md border p-4">
              <div className="text-base sm:text-lg text-center font-semibold">
                Vote Receipt
              </div>

              <div className="mt-4 space-y-4 text-sm sm:text-base font-normal">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-4">
                  <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span className="font-semibold">Voter Name:</span>
                    <span>{selectedHistory?.fullname}</span>
                  </div>
                  <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span className="font-semibold">Voter ID:</span>
                    <span>{selectedHistory?.voters_id}</span>
                  </div>
                  <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span className="font-semibold">Election:</span>
                    <span>{selectedHistory?.election_type} Election </span>
                  </div>
                  <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span className="font-semibold">Voted Date:</span>
                    <span>{selectedHistory?.voted_date}</span>
                  </div>
                  {/* <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span className="font-semibold">Time:</span>
                    <span>10:30 AM</span>
                  </div> */}
                </div>

                <div className="border rounded mt-8">
                  <div className="font-semibold text-center py-3 border-b">
                    Voted Candidates
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { title: "President", name: selectedHistory?.president },
                      {
                        title: "Vice-President",
                        name: selectedHistory?.vice_president,
                      },
                      { title: "Secretary", name: selectedHistory?.secretary },
                      { title: "Treasurer", name: "John Doe" },
                      { title: "Auditor", name: "Nikola Tesla" },
                      { title: "Sgt. Arms", name: "Elon Musk" },
                    ].map((item) => (
                      <div key={item.title} className="flex justify-between">
                        <span className="font-semibold">{item.title}</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="btn btn-secondary w-full mt-6 text-base py-2"
                  onClick={() =>
                    document.getElementById("qr-modal").showModal()
                  }
                >
                  Generate QR CODE
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>

      <dialog id="qr-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="w-full flex flex-col items-center p-4">
            <QRCodeSVG value={qrValue} size={250} className="w-full" />
          </div>
        </div>
      </dialog>

      {/* Footer stays at the bottom */}
      <div className="mb-4">
        <Footer />
      </div>
    </div>
  );
}
