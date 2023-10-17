"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = () => {};
  const handleDelete = async () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      await fetch(`/api/user/${session?.user.id}/posts`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });
    };
    if (session?.user.id) fetchPosts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
