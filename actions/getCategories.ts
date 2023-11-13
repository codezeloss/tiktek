import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/categories`
    );
    if (response.data) {
      return await response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
