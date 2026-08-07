function BrewList({ brews, onEdit, onDelete }) {
  return (
    <div className="brew-list">
      <h2>Brew log</h2>
      {brews.length === 0 ? (
        <p className="empty-state">No brews yet. Add your first one.</p>
      ) : (
        brews.map((brew) => (
          <article key={brew.id} className="brew-card">
            <div className="brew-card__content">
              <p className="brew-card__meta">{brew.date}</p>
              <h3>{brew.coffee}</h3>
              <p>{brew.roast} • {brew.method}</p>
              <p>Ratio: {brew.ratio}</p>
              <p>{brew.notes}</p>
            </div>
            <div className="brew-card__actions">
              <button type="button" onClick={() => onEdit(brew)}>Edit</button>
              <button type="button" className="secondary" onClick={() => onDelete(brew.id)}>Delete</button>
            </div>
          </article>
        ))
      )}
    </div>
  );
}

export default BrewList;
