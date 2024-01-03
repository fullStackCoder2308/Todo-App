import React, { useState } from "react";

const Signup = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const addClick = async() => {
    const res = await fetch("http://localhost:3000/user/signup",{
        method:"POST",
        body:JSON.stringify({
            username: user,
            password: pass
        }),
        headers:{
            "Content-type":"application/json"
        }

    })

    if(!res.ok){
       throw new Error("can't sign up");
    }
    else{
      console.log("you have signed up successfully");
    }

  };
  return (
    <>
      <input
        type="text"
        value={user}
        placeholder="Name"
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="text"
        value={pass}
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={addClick}>Signup</button>
    </>
  );
};

export default Signup;
