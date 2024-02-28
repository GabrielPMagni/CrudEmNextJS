import { Header } from "../components/Header/Header";
import { PersonListing } from "../components/PersonListing/PersonListing";

export default function Listing() {
  return (
    <>
      <Header  title="Listagem de pessoas físicas"/>
      <main>
        <PersonListing />
      </main>
    </>
  );
}