import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./pages/Login";
import Feira from "./pages/Feira";
import Carrinho from "./pages/Carrinho";
import { UserProvider} from "./Common/Hooks/User";
import {CartProvider} from "./Common/Hooks/Cart";
import {PagamentoProvider} from "./Common/Hooks/Pagamento";

function Routes () {

    return(
        <BrowserRouter>
            <Switch>
              <UserProvider>
                <Route exact path="/">
                    <Login />
                </Route>
               <CartProvider>
                   <PagamentoProvider>
                   <Route path="/feira">
                       <Feira />
                   </Route>
                       <Route path="/carrinho">
                           <Carrinho />
                       </Route>
                   </PagamentoProvider>
               </CartProvider>
              </UserProvider>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;