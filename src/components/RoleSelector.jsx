
import React from "react";
import { Button } from "./ui/button";

const roles = [
  { label: "Patient", value: "patient" },
  { label: "Doctor", value: "doctor" },
];

export default function RoleSelector({ selectedRole, onSelect }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {roles.map((role) => (
        <Button
          key={role.value}
          variant={selectedRole === role.value ? "default" : "outline"}
          size="sm"
          type="button"
          onClick={() => onSelect(role.value)}
        >
          {role.label}
        </Button>
      ))}
    </div>
  );
}
