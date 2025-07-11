"use client";

import { Video } from '@imagekit/next';
export default function Page() {
  return (
    <Video
      urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
      src="/video.mp4"
      controls
      width={500}
      height={500}
    />
  )
}