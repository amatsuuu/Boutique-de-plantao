import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import {BsPersonCircle} from "react-icons/bs";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {RxExit} from "react-icons/rx";
import { useCookies } from "react-cookie";
import "../styles/components/header.css";

function Header() {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(["credentials"]);
    const [logado, setLogado] = useState("not-log")

    useEffect(() => {
        if(cookies.credentials)
            setLogado("")
    }, [])

    function handleLogin () {
        if(cookies.credentials)
            navigate("/perfil");
        else
            navigate("/login")
    }

    const handleLogOut = () => {
        removeCookies("credentials")
        navigate("/")
    }

    return (
       <header>
        <div id="header-top">
                <Link to="/"><img src="../images/logos/logo_completo.png" alt="Logo da empresa" id="header-logo"/></Link>
                
                <div id="container-search">
                    <input type="text" name="input" id="input-search"/>
                <button> <FiSearch /></button>
                </div>
                
                <div id="header-buttons">
                    <button className="header-button"> <AiOutlineShoppingCart className="header-icon"/></button>

                    <button className="header-button" onClick={handleLogin}> <BsPersonCircle className="header-icon" /></button>
                    <button className="header-button" id={logado} onClick={handleLogOut}> <RxExit className="header-icon"/></button>
                </div>
            </div>
       </header>
    )
}

export default Header;