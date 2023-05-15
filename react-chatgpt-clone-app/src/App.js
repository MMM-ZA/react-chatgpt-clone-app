

const App = () =>  {

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "hello how are you? "
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
     const response = await fetch ('https://localhost:8000/completions', options)
     const data =  await response.json()
     console.log(data)
    } catch (error) {
      console.error(error)

    }
  }
  return (
    <div className="app">
      <section className="side-bar">
        <button> + New Chat</button>
        <ul className="history">
           <li>facts</li>
        </ul>
        <nav>
          <p>Made by Makoma</p>
        </nav>
      </section>
      <section className="main-section">
        <h1>AscendGPT</h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section ">
         <div className="input-container">
           <input/>
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
