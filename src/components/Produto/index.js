import { Container } from './styles';
import {memo} from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext} from "../../Common/Hooks/Cart";


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {

    const { carrinho, addProdutos, removeProduto } = useCarrinhoContext();
    const produtoCarrinho = carrinho.find(itemCarrinho => itemCarrinho.id === id);



  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
            onClick={() => removeProduto(id)}
            disabled={!produtoCarrinho}
          >
            <RemoveIcon />
          </IconButton>
            {produtoCarrinho?.quantidade || 0}
          <IconButton color="primary"
              onClick={() => addProdutos({nome, foto, id, valor})}>
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)