"use client"; //It is called whenever we use hooks or reacts
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.log(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <div>
        {/* signIn directly by google */}
        <button onClick={() => signIn("google")}>Sign in with Google</button>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}

export default loginPage;
