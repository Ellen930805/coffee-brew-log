import BrewCard from "./BrewCard";

function BrewList({ brews, onEdit }) {
  if (brews.length === 0) {
    return <p className="text-muted">No brews found.</p>;
  }

  return (
    <div>
      {brews.map((brew) => (
        <BrewCard
          key={brew.id}
          brew={brew}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default BrewList;
