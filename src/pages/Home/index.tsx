import { useHistory } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { Button } from "../../components/Button";
import {
  SCreateRoom,
  SMainContent,
  SPageAuth,
  SSeparator,
} from "../../styles/SAuth";

export function Home() {
  const history = useHistory();

  async function handleCreateRoom() {
    history.push("/rooms/new");
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
          <SCreateRoom onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </SCreateRoom>
          <SSeparator>ou entre em uma sala</SSeparator>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </SMainContent>
      </main>
    </SPageAuth>
  );
}
