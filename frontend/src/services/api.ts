import axios from "axios";

export const importCSV = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
        "http://localhost:5000/api/import",
        formData
    );

    return response.data;
};