import axios from "axios";

export const getAllTypes = async () => {
    try {
        const temps = await axios.get("http://localhost:8080/types");
        return temps.data;
    } catch (error) {
        console.log("Error in getAllTypes");
        return [];
    }
}