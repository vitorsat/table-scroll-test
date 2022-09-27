import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import { Products } from "./pages/Products";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="products" element={<Products />} />
        <Route path="/" element={<Products />} />
      </Switch>
    </BrowserRouter>
  );
}
