import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNewPost, getPostById, getPosts, searchPosts } from "../api/posts";

const key = "posts";

export function useMutatePost() {
  const queryClient = useQueryClient();

  return useMutation(createNewPost, {
    onSuccess: (post) => {
      queryClient.setQueryData([key], (prevPosts) => prevPosts.concat(post));
      queryClient.invalidateQueries([key]);
    },
  });
}

export function usePosts() {
  return useQuery([key], getPosts, {
    // refetchOnWindowFocus: false,
    // refetchInterval: 2000, //polling
    staleTime: 60000 * 2, // infinity to never stale
    // cacheTime: 3000
  });
}

export function useSearchPosts(filter) {
  return useQuery(
    ['searchPosts', filter],
    () => searchPosts(filter),
    {
      enabled: Boolean(filter),
      retry: false,
      staleTime: Infinity
    }
  )
}

export function usePost(postId) {
  return useQuery([key, postId], () => getPostById(postId));
}
