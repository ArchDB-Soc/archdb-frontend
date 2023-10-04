import { useState } from 'react'
import ContextCard from '../../components/ContextCard/ContextCard'
import { getAllContexts } from '../../api/calls'

const Home = () => {

  const [contexts, setContexts] = useState([{}])

  // const handleClick = () => {
  //   getAllContexts(setContexts)
  // }


  return (
    <div className="home">
      <p>Click below.</p>
      <button onClick={() => (getAllContexts(setContexts))}>Get Contexts</button>
      {contexts?.map((context, index) => <ContextCard key={index} context={context} />)}
    </div>
  )
}

export default Home