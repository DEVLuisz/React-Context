import React, {createContext, useContext, useEffect, useState} from "react";
import {usePagamentoContext} from "./Pagamento";
import {UserContext} from "./User";

export const CartContext = createContext();
CartContext.displayName = "Carrinho";

export const CartProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);
    const [quantidadeProduto, setQuantidadeProduto] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

    return (
        <CartContext.Provider
            value={{ carrinho,
                setCarrinho,
                quantidadeProduto,
                setQuantidadeProduto,
                valorTotalCarrinho,
                setValorTotalCarrinho
            }}>
            { children }
        </CartContext.Provider>
    )
}

export const useCarrinhoContext = () => {
    const { carrinho,
        setCarrinho,
        quantidadeProduto,
        setQuantidadeProduto,
        valorTotalCarrinho,
        setValorTotalCarrinho}
        = useContext(CartContext);
    const {
        formaPagamento
    } = usePagamentoContext();
    const {setSaldo} = useContext(UserContext);

    function changeQuantidade(id, quantidade) {
        return carrinho.map(itemCarrinho => {
            if(itemCarrinho.id === id) itemCarrinho.quantidade += quantidade;
            return itemCarrinho;
        })
    }

    function addProdutos(novoProduto) {
        const temProduto = carrinho.some(itemCarrinho => itemCarrinho.id === novoProduto.id);
        if(!temProduto) {
            novoProduto.quantidade = 1;
            return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto]);
        }
        setCarrinho(changeQuantidade(novoProduto.id, 1))
    }

    function removeProduto(id) {
        const produto = carrinho.find(itemCarrinho => itemCarrinho.id === id);
        const Ultimo = produto.quantidade === 1;
        if(Ultimo) {
            return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemCarrinho =>
            itemCarrinho.id !== id))
        }
        setCarrinho(changeQuantidade(id, -1));
    }

    function efetuarCompra(){
        setCarrinho([]);
        setSaldo(saldoAtual => saldoAtual - valorTotalCarrinho);
    }

    useEffect(() => {
        const {novoTotal, novaQuantidade} = carrinho.reduce((contador, produto) =>
            ({
                novaQuantidade:  contador.novaQuantidade + produto.quantidade,
                novoTotal: contador.novoTotal + (produto.valor * produto.quantidade)
            }), {
            novaQuantidade: 0,
            novoTotal: 0
        });
        setQuantidadeProduto(novaQuantidade);
        setValorTotalCarrinho(novoTotal * formaPagamento.juros)
    }, [carrinho, setQuantidadeProduto, setValorTotalCarrinho, formaPagamento])

    return {
        carrinho,
        setCarrinho,
        addProdutos,
        removeProduto,
        quantidadeProduto,
        setQuantidadeProduto,
        valorTotalCarrinho,
        efetuarCompra
    }
}