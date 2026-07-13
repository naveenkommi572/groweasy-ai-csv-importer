import axios from "axios";

const API =
  process.env.NEXT_PUBLIC_API ||
  "http://localhost:5000";

export const importCSV = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${API}/api/import`,
    formData
  );

  return response.data;
};