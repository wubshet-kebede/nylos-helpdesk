export const getInitials = (fullName?: string | null): string => {
  if (!fullName?.trim()) return "";

  const parts = fullName.trim().split(/\s+/);

  const firstInitial = parts[0][0];
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
};
