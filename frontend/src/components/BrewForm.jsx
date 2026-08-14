function BrewCard({ brew, onEdit, onDelete }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{brew.beans}</h5>

        <p className="card-text mb-1">
          <strong>Method:</strong> {brew.method}
        </p>

        <p className="card-text mb-1">
          <strong>Coffee:</strong> {brew.coffeeGrams}g
        </p>

        <p className="card-text mb-1">
          <strong>Water:</strong> {brew.waterGrams}g
        </p>

        <p className="card-text mb-1">
          <strong>Rating:</strong> {brew.rating}/5
        </p>

        <p className="card-text mb-3">
          <strong>Tasting Notes:</strong> {brew.tastingNotes}</p>

        <button
          type="button"
          className="btn btn-primary btn-sm me-2"
          onClick={() => onEdit(brew)}
        >
          Edit
        </button>

        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(brew.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BrewCard;
