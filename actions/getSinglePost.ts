import axios from "axios";

export const getSinglePost = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/posts/${id}`
    );
    if (response.data) {
      return await response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
