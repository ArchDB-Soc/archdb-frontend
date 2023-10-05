import { useEffect, useState } from 'react'
import ContextCard from '../../components/ContextCard/ContextCard'
import { getAllContexts } from '../../api/calls'

const Contexts = () => {

  const [contexts, setContexts] = useState([{}])

  useEffect(() => {
    getAllContexts(setContexts)
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