// utils/getDisplayName.ts

export const getDisplayName = (fullName?: string | null): string => {
  if (!fullName) return "there";

  const parts = fullName.trim().split(/\s+/);

  const firstName = parts[0];
  const lastNameInitial = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return lastNameInitial ? `${firstName} ${lastNameInitial}` : firstName;
};
