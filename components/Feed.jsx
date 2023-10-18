"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const searchPosts = posts.filter(
      (post) =>
        post.creator.username.includes(e.target.value) ||
        post.prompt.includes(e.target.value) ||
        post.tag.includes(e.target.value)
    );
    setSearchPosts(searchPosts);
  };

  const handleTagClick = (tag) => {
    const search = {
      target: {
        value: tag,
      },
    };
    handleSearchChange(search);
  };

  useEffect(() => {
    const handleEnterSearch = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        return false;
      }
    };
    window.addEventListener("keypress", handleEnterSearch);

    const fetchPosts = async () => {
      await fetch("/api/prompt")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });
    };
    fetchPosts();

    return () => {
      window.removeEventListener("keypress", handleEnterSearch);
    };
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or an username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      <PromptCardList
        data={
          searchPosts.length !== 0 || (searchPosts.length === 0 && searchText)
            ? searchPosts
            : posts
        }
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
