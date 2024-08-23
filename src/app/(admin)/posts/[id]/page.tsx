import React from "react";

export default function PostPage({ params }: { params: { id: number } }) {
  const id = params.id;
  return <div>Post ID No: {id}</div>;
}
