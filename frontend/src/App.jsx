import { useEffect, useState } from "react";
import BrewForm from "./components/BrewForm";
import BrewList from "./components/BrewList";

const API_URL = "https://coffee-brew-log-backend-ygmu.onrender.com";

const emptyForm = {
  beans: "",
  method: "",
  coffeeGrams: "",
  waterGrams: "",
  rating: "",
  tastingNotes: "",
};

function App() {
  const [brews, setBrews] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const fetchBrews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/brews`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch brews.");
      }

      setBrews(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load brews.");
    }
  };

  useEffect(() => {
    fetchBrews();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const hasEmptyField = Object.values(formData).some(
      (value) => String(value).trim() === ""
    );

    if (hasEmptyField) {
      setError("Please fill in every field.");
      return;
    }

    const url = editingId
      ? `${API_URL}/api/brews/${editingId}`
      : `${API_URL}/api/brews`;

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData(emptyForm);
        setEditingId(null);
        await fetchBrews();
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }
  };

  const handleEdit = (brew) => {
    setEditingId(brew.id);

    setFormData({
      beans: brew.beans,
      method: brew.method,
      coffeeGrams: brew.coffeeGrams,
      waterGrams: brew.waterGrams,
      rating: brew.rating,
      tastingNotes: brew.tastingNotes,
    });

    setError("");
  };

  const handleDelete = async (id) => {
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/brews/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchBrews();
      } else {
        let data = {};

        try {
          data = await response.json();
        } catch {
          // Server may return an empty response.
        }

        setError(data.error || "Failed to delete brew.");
      }
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }
  };

  const visibleBrews =
    filter === "All"
      ? brews
      : brews.filter((brew) => brew.method === filter);

  return (
    <div className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Coffee Brew Log</p>
          <h1>Brews: {brews.length}</h1>
        </div>

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="All">All methods</option>
          <option value="Espresso">Espresso</option>
          <option value="Pour Over">Pour Over</option>
          <option value="French Press">French Press</option>
          <option value="Aeropress">Aeropress</option>
        </select>
      </header>

      <main className="content-grid">
        <section className="panel">
          <h2>{editingId ? "Edit brew entry" : "New brew entry"}</h2>

          <BrewForm
            formData={formData}
            setFormData={setFormData}
            error={error}
            onSubmit={handleSubmit}
            editingId={editingId}
            onCancel={() => {
              setEditingId(null);
              setFormData(emptyForm);
              setError("");
            }}
          />
        </section>

        <section className="panel">
          <BrewList
            brews={visibleBrews}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
