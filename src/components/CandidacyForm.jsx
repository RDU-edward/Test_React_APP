export default function CandidacyForm() {
  return (
    <div className="flex justify-center w-full py-8">
      <form action="" className="border-2 w-3/4 rounded-md border-base-300 ">
        <div className="text-center text-2xl py-4 border-b-2 border-base-300 mb-2">
          Change Form Request
        </div>
        <div className="w-full p-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-4 rounded-md">
            <div>
              <label htmlFor="" className="text-xs">
                Student ID
              </label>
              <input
                type="text"
                placeholder="ID"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="text-xs">
                Date
              </label>
              <input
                type="text"
                placeholder="Date"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="text-xs">
                Position
              </label>
              <input
                type="text"
                placeholder="ID"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="text-xs">
                Department/Course
              </label>
              <input
                type="text"
                placeholder="ID"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm">Tell us about yourself</div>
            <textarea
              name=""
              id=""
              className="border w-full rounded-md text-sm p-4"
              placeholder="Enter a brief description"
            ></textarea>
          </div>
          <div className="mt-4">
            <div className="text-sm">Purpose of filing</div>
            <textarea
              name=""
              id=""
              className="border w-full rounded-md text-sm p-4"
              placeholder="Enter a brief description"
            ></textarea>
          </div>
          <div>
            <div className="text-sm">Attachments</div>
            <div className="h-24 flex justify-center items-center border-2 border-gray-400 border-dashed rounded-md">
              Attachments
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center p-6">
          <button className="btn btn-error">Submit Candidacy</button>
          <button className="btn ">Clear Form</button>
        </div>
      </form>
    </div>
  );
}
