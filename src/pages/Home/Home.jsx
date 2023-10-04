import { useState } from 'react'
import ContextCard from '../../components/ContextCard/ContextCard'

const Home = () => {

  const [contexts, setContexts] = useState([{}])

  const handleClick = async () => {
    const BACKEND_URL = "https://iadb-backend.onrender.com/api/contexts"
    try {
      const data = await fetch(BACKEND_URL, {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`
        }
      })
      const dataToJson = await data.json()
      // const updatedContexts = [...contexts, dataToJson.data[0]]
      console.log("The API has been called")
      setContexts(dataToJson.data)


    } catch (error) {
      console.log("error:", error)
    }
  }


  return (
    <div className="home">
      <p>Click below.</p>
      <button onClick={handleClick}>Get Contexts</button>
      {contexts?.map((context, index) => <ContextCard key={index} context={context} />)}
    </div>
  )
}

export default Home