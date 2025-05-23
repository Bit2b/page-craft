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
import { getDocuments, getUsers } from "./action";
import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

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
  })

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endPoint = '/api/liveblocks-auth';
        const room = params.documentId as string;

        const response = await fetch(endPoint, {
          method: 'POST',
          body: JSON.stringify({ room })
        })
        return await response.json();
      }}

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
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{ leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT }}
      >
        <ClientSideSuspense fallback={<FullScreenLoader label="Room Loading..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}