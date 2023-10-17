"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const profileParams = useSearchParams();
  const userId = profileParams.get("id");
  const username = profileParams.get("name");

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete the prompt permamently?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await fetch(`/api/user/${userId ? userId : session?.user.id}/posts`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });
    };
    if (session?.user.id) fetchPosts();
  }, [userId]);

  return (
    <Profile
      name={username ? username : "My"}
      desc={`Welcome to ${username ? username : "your"} personalized profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
