import { RoomCode } from "../../components/RoomCode";
import { Button } from "../../components/Button";
import logoImg from "../../assets/images/logo.svg";
import {
  SContent,
  SFormFooter,
  SHeader,
  SMain,
  SRoomTitle,
  SUserInfo,
} from "../../styles/SRoom";
import { database } from "../../services/firebase";

import { useParams } from "react-router-dom";
import { RoomParams, FirebaseQuestions, Question } from "../../@types";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function Room() {
  const params = useParams<RoomParams>();
  const roomsId = params.id;
  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
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

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomsId}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <SHeader>
        <SContent>
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomsId} />
        </SContent>
      </SHeader>

      <SMain>
        <SRoomTitle>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </SRoomTitle>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />

          <SFormFooter>
            {user ? (
              <SUserInfo>
                <img src={user.avatar} alt="Avatar" />
                <span>{user.name}</span>
              </SUserInfo>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </SFormFooter>
        </form>
      </SMain>
    </div>
  );
}
