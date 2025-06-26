import React from "react";
import { Button } from "@/components/ui/button";
import type { Portfolio } from "@/lib/types";
import Image from "next/image";

// export function ProfileCard({ dev }: { dev: Portfolio }) {
//     const avatarUrl = dev.avatarUrl.startsWith("http") ? dev.avatarUrl : "/placeholders/user.png";
//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white p-4">
//       <Image
//         width={100}
//         height={100}
//         className="w-24 h-24 rounded-full mx-auto"
//         src={avatarUrl}
//         alt="Profile"
//       />
//       <div className="text-center mt-4">
//         <h2 className="text-xl font-bold">{dev.name}</h2>
//         <p className="text-gray-400">{dev.tagline}</p>
//         <Button className="mt-4 bg-blue-500 hover:bg-blue-700 text-neutral-950 font-bold py-2 px-4 rounded" asChild>
//           <a href={`/profile/${dev.username}`}>Portfolio</a>
//         </Button>
//       </div>
//     </div>
//   );
// }

interface ProfileCardProps {
  name: string;
  tagline: string;
  avatarUrl: string;
  username: string;
  bio: string;
}

export function ProfileCard({
  name,
  tagline,
  avatarUrl,
  username,
  bio,
}: ProfileCardProps) {
  const avatar = avatarUrl.startsWith("http")
    ? avatarUrl
    : "/placeholders/user.png";
  return (
    <div className="flex max-w-lg overflow-hidden shadow-lg dark:bg-gray-800/60 dark:text-neutral-600 dark:border-neutral-800 dark:shadow-neutral-800 bg-neutral-950 text-neutral-950 px-12 py-6
    transition-all transform hover:scale-105 hover:shadow-xl hover:translate-y-[-1px] rounded-xl justify-center items-center
    ">
      <img
        className="w-fit h-fit rounded-full mx-auto max-w-18 max-h-18 object-cover"
        src={avatar}
        alt="Profile"
      />
      <div className="text-center justify-center items-center flex flex-col gap-2">
        <h2 className="text-xl font-bold dark:text-neutral-300">{name}</h2>
        <p className="text-gray-400 dark:text-neutral-300">{tagline}</p>
        {/* <p className="text-gray-400 dark:text-neutral-300">{bio}</p> */}
      </div>
    </div>
  );
}
