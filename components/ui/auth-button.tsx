import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  img: string;
  title: string;
}

export default function AuthButton({ img, title }: Props) {
  return (
    <div className="w-full flex items-center justify-center gap-3 py-6 px-11 rounded-xl border hover:bg-gray-100/50 hover:border-black hover:border-2 cursor-pointer">
      <Image className="" src={img} alt={title} width={30} height={30} />
      <p>{title}</p>
    </div>
  );
}
