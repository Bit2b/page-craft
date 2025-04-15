"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/components/FullScreenLoader";
import { toast } from "sonner";
import { getUsers } from "./action";

type User = {
  id: string,
  name: string,
  avatar: string
}

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = useMemo(() => async () => {
    try {
      const list = await getUsers();
      setUsers(list);
    } catch {
      toast.error('Failed To fetch Users')
    }
  }, [])

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint='/api/liveblocks-auth'
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        )
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUser = users;
        if (text) {
          filteredUser = users.filter((user) => {
            user.name.toLowerCase().includes(text.toLowerCase())
          })
        }
        return filteredUser.map((user) => user.id);
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Room Loading..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}