import { useState, useEffect } from "react";
import { database } from "../../services/firebase";

import { FirebaseQuestions, QuestionsProps } from "../../@types";

export function useRoom(roomsId: string) {
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
          };
        },
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomsId]);

  return { title, questions };
}
