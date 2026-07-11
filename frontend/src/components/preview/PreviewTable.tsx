"use client";

import { CsvRow } from "@/types/lead";

interface Props {
  rows: CsvRow[];
}

export default function PreviewTable({ rows }: Props) {

  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  return (

    <div className="mt-8 bg-white rounded-xl shadow">

      <div className="p-5 border-b">

        <h2 className="text-xl font-bold">
          CSV Preview
        </h2>

      </div>

      <div className="overflow-auto max-h-[500px]">

        <table className="w-full border-collapse">

          <thead className="sticky top-0 bg-slate-100">

            <tr>

              {headers.map((header) => (

                <th
                  key={header}
                  className="px-5 py-3 border-b text-left whitespace-nowrap"
                >
                  {header}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (

              <tr
                key={index}
                className="hover:bg-gray-50"
              >

                {headers.map((header) => (

                  <td
                    key={header}
                    className="px-5 py-3 border-b whitespace-nowrap"
                  >
                    {row[header]}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}