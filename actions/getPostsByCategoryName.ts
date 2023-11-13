import axios from "axios";

export const getPostsByCategoryName = async (name: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/categories/${name}`
    );
    if (response.data) {
      return await response.data.posts;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
