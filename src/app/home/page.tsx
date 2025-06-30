"use client";
import ProtectedRoute from "@/components/protectedRoute";
import PostDetail from "@/components/ui/media/uiTest";
import { useAuthStore } from "@/store/authstore";
import React from "react";

export default function Home() {
  const state = useAuthStore();
  const media = [
    {
      created_at: "2025-06-15T17:15:58.383368",
      id: 9,
      media_type: "image",
      media_url:
        "https://sportlazestr.blob.core.windows.net/post-media/bcb701f3-1928-4d7d-800c-806e3e28dbe8.png",
      order_index: 0,
      post_id: 15,
    },
    {
      created_at: "2025-06-15T17:15:58.383372",
      id: 10,
      media_type: "image",
      media_url:
        "https://sportlazestr.blob.core.windows.net/post-media/cae570d9-4240-4239-b1ce-ae6ab61e104f.jpg",
      order_index: 1,
      post_id: 15,
    },
    {
      created_at: "2025-06-15T17:15:58.383373",
      id: 11,
      media_type: "video",
      media_url:
        "https://sportlazestr.blob.core.windows.net/post-media/fb5857e1-82e0-4660-bc6a-3025ea657dfa.mp4",
      order_index: 2,
      post_id: 15,
    },
    {
      created_at: "2025-06-15T17:15:58.383373",
      id: 12,
      media_type: "image",
      media_url:
        "https://sportlazestr.blob.core.windows.net/post-media/82580992-81c9-4213-9f91-2c1c45c02b7a.jpg",
      order_index: 3,
      post_id: 16,
    },
    {
      created_at: "2025-06-15T17:15:58.383373",
      id: 14,
      media_type: "image",
      media_url:
        "https://sportlazestr.blob.core.windows.net/post-media/82580992-81c9-4213-9f91-2c1c45c02b7a.jpg",
      order_index: 4,
      post_id: 14,
    },
    {
      created_at: "2025-06-15T17:15:58.383373",
      id: 15,
      media_type: "image",
      media_url:
        "https://sportlazestr.blob.core.windows.net/post-media/82580992-81c9-4213-9f91-2c1c45c02b7a.jpg",
      order_index: 3,
      post_id: 16,
    },
    {
      created_at: "2025-06-15T17:15:58.383373",
      id: 16,
      media_type: "image",
      media_url:
        "https://sportlazestr.blob.core.windows.net/post-media/82580992-81c9-4213-9f91-2c1c45c02b7a.jpg",
      order_index: 4,
      post_id: 14,
    },
  ];
  return (
    <ProtectedRoute>
      <div className="bg-pink-300">Welcome to the Home Page</div>
      <div className="bg-pink-300">{state.user?.username}</div>
      <div className="bg-pink-300">{state.token}</div>
      <PostDetail mediaItems={media} />
    </ProtectedRoute>
  );
}
