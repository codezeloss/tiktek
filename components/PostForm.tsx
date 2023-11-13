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
import { ImageIcon, PlusIcon } from "lucide-react";
import CustomLink from "@/components/ui/custom-link";
import { useEffect, useState } from "react";
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

  // !! Form Schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      links: [],
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
      setEnteredLink("");
    }
  };

  // ** Delete link
  const deleteLink = (index: number) => {
    setAddedLinks((prev) => prev.filter((_, i) => i !== index));
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
        router.push("/dashboard");
        toast.success("Post created successfully");
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
    <>
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
                            link={link}
                            deleteLink={() => deleteLink(index)}
                          />
                        ))}
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Past the link and click on Add"
                        onChange={(e) => setEnteredLink(e.target.value)}
                        value={enteredLink}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={addLink}
              >
                <PlusIcon size={18} />
                Add
              </Button>
            </div>
          </div>

          <div className="w-full h-[350px] bg-gray-200 rounded-md flex items-center justify-center text-gray-800">
            <ImageIcon size={32} />
          </div>

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
    </>
  );
}
