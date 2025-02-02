import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from '../components/header';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Item from '../components/cart_item';
import "../styles/pages/summary.css"

function Payment() {
    const [itens, setItens] = useState([]);
    const [users, setUsers] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [cookies] = useCookies(["credentials"]);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!cookies.credentials)
            navigate("/login")

        fetch("../jsons/clientes.json")
            .then((response) => response.json())
            .then((data) => setUsers(Object.values(data)))
            .catch((error) => console.log(error));

        fetch('../jsons/carrinho.json')
            .then(response => response.json())
            .then(data => {
                const updatedItens = Object.values(data).map(item => ({ ...item, subtotal: item.valor * item.quantidade_carrinho     }));
                setItens(updatedItens); 
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        const newSubtotal = itens.reduce((total, item) => total + (item.subtotal || 0), 0);
        setSubtotal(newSubtotal);
    }, [itens]);

    const userLogin = cookies.credentials && cookies.credentials.login;
    const usuarioLogado = users.find((user) => user.login === userLogin);

    if (usuarioLogado == undefined) return <>Carregando...</>

    const frete = Math.floor((usuarioLogado.cep).replace(/-/g, "") / 1000000);

    function handlePurchase() {
        navigate("/obrigado");
    }

    return (
        <>
            <Header />
            <Navbar />
            <main>
                <div id="summary">
                    <h1>Resumo da Compra</h1>

                    <div className='secao'>
                        <h2>Produtos</h2>
                        {itens.length > 0 && (
                            <>
                                {itens.map((item, index) => (
                                    <Item
                                        key={item.id}
                                        nome={item.nome}
                                        quantidade_disponivel={item.quantidade_disponivel}
                                        valor={item.valor}
                                        imagem={item.imagem}
                                        quantidade_carrinho={item.quantidade_carrinho}
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    <div className='secao'>
                        <h2>Endereço</h2>
                        <div id="personal-data">
                            <h3> {usuarioLogado.endereco}</h3>
                            <p> {usuarioLogado.cep} - {usuarioLogado.bairro}</p>
                            <p>{usuarioLogado.cidade} - {usuarioLogado.estado}</p>
                            <p>{usuarioLogado.nome} - {usuarioLogado.telefone}</p>
                        </div>
                    </div>
                    
                    <div className='secao'>
                        <h2>Forma de Pagamento</h2>
                        <div id="payment-method">
                            Visa **** XXXX
                        </div>
                    </div>

                    <div className='secao' id='confirmation'>
                        <h2>Confirme sua Compra</h2>
                        <div id="verify-purchase">
                        <div className='cost'>
                                    <div>SUBTOTAL</div>
                                    <div>R$ {subtotal.toFixed(2)}</div>
                                </div>
                                <div className='cost'>
                                    <div>FRETE</div>
                                    <div>R$ {frete.toFixed(2)}</div>
                                </div>
                                <div className='cost'>
                                    <div>TOTAL</div>
                                    <div>R$ {(subtotal + frete).toFixed(2)}</div>
                                </div>
                        </div>
                    </div>
                                
                    <input type="submit" id="confirm-purchase" value="Confirmar" onClick={handlePurchase} />


                </div>
                
            </main>
            <Footer />

        </>
    );
}

export default Payment;