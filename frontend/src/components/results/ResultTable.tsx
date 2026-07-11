interface Props {
  records: any[];
}

export default function ResultTable({ records }: Props) {
  if (!records || records.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow">

      <div className="p-5 border-b">

        <h2 className="text-xl font-bold">
          Imported CRM Records
        </h2>

      </div>

      <div className="overflow-auto max-h-[500px]">

        <table className="w-full">

          <thead className="sticky top-0 bg-gray-100">

            <tr>

              <th className="p-3 text-left">Name</th>

              <th className="p-3 text-left">Email</th>

              <th className="p-3 text-left">Mobile</th>

              <th className="p-3 text-left">Company</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">City</th>

              <th className="p-3 text-left">Country</th>

            </tr>

          </thead>

          <tbody>

            {records.map((lead: any, index: number) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">{lead.name}</td>

                <td className="p-3">{lead.email}</td>

                <td className="p-3">
                  {lead.mobile_without_country_code}
                </td>

                <td className="p-3">{lead.company}</td>

                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700">
                    {lead.crm_status || "GOOD_LEAD_FOLLOW_UP"}
                  </span>
                </td>

                <td className="p-3">{lead.city}</td>

                <td className="p-3">{lead.country}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}