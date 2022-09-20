import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";

import { api } from "../services/api";
import { FormData } from "../types/index";

export function useListProducts() {
  // const postPostCall = (data: FormData) =>
  //   api.post("/posts", data).then(res => res.data)

  // const queryClient = useQueryClient();

  // const postPost = useMutation(postPostCall, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("getPost");
  //   },
  // });

  const getListProductsCall = () =>
    api.get("/typologies?_embed=products").then(res => res.data);

  const getListProducts = useQuery("getPost", getListProductsCall);

  return { getListProducts };
}
