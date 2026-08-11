function BrewList({ brews, onEdit, onDelete }) {
  return (
    <div className="brew-list">
      {brews.length === 0 ? (
        <p className="empty-state">
          No brews yet. Click Add to create your first brew.
        </p>
      ) : (
        brews.map((brew, index) => (
          <article key={brew.id} className="brew-card">

            <div
              className={
                'brew-number brew-number-' + (index % 3)
              }
            >
              {index + 1}
            </div>

            <div className="brew-card-content">

              <h3>{brew.beans}</h3>

              <div className="brew-details">

                <span className="brew-pill">
                  {brew.method}
                </span>

                <span className="brew-pill">
                  {brew.coffeeGrams}g coffee
                </span>

                <span className="brew-pill">
                  {brew.waterGrams}g water
                </span>

                <span className="brew-pill">
                  ⭐ {brew.rating}/5
                </span>

              </div>

              {brew.tastingNotes && (
                <p className="brew-notes">
                  {brew.tastingNotes}
                </p>
              )}

            </div>

            <div className="brew-card-actions">

              <button
                type="button"
                className="edit-button"
                onClick={() => onEdit(brew)}
                aria-label={'Edit ' + brew.beans}
              >
                ✎
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={() => onDelete(brew.id)}
                aria-label={'Delete ' + brew.beans}
              >
                ×
              </button>

            </div>

          </article>
        ))
      )}
    </div>
  );
}

export default BrewList;
