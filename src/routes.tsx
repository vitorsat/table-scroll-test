import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import { Login } from "./pages/Login/Login";
import { Main } from "./pages/Main/Main";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="login" element={<Login />} />
        <Route path="main" element={<Main />} />
        <Route path="/" element={<Main />} />
      </Switch>
    </BrowserRouter>
  );
}
