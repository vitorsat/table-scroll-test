import { useQuery } from "react-query";

import { api } from "../services/api";

interface Result {
  error: {
    message: string
  }
}

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

  const getListProducts = useQuery<any, Error>("getPost", getListProductsCall, { refetchOnWindowFocus: false, retry: 2 });

  return { getListProducts };
}
