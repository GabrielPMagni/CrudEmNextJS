import { FormPF } from "./components/Form/Form";
import { Header } from "./components/Header/Header";

export default function Home() {
  return (
    <>
      <Header  title="Cadastro de pessoas físicas"/>
      <main>
        <FormPF />
      </main>
    </>
  );
}