"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, PlusIcon, Trash2Icon, UploadIcon } from "lucide-react";
import CustomLink from "@/components/ui/custom-link";
import { FormEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryProps } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Post title is required",
    })
    .min(10),
  content: z
    .string({
      required_error: "Post content is required",
    })
    .min(100),
  links: z.string().array().optional(),
  selectedCategory: z.string({
    required_error: "Please select a category",
  }),
  imageUrl: z.string().optional(),
  publicId: z.string().optional(),
});

export default function PostForm() {
  const router = useRouter();

  const [categoriesData, setCategoriesData] = useState<CategoryProps[]>([]);
  const [addedLinks, setAddedLinks] = useState<string[]>([]);
  const [enteredLink, setEnteredLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  // !! Form Schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      links: addedLinks,
      selectedCategory: "",
      imageUrl: "",
      publicId: "",
    },
  });

  // ** Add link
  const addLink = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (enteredLink.trim() !== "") {
      setAddedLinks((prev: string[]) => [...prev, enteredLink]);
      form.setValue("links", addedLinks);
      setEnteredLink("");
    }
  };

  // ** Delete link
  const deleteLink = (index: number) => {
    setAddedLinks((prev) => prev.filter((_, i) => i !== index));
  };

  // ** Post image upload
  const handleImageUpload = (result: CldUploadWidgetResults) => {
    setIsLoading(true);
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;

      setUploadedImage(url);
      form.setValue("imageUrl", url);
      form.setValue("publicId", public_id);
      setIsLoading(false);
    }
  };

  // ** Post image remove
  const removeUploadedImage = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(false);
      const response = await axios.post("/api/removeImage", {
        publicId: form.getValues("publicId"),
      });

      if (response.data.message === "success") {
        toast.success("Image removed");
        setUploadedImage("");
        form.setValue("publicId", "");
        form.setValue("imageUrl", "");
      }
    } catch (e) {
      console.log(e);
      toast.error("Cannot remove the image");
    } finally {
      setIsLoading(false);
    }
  };

  // ** Fetch Categories
  const fetchAllCategories = async () => {
    const response = await fetch(`/api/categories`);
    const catNames = await response.json();
    setCategoriesData(catNames);
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);

  // !! Form Submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/posts", values);
      if (response.data) {
        toast.success("Post created successfully");
        router.push("/dashboard");
        router.refresh();
        setIsLoading(false);
      }
    } catch (e) {
      toast.error("Something went wrong!");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Post content..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <div className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="links"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Links</FormLabel>
                    <div className="flex gap-3 flex-wrap">
                      {addedLinks &&
                        addedLinks.map((link: string, index: number) => (
                          <CustomLink
                            key={index}
                            link={link}
                            deleteLink={() => deleteLink(index)}
                          />
                        ))}
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Past the link and click on Add"
                        value={enteredLink}
                        onChange={(e) => setEnteredLink(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                variant="outline"
                className="w-fit flex items-center gap-1.5"
                onClick={addLink}
              >
                <PlusIcon size={18} />
                Add
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div>
                      <div className="relative w-full h-[350px] bg-gray-200 rounded-md flex items-center justify-center text-gray-800">
                        {(uploadedImage !== "" ||
                          form.getValues("publicId") !== "") && (
                          <Image
                            className="absolute object-cover"
                            src={uploadedImage}
                            alt="Post's uploaded image"
                            fill
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      {uploadedImage === "" ||
                      form.getValues("publicId") === "" ? (
                        <CldUploadButton
                          uploadPreset={
                            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                          }
                          onUpload={handleImageUpload}
                        >
                          <Button
                            disabled={isLoading}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <UploadIcon size={18} /> Upload image
                          </Button>
                        </CldUploadButton>
                      ) : (
                        <Button
                          disabled={isLoading}
                          variant="destructive"
                          className="flex items-center gap-2"
                          onClick={removeUploadedImage}
                        >
                          <Trash2Icon size={18} /> Remove image
                        </Button>
                      )}
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="selectedCategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category to your post" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoriesData &&
                      categoriesData.map((category: CategoryProps) => (
                        <SelectItem
                          key={category.id}
                          className="cursor-pointer"
                          value={category.name}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" size="lg">
            Add Post
          </Button>
        </form>
      </Form>
    </div>
  );
}
