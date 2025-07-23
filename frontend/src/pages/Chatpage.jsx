import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Chatpage() {
  const [getmessage, setGetmessage] = useState([])
  const [text, setText] = useState("")
  const token = localStorage.getItem("token")

  async function fetchmessage() {
    const res = await axios.get('http://localhost:5000/api/messages/getmessage', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setGetmessage(res.data)
  }
  fetchmessage()


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const send = await axios.post('http://localhost:5000/api/messages/sender',
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setText("")
      fetchmessage()
    } catch (error) {
      alert("Failed to send message");
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat Page</h2>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", marginBottom: "20px", padding: "10px" }}>

        {getmessage.map((msg) => (
          <div key={msg._id} style={{ marginBottom: "10px" }}>
            <strong>sender:({msg.sender.username})</strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message..." required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatpage;


