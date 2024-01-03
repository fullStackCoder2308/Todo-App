import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
export let authToken ="";
const Signin = () => {
  
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const addClick = async() => {
      const res = await fetch("http://localhost:3000/user/signin",{
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
         throw new Error("can't sign in");
      }
      else{
        // console.log(res.token);
        const data = await res.json();
        const btoken = data.token;
        authToken = btoken;
        navigate('/todos');
        
      }
  
    };
    // console.log(authToken);
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
        <button onClick={addClick}>Signin</button>
      </>
    );
}

export default Signin
