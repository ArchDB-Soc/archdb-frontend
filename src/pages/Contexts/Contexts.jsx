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
      <div>
        <h3>Welcome to the Integrated Archeological Database!</h3>
        <p>This project keeps records of different archeological digs.</p>
        <p>Here is a list of all the archeological contexts (records) that have been uploaded to the IADB so far.</p>
      </div>
      {contexts?.map((context, index) =>
        <ContextCard key={index} context={context} />
      )}
    </div>
  )
}

export default Contexts