"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText } from "lucide-react";

import { parseCSV } from "@/lib/csv";
import { importCSV } from "@/services/api";

import PreviewTable from "@/components/preview/PreviewTable";
import ResultTable from "@/components/results/ResultTable";

import { CsvRow } from "@/types/lead";

export default function UploadBox() {
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    const file = acceptedFiles[0];

    setSelectedFile(file);
    setFileName(file.name);

    try {
      const parsedRows = await parseCSV(file);

      setRows(parsedRows);

      setResult(null);
    } catch (err) {
      console.error(err);
      alert("Invalid CSV File");
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      alert("Please upload a CSV.");
      return;
    }

    try {
      setLoading(true);

      const response = await importCSV(selectedFile);

      setResult(response);
    } catch (err) {
      console.error(err);
      alert("Import Failed");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-2xl bg-white p-12 text-center cursor-pointer shadow hover:border-blue-500 transition"
      >
        <input {...getInputProps()} />

        <UploadCloud
          size={60}
          className="mx-auto text-blue-500"
        />

        <h2 className="text-3xl font-bold mt-4">
          Import Leads via CSV
        </h2>

        <p className="mt-3 text-gray-500">
          Drag & Drop or Click to Upload
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Supported Format : CSV
        </p>

      </div>

      {fileName && (

        <div className="bg-white rounded-xl shadow mt-6 p-5 flex items-center justify-between">

          <div className="flex gap-4 items-center">

            <FileText
              size={40}
              className="text-green-600"
            />

            <div>

              <h3 className="font-bold">
                {fileName}
              </h3>

              <p className="text-gray-500">
                {rows.length} Records Detected
              </p>

            </div>

          </div>

          <button
            onClick={handleImport}
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Import"}
          </button>

        </div>

      )}

      {rows.length > 0 && (
        <PreviewTable rows={rows} />
      )}

      {loading && (

        <div className="bg-white rounded-xl shadow mt-6 p-6">

          <h3 className="font-bold">
            AI is Processing CSV...
          </h3>

          <div className="mt-4 w-full h-3 bg-gray-200 rounded">

            <div className="h-3 bg-blue-500 rounded animate-pulse w-full"></div>

          </div>

        </div>

      )}

      {result && (

        <>

          <div className="grid grid-cols-3 gap-5 mt-8">

            <div className="bg-blue-50 p-6 rounded-xl">

              <p>Total Uploaded</p>

              <h2 className="text-3xl font-bold">
                {result.totalUploaded}
              </h2>

            </div>

            <div className="bg-green-50 p-6 rounded-xl">

              <p>Imported</p>

              <h2 className="text-3xl font-bold text-green-600">
                {result.totalImported}
              </h2>

            </div>

            <div className="bg-red-50 p-6 rounded-xl">

              <p>Skipped</p>

              <h2 className="text-3xl font-bold text-red-600">
                {result.totalSkipped}
              </h2>

            </div>

          </div>

          <ResultTable records={result.records} />

        </>

      )}

    </div>
  );
}