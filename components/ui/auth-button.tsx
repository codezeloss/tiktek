"use client";

import Image from "next/image";

interface Props {
  img: string;
  title: string;
  handleClick: () => void;
}

export default function AuthButton({ img, title, handleClick }: Props) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 py-6 px-11 rounded-xl border hover:bg-gray-100/50 dark:hover:bg-gray-600 hover:border-black hover:border-2 cursor-pointer"
      onClick={handleClick}
    >
      <Image className="" src={img} alt={title} width={30} height={30} />
      <p>{title}</p>
    </button>
  );
}
