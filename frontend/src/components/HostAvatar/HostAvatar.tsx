import { useState } from "react";

interface HostAvatarProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: { container: "w-8 h-8", text: "text-xs" },
  md: { container: "w-12 h-12", text: "text-base" },
  lg: { container: "w-20 h-20", text: "text-2xl" },
};

export default function HostAvatar({
  firstName,
  lastName,
  avatarUrl,
  size = "lg",
}: HostAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const { container, text } = SIZE_CLASSES[size];

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={`${firstName} ${lastName}`}
        className={`${container} rounded-full object-cover`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${container} rounded-full bg-red-500 flex items-center justify-center flex-shrink-0`}
    >
      <span className={`text-white ${text} font-semibold leading-none`}>
        {initials}
      </span>
    </div>
  );
}
