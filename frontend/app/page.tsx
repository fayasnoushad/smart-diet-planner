"use client";
import { useState } from "react";
import Form from "./components/Form";
import Weeks from "./components/Week";

export default function Home() {
  const [data, setData] = useState({});
  return (
    <main className="flex flex-col justify-center items-center h-full mx-5">
      {Object.keys(data).length !== 0 ? (
        <Weeks data={data} />
      ) : (
        <Form setData={setData} />
      )}
    </main>
  );
}
