"use client";
import { useState } from "react";
import Form from "./components/Form";
import Weeks from "./components/Week";

export default function Home() {
  const [data, setData] = useState({});
  return (
    <main
      className="flex flex-col justify-center items-center h-full relative"
      style={{
        minHeight: "80vh",
        width: "100%",
      }}
    >
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3, // Adjust opacity here
        }}
      />
      {/* Content above background */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {Object.keys(data).length !== 0 ? (
          <Weeks data={data} />
        ) : (
          <Form setData={setData} />
        )}
      </div>
    </main>
  );
}
