/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { database } from "../../services/firebase";

import { FirebaseQuestions, QuestionsProps } from "../../@types";
import { useAuth } from "../useAuth";

export function useRoom(roomsId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionsProps[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomsId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id,
            )?.[0],
          };
        },
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off("value");
    };
  }, [roomsId, user?.id]);

  return { title, questions };
}
