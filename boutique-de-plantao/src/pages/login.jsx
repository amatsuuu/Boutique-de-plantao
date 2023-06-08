import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Footer from '../components/footer';
import "../styles/pages/login.css";
import { useCookies } from "react-cookie";
import "../styles/pages/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()
    const [warning, setWarning] = useState("not-warning");
    const [dataClients, setDataClients] = useState({})
    const [cookies, setCookies, removeCookies] = useCookies(["credentials"]);

    useEffect(() => {
        fetch("../../clientes.json")
            .then(response => response.json())
            .then(data => setDataClients(Object.values(data)))
            .catch(error => console.log(error))
    }, [])

    function handleLoginClick() {
        const login = document.getElementById("input-email").value
        const password = document.getElementById("input-password").value
        let userFound = false;

        dataClients.forEach(client => {
            if (client.login === login && client.senha === password) {
                setCookies("credentials", { login, password });
                navigate("/perfil");
                userFound = true;
                return; // Interrompe a iteração
            }
        });

        if (!userFound) {
            setTimeout(() => {
                alert("Usuário ou senha incorretos");
            }, 0);
        }
    }

    return (
        <>
            <Header />
            <Navbar />

            <main>
                <div id="login">
                    <h1 className="tittle">Login</h1>

                    <div className="boxes-inputs form ">
                        <form action="">
                            <label htmlFor="input-email">E-mail</label>
                            <input type="email" id="input-email" />
                            <label htmlFor="input-password">Senha</label>
                            <input type="password" id="input-password" />
                            <input type="submit" value="Continuar" onClick={handleLoginClick} />
                        </form>
                    </div>

                    <input type="button" value="Cadastre-se" />
                </div>
            </div>

            <Footer />
        </>

    );
}

export default Login;
