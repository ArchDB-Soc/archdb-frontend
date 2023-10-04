import "./ContextCard.css"

const ContextCard = ({ context }) => {
  return (
    <div className="card">
      <h4>ID: {context._id}</h4>
      <p>{context.description}</p>
    </div>
  )
}

export default ContextCard