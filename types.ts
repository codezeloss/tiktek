export interface PostProps {
  id: string;
  title: string;
  content: string;
  authorEmail: string;
  author?: {
    name: string;
  };
  createdAt: string;
  categoryName?: string;
  links: string[];
  imageUrl?: string;
  publicId?: string;
}

export interface CategoryProps {
  id: string;
  name: string;
}
