import "./ContextCard.css"

const ContextCard = ({ context }) => {
  return (
    <div className="card">
      <h4>ID: {context._id}</h4>
      <p>{context.description}</p>
      <p>{context.eastings}</p>
      <p>{context.checkedBy}</p>
      <p>{context.notes}</p>
    </div>
  )
}

export default ContextCard