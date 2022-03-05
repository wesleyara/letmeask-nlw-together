import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { SMainContent, SPageAuth } from "../../styles/SAuth";
import { database } from "../../services/firebase";

export function NewRoom() {
  const [newRoom, setNewRoom] = useState("");

  const { user } = useAuth();
  const history = useHistory();

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
      authorEmail: user?.email,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              onChange={(e) => setNewRoom(e.target.value)}
              value={newRoom}
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </SMainContent>
      </main>
    </SPageAuth>
  );
}
