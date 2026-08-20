import { useState } from "react";
import { Search, UserCheck, X } from "lucide-react";
import Modal from "../common/Modal";

export interface WorkspaceUser {
  id: string;
  name: string;
  email: string;
}

interface UserAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: WorkspaceUser[];
  isLoadingUsers?: boolean;
  onSelectUser: (user: WorkspaceUser) => void;
}

export default function UserAssignModal({
  isOpen,
  onClose,
  users,
  isLoadingUsers = false,
  onSelectUser,
}: UserAssignModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Ticket to Teammate"
      description="Select a user from your workspace to assign this ticket."
      size="md"
    >
      <div className="space-y-4 pt-2">
        {/* Search Input */}
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-8 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* User List */}
        <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white">
          {isLoadingUsers ? (
            <div className="p-6 text-center text-xs font-medium text-slate-400">
              Loading workspace members...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-xs font-medium text-slate-400">
              No teammates found matching "{searchTerm}"
            </div>
          ) : (
            filteredUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => {
                  onSelectUser(user);
                  onClose();
                }}
                className="flex w-full items-center justify-between p-3 text-left transition hover:bg-indigo-50/50 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-slate-400">{user.email}</p>
                  </div>
                </div>

                <UserCheck
                  size={16}
                  className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-indigo-600 transition-all"
                />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
