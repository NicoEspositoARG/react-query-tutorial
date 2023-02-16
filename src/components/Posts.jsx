/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { usePosts, useSearchPosts } from "../hooks/posts";
import { useDebounce } from "../hooks/useDebounce";

export default function Posts({ setPostId }) {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearch = useDebounce(searchKey, 500);
  const { data: searchResults, isLoading: searchLoading } =
    useSearchPosts(debouncedSearch);

  const queryClient = useQueryClient();
  const {
    data: posts,
    error,
    isLoading,
    isFetching,
    // isIdle,
    // refetch,
  } = usePosts();

  // if (isIdle) {
  //   return <button onClick={refetch}>Fetch Posts</button>;
  // }

  if (isLoading) {
    return (
      <div>
        <span className="spinner-border"></span> Loading Posts...
      </div>
    );
  }

  if (error) {
    return (
      <section className="alert alert-danger">
        Error fetching posts: {error.message}
      </section>
    );
  }
  const renderPosts = () => {
    let displayPosts = searchResults || posts;
    if (searchLoading) {
      return <span className="spinner-border"></span>;
    }
    return displayPosts.map((post) => (
      <li key={post.id}>
        <a
          className={
            queryClient.getQueryData(["posts", post.id]) && "link-success"
          }
          onClick={() => setPostId(post.id)}
          href="#"
        >
          {post.title}
        </a>
      </li>
    ));
  };

  return (
    <section>
      <h2>Posts: {isFetching && <span className="spinner-border"></span>}</h2>
      <label htmlFor="searchInput">
        <input
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          id="searchInput"
          className="form-control mb-2"
          placeholder={searchLoading ? "searching..." : "search for posts"}
        />
      </label>
      <button
        id="forceRefetch"
        className="form-inline-control m-2"
        onClick={() => {
          console.log("forcing..");
          queryClient.invalidateQueries(["searchPosts", searchKey]);
        }}
      >
        {" "}
        force refresh!
      </button>
      <ul>
        {renderPosts()}
        {/* {posts.map((post) => (
            <li key={post.id}>
              <a
                className={
                  queryClient.getQueryData(["posts", post.id]) && "link-success"
                }
                onClick={() => setPostId(post.id)}
                href="#"
              >
                {post.title}
              </a>
            </li>
          ))} */}
      </ul>
    </section>
  );
}
