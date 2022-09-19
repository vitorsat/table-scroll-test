import { useMutation, useQuery, useQueryClient } from "react-query";

import { api } from "../services/api";
import { FormData } from "../types/index";

export function usePosts() {
  const postPostCall = (data: FormData) =>
    api.post("/posts", data).then(res => res.data)

  const queryClient = useQueryClient();

  const postPost = useMutation(postPostCall, {
    onSuccess: () => {
      queryClient.invalidateQueries("getPost");
    },
  });

  const getPostsCall = () =>
    api.get("/posts").then(res => res.data);
  const getPosts = useQuery("getPost", getPostsCall);

  return { postPost, getPosts };
}
