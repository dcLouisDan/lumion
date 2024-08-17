import React from "react";

interface ButtonProps {
  label: string;
  theme: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled: boolean;
  additionalClass: string;
}

export default function Button({ label, onClick }: ButtonProps) {
  return <div>Button</div>;
}
