import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

function Details() {
  const router = useRouter();
  const [selectedDetail, setSelectedDetail] = useState("");
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      router.push("/Login");
    }

    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "age", header: "Age" },
      { accessorKey: "email", header: "Email" },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 flex-row">
        <Sidebar setSelectedDetail={setSelectedDetail} />
        <div className="p-6 w-full overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <p className="mb-4">
            {selectedDetail || "Select an option from the sidebar"}
          </p>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="p-3 border rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-left min-w-max">
                <thead className="bg-gray-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="border p-3 cursor-pointer text-gray-700 hover:bg-gray-200"
                        >
                          {header.column.columnDef.header}{" "}
                          {header.column.getIsSorted() === "asc"
                            ? "🔼"
                            : header.column.getIsSorted() === "desc"
                            ? "🔽"
                            : ""}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-3 border text-gray-800">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 w-full sm:w-auto"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
