import { useHistory } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { Button } from "../../components/Button";
import {
  SCreateRoom,
  SCreateRoomAuth,
  SMainContent,
  SPageAuth,
  SSeparator,
} from "../../styles/SAuth";
import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = database.ref(`rooms/${roomCode}`).get();

    if (!(await roomRef).exists()) {
      alert("Room does not exists.");
      return;
    }

    if ((await roomRef).val().endedAt) {
      alert("Room already closed.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <SPageAuth>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <SMainContent>
          {!user ? (
            <>
              <img src={logoImg} alt="Letmeask" />
              <SCreateRoom onClick={handleCreateRoom}>
                <img src={googleIconImg} alt="Logo do Google" />
                Crie sua sala com o Google
              </SCreateRoom>
              <SSeparator>ou entre em uma sala</SSeparator>
            </>
          ) : (
            <>
              <img src={user.avatar} alt="" />
              <br />
              <h1>{user.name}</h1>
              <SCreateRoomAuth onClick={handleCreateRoom}>
                Crie sua sala
              </SCreateRoomAuth>
              <SSeparator>ou entre em uma sala</SSeparator>
            </>
          )}
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </SMainContent>
      </main>
    </SPageAuth>
  );
}
