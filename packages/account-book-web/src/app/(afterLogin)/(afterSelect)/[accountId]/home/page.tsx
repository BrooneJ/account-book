"use client";
import { accountStore } from "@/app/store/accountStore";

export default async function Page() {
  const id = accountStore((state) => state.id);

  return (
    <div>
      Home
      <button onClick={() => console.log("current id:", id)}>set id</button>
    </div>
  );
}
