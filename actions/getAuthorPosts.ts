import axios from "axios";

export const getAuthorPosts = async (email: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/authors/${email}`
    );
    if (response.data) {
      return await response.data.posts;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
