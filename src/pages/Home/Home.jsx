import { useState } from 'react'
import ContextCard from '../../components/ContextCard/ContextCard'

const Home = () => {

  const [contexts, setContexts] = useState([{}])

  const handleClick = async () => {
    const BACKEND_URL = "http://localhost:4001/api/contexts/"
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
      <p>Click below to get all contexts.</p>
      <button onClick={handleClick}>Get Contexts</button>
      <h3>Contexts:</h3>
      {contexts?.map((context, index) => <ContextCard key={index} context={context} />)}
    </div>
  )
}

export default Home