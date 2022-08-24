import { createContext, useContext, useState } from "react";
import getPost from "./getPost";

interface PostContextInterface {
  posts: any,
  setPosts: any,
  fetch_posts : any
}
const PostContext = createContext<PostContextInterface>(
  {} as PostContextInterface
);
export const PostsProvider = ({ children }: { children: any }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const fetch_posts = async () => {
    const posts = await getPost(); 
    setPosts(posts);
  };
  const ModalContextData: PostContextInterface = {
    posts : posts, 
    setPosts : setPosts,
    fetch_posts: fetch_posts
  };
  return (
    <PostContext.Provider value={ModalContextData}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostContext);
};
