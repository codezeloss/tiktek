"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import AlertModal from "@/components/ui/alert-modal";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PostActions({ id }: { id: string }) {
  const router = useRouter();

  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ** Delete post image
  const deleteImage = async (publicId: string) => {
    await axios.post(`/api/removeImage`, publicId);
  };

  // ** Delete post
  const handleDeletePost = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/posts/${id}`);
      if (response.data) {
        console.log(response.data);
        toast.success("Post deleted successfully");
        router.refresh();
        const { publicId } = await response.data;
        await deleteImage(publicId);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openAlertModal}
        onClose={() => setOpenAlertModal(false)}
        onConfirm={handleDeletePost}
        loading={isLoading}
      />

      <div className="flex items-center gap-2.5 ml-auto">
        <Link href={`/edit-post/${id}`}>
          <Button
            className="flex items-center gap-2"
            size="sm"
            variant="secondary"
          >
            <EditIcon size={18} />
            Edit
          </Button>
        </Link>
        <Button
          className="flex items-center gap-2"
          size="sm"
          variant="destructive"
          onClick={() => setOpenAlertModal(true)}
        >
          <TrashIcon size={18} />
          Delete
        </Button>
      </div>
    </>
  );
}
