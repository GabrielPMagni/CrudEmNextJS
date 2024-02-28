import { FormPF } from "./components/Form";
import Moment from "moment";
import { Header } from "./components/Header";

export default function Home() {
  Moment.locale("pt-br");
  return (
    <>
      <Header />
      <main>
        <FormPF />
      </main>
    </>
  );
}