'use client';

import { useEffect, useState } from "react";
import Input from "../Input";
import { api, viaCep } from "../../helpers/api";
import Swal from "sweetalert2";
import styles from './Form.module.css';

export const FormPF = () => {
    const [name, setName] = useState<string>();
    const [surname, setSurname] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [birthdate, setBirthdate] = useState<string>();
    const [maritalStatus, setMaritalStatus] = useState<string>();
    const [birthplace, setBirthplace] = useState<string>();
    const [cpf, setCpf] = useState<string>();
    const [rg, setRg] = useState<string>();
    const [occupation, setOccupation] = useState<string>();
    const [spouseName, setSpouseName] = useState<string>();
    const [spouseCpf, setSpouseCpf] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [neighborhood, setNeighborhood] = useState<string>();
    const [city, setCity] = useState<string>();
    const [zipCode, setZipCode] = useState<string>();
    const [observation, setObservation] = useState<string>();
    const [purchaseDate, setPurchaseDate] = useState<string>();

    const maritalStatusOptions = [
        { value: "Solteiro", label: "Solteiro" },
        { value: "Casado", label: "Casado" },
        { value: "Divorciado", label: "Divorciado" },
        { value: "Viúvo", label: "Viúvo" },
        { value: "Separado", label: "Separado" },
    ];

    const validateSubmit = () => {
        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Erro!',
                text: 'As senhas não conferem',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }
        if (cpf && cpf.length !== 14) {
            Swal.fire({
                title: 'Erro!',
                text: 'CPF inválido',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (zipCode && zipCode.length === 9) {
            viaCep.get(`${zipCode.replaceAll(/[^\d]/g, '')}/json`)
                .then((response) => {
                    const data = response.data;
                    setAddress(data.logradouro);
                    setNeighborhood(data.bairro);
                    setCity(data.localidade);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [zipCode]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateSubmit()) {
            return;
        }
        const data = {
            name,
            surname,
            email,
            password,
            confirmPassword,
            phone,
            birthdate,
            maritalStatus,
            birthplace,
            cpf,
            rg,
            occupation,
            spouseName,
            spouseCpf,
            address,
            neighborhood,
            city,
            zipCode,
            observation,
            purchaseDate,
        };
        api.post("/persons", data)
            .then((response) => {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Pessoa física cadastrada com sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                console.log(response);
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Erro!',
                    text: error.response?.data?.message[0] || 'Falha ao cadastrar pessoa física',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.log(error);
        });
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className="input-container">
                <div className={'input-group'}>
                    <Input
                        label="Nome"
                        type="text"
                        id="name"
                        value={name}
                        placeholder="Digite o primeiro nome"
                        required={true}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Sobrenome"
                        type="text"
                        id="surname"
                        value={surname}
                        placeholder="Digite o sobrenome"
                        required={true}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Digite o email"
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Senha"
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Digite a senha"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Confirmar Senha"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirme a senha"
                        required={true}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        mask="(99) 99999-9999"
                        label="Telefone"
                        type="tel"
                        id="phone"
                        value={phone}
                        placeholder="Digite o telefone"
                        required={true}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Data de Nascimento"
                        type="date"
                        id="birthdate"
                        value={birthdate}
                        required={false}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <label htmlFor="maritalStatus">Estado civil</label>
                    <select
                        id="maritalStatus"
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {maritalStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                {maritalStatus === 'Casado' &&
                    <>
                        <div className={'input-group'}>
                            <Input
                                label="Nome do Cônjuge"
                                type="text"
                                id="spouseName"
                                value={spouseName}
                                placeholder="Digite o nome do cônjuge"
                                required={true}
                                onChange={(e) => setSpouseName(e.target.value)}
                            />
                        </div>
                        <div className={'input-group'}>
                            <Input
                                mask="999.999.999-99"
                                label="CPF do Cônjuge"
                                type="text"
                                id="spouseCpf"
                                value={spouseCpf}
                                placeholder="Digite o CPF do cônjuge"
                                required={true}
                                onChange={(e) => setSpouseCpf(e.target.value)}
                            />
                        </div>
                    </>
                }
                <div className={'input-group'}>
                    <Input
                        label="Naturalidade"
                        type="text"
                        id="birthplace"
                        value={birthplace}
                        placeholder="Digite a naturalidade"
                        required={false}
                        onChange={(e) => setBirthplace(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        mask="999.999.999-99"
                        label="CPF"
                        type="text"
                        id="cpf"
                        value={cpf}
                        placeholder="Digite o CPF"
                        required={true}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="RG"
                        type="text"
                        id="rg"
                        value={rg}
                        placeholder="Digite o RG"
                        required={false}
                        onChange={(e) => setRg(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Profissão"
                        type="text"
                        id="occupation"
                        value={occupation}
                        placeholder="Digite a profissão"
                        required={false}
                        onChange={(e) => setOccupation(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        mask="99999-999"
                        label="CEP"
                        type="text"
                        id="zipCode"
                        value={zipCode}
                        placeholder="Digite o CEP"
                        required={true}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Endereço Residencial"
                        type="text"
                        id="address"
                        value={address}
                        placeholder="Digite o endereço"
                        required={true}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Bairro"
                        type="text"
                        id="neighborhood"
                        value={neighborhood}
                        placeholder="Digite o bairro"
                        required={true}
                        onChange={(e) => setNeighborhood(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Município"
                        type="text"
                        id="city"
                        value={city}
                        placeholder="Digite o município"
                        required={true}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Observação"
                        type="text"
                        id="observation"
                        value={observation}
                        placeholder="Digite a observação"
                        required={false}
                        onChange={(e) => setObservation(e.target.value)}
                    />
                </div>
                <div className={'input-group'}>
                    <Input
                        label="Data da Compra"
                        type="date"
                        id="purchaseDate"
                        value={purchaseDate}
                        required={false}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
}