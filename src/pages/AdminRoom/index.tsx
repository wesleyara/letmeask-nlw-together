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
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";

import { Link, useHistory, useParams } from "react-router-dom";
import { RoomParams } from "../../@types";
//import { useAuth } from "../../hooks/useAuth";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";
import { Button } from "../../components/Button";
import { database } from "../../services/firebase";

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomsId = params.id;
  const history = useHistory();

  const { title, questions } = useRoom(roomsId);
  //const { user } = useAuth();

  async function handleEndRoom() {
    await database.ref(`rooms/${roomsId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomsId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomsId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomsId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <SHeader>
        <SContent>
          <Link to="/">
            <img src={logoImg} alt="Letmeask" />
          </Link>
          <SAdminButton>
            <RoomCode code={roomsId} />
            <Button onClick={handleEndRoom}>Encerrar sala</Button>
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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="" />
                    </button>
                    <button
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="" />
                    </button>
                  </>
                )}
                <button onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="" />
                </button>
              </Question>
            );
          })}
        </SQuestionList>
      </SMain>
    </div>
  );
}
