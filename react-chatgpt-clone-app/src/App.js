import {useState, useEffect} from 'react';

const App = () =>  {
 const [value,setValue] = useState(null);
 const [message,setMessage] = useState(null);
 const [previousChats, setPreviousChats] = useState([]);
 const [currentTitle, setCurrentTitle] = useState(null);


 const createNewChat = () => {
  setMessage(null)
  setValue("")
  setCurrentTitle(null)
 }



  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
     const response = await fetch ('https://localhost:8000/completions', options)
     const data =  await response.json()
     console.log(data)
     setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)

    }
  }

  useEffect(() => {
    console.log(currentTitle,value, message)
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if(currentTitle && value && message) {
      setPreviousChats(previousChats => (
        [...previousChats, {
          title:currentTitle,
          role:"user",
          content: value
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content
        }
      ]
      ))
    }

  }, [ message, currentTitle])

  console.log(previousChats)

 const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle);
  const uniqueTitles = Array.from (new Set(previousChats.map(previousChat => previousChat.title)));
  console.log(uniqueTitles)

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}> + New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index}>{uniqueTitle}</li>)  }
        </ul>
        <nav>
          <p >Made by Makoma</p>
        </nav>
      </section>
      <section className="main-section">
        {!currentTitle && <h1>AscendGPT</h1>}
        <ul className="feed">
          {currentChat.map((chatMessage, index) => <li key={index}>
             <p className="role">{chatMessage.role}</p>
             <p>{chatMessage.message}</p>
          </li>
         )}

        </ul>
        <div className="bottom-section ">
         <div className="input-container">
           <input value={value} onChange={(e)=> setValue(e.target.value)}/>
           <div id="submit" onClick={getMessages}>➢</div>
         </div>
         <p className="info">
            ChatGPT is a large language model based on the GPT-3.5 architecture, developed by OpenAI. It is designed to provide human-like responses to natural language input and is trained on a massive corpus of text data.  </p>
        </div>
      </section>

    </div>
  );
}

export default App;
