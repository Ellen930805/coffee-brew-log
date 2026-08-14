import BrewCard from "./BrewCard";

function BrewList({ brews, onEdit, onDelete }) {
  if (brews.length === 0) {
    return <p className="text-muted">No brews found.</p>;
  }

  return (
    <div className="brew-list">
      {brews.map((brew) => (
        <BrewCard
          key={brew.id}
          brew={brew}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BrewList;
