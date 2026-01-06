"use client";

import { useState } from "react";
import StatusChip from "./components/StatusChip";

const mockEvidence = [
  {
    id: 1,
    name: "ISO Certificate",
    type: "ISO",
    status: "Active",
    expiry: "2026-05-20",
    versions: 3,
    updatedAt: "2025-12-01",
  },
  {
    id: 2,
    name: "Factory License",
    type: "License",
    status: "Expired",
    expiry: "2024-11-10",
    versions: 1,
    updatedAt: "2024-10-15",
  },

  {
    id: 3,
    name: "Fire Safety Certificate",
    type: "Safety",
    status: "Expired",
    expiry: "2025-09-30",
    versions: 2,
    updatedAt: "2025-02-18",
  },
  {
    id: 4,
    name: "Annual Compliance Audit Report",
    type: "Audit",
    status: "Active",
    expiry: "2026-03-15",
    versions: 1,
    updatedAt: "2025-01-22",
  },
];

export default function Home() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [docType, setDocType] = useState("all");

  const selectedAll =
    selectedIds.length == mockEvidence.length && mockEvidence.length > 0;

  const toggleAll = () => {
    if (selectedAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockEvidence.map((item) => item.id));
    }
  };

  const toggleOne = (id) => {
    setSelectedIds((selectedIds) => {
      if (selectedIds.includes(id)) {
        return selectedIds.filter((selectedId) => selectedId !== id);
      }
      return [...selectedIds, id];
    });
  };

  const filteredEvidence = mockEvidence.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .startsWith(search.toLowerCase());

    const matchStatus = filter == "all" ? true : item.status == filter;

    const matchType = docType == "all" ? true : item.type == docType;

    return matchesSearch && matchStatus && matchType;
  });
  return (
    <div className="">
      <main className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Evidence Vault</h1>
          <p className="text-sm text-gray-500 mt-1">Phase A – Screen A</p>
        </div>

        <div className="flex justify-end gap-3 mt-6 mb-4 ">
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm "
          />

          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm outline-none"
          >
            <option value="all">All Types</option>
            <option value="ISO">ISO</option>
            <option value="License">License</option>
            <option value="Safety">Safety</option>
            <option value="Audit">Audit</option>
          </select>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm  outline-none"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div className="mt-6 flex flex-col items-end">
          <div className="h-10 mb-2">
            {selectedIds.length > 0 && (
              <div className="mb-3 text-sm font-bold text-white bg-blue-600 inline-block px-4 py-2 rounded cursor-pointer">
                Add to Pack ({selectedIds.length} selected)
              </div>
            )}
          </div>
          <table className="w-full border border-gray-200 border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left text-sm font-medium border">
                  Doc Name
                </th>
                <th className="px-3 py-2 text-left text-sm font-medium border">
                  Doc Type
                </th>
                <th className="px-3 py-2 text-left text-sm font-medium border">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-sm font-medium border">
                  Expiry
                </th>
                <th className="px-3 py-2 text-left text-sm font-medium border">
                  Versions
                </th>
                <th className="px-3 py-2 text-left text-sm font-medium border">
                  Last Updated
                </th>
                <th className="px-3 py-2 border text-sm font-medium text-center">
                  Selected Items
                  <input
                    className="cursor-pointer ml-2 "
                    type="checkbox"
                    checked={selectedAll}
                    onChange={toggleAll}
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEvidence?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-sm border">{item.name}</td>
                  <td className="px-3 py-2 text-sm border">{item.type}</td>
                  <td className="px-3 py-2 text-sm border">
                    <span>
                      <StatusChip status={item.status} />
                    </span>
                  </td>
                  <td className="px-3 py-2 text-sm border">{item.expiry}</td>
                  <td className="px-3 py-2 text-sm border">{item.versions}</td>
                  <td className="px-3 py-2 text-sm border">{item.updatedAt}</td>
                  <td className="px-3 py-2 border w-40 text-center">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleOne(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
