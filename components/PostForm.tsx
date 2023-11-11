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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { categoriesData } from "@/components/CategoriesList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  category: z.string({
    required_error: "Please select a category",
  }),
});

export default function PostForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addedLinks, setAddedLinks] = useState<string[]>([]);
  const [enteredLink, setEnteredLink] = useState<string>("");

  // !! Form Schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      links: [],
      category: selectedCategory || "",
    },
  });

  // ** Form Submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
                  <FormItem className="w-full space-y-3">
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
            name="category"
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
                      categoriesData.map((category) => (
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

          <Button type="submit" size="lg">
            Add Post
          </Button>
        </form>
      </Form>
    </>
  );
}
