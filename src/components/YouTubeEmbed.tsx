"use client";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function YouTubeEmbed(props: YouTubeProps) {
  return <YouTube {...props} />;
}
