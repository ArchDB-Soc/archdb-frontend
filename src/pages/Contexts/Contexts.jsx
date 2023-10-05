import { useEffect, useState } from 'react'
import ContextCard from '../../components/ContextCard/ContextCard'
import { getAllContextsFromDb } from '../../api/calls'

const Contexts = () => {

  const [contexts, setContexts] = useState([{}])

  useEffect(() => {
    getAllContextsFromDb(setContexts)
  }, [])

  return (
    <div className="contexts">
      {contexts?.map((context, index) =>
        <ContextCard key={index} context={context} />
      )}
    </div>
  )
}

export default Contexts