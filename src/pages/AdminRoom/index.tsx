import { RoomCode } from "../../components/RoomCode";
import logoImg from "../../assets/images/logo.svg";
import {
  SAdminButton,
  SContent,
  SHeader,
  SMain,
  SQuestionList,
  SRoomTitle,
} from "../../styles/SRoom";
//import { database } from "../../services/firebase";

import { useParams } from "react-router-dom";
import { RoomParams } from "../../@types";
//import { FormEvent, useState } from "react";
//import { useAuth } from "../../hooks/useAuth";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";
import { Button } from "../../components/Button";

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomsId = params.id;

  const { title, questions } = useRoom(roomsId);
  //const { user } = useAuth();

  //const [newQuestion, setNewQuestion] = useState("");

  /*async function handleSendQuestion(e: FormEvent) {
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
  } */

  return (
    <div id="page-room">
      <SHeader>
        <SContent>
          <img src={logoImg} alt="Letmeask" />
          <SAdminButton>
            <RoomCode code={roomsId} />
            <Button>Encerrar sala</Button>
          </SAdminButton>
        </SContent>
      </SHeader>

      <SMain>
        <SRoomTitle>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </SRoomTitle>

        <SQuestionList>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </SQuestionList>
      </SMain>
    </div>
  );
}
