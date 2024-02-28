'use client';

import { useEffect, useState } from "react";
import { api } from "../../helpers/api";
import styles from './PersonListing.module.css';

export const PersonListing = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get('/persons');
            setPersons(response.data);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.scrollableContainer}>
            {!persons.length ? <p>Não há pessoas cadastradas</p> :
            <table className={styles.contentsTable}>
                <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Email</th>
                    <th>Senha</th>
                    <th>Telefone</th>
                    <th>Data de Nascimento</th>
                    <th>Estado Civil</th>
                    <th>Naturalidade</th>
                    <th>CPF</th>
                    <th>RG</th>
                    <th>Profissão</th>
                    <th>Nome do Cônjuge</th>
                    <th>CPF do Cônjuge</th>
                    <th>Endereço</th>
                    <th>Bairro</th>
                    <th>Cidade</th>
                    <th>CEP</th>
                    <th>Observação</th>
                    <th>Data da Compra</th>
                </tr>
                {persons && persons.map((person: any) => (
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.surname}</td>
                        <td>{person.email}</td>
                        <td>{person.password}</td>
                        <td>{person.phone}</td>
                        <td>{person.birthdate}</td>
                        <td>{person.maritalStatus}</td>
                        <td>{person.birthplace}</td>
                        <td>{person.cpf}</td>
                        <td>{person.rg}</td>
                        <td>{person.occupation}</td>
                        <td>{person.spouseName}</td>
                        <td>{person.spouseCpf}</td>
                        <td>{person.address}</td>
                        <td>{person.neighborhood}</td>
                        <td>{person.city}</td>
                        <td>{person.zipCode}</td>
                        <td>{person.observation}</td>
                        <td>{person.purchaseDate}</td>
                    </tr>
                ))}
            </table>}
        </div>
    );
}