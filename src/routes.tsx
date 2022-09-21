import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import { List } from "./pages/List";
import { Products } from "./pages/Products";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="list" element={<List />} />
        <Route path="products/:id" element={<Products />} />
        <Route path="/" element={<List />} />
      </Switch>
    </BrowserRouter>
  );
}
