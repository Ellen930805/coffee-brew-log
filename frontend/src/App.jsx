```jsx
import { useEffect, useState } from 'react';
import BrewForm from './components/BrewForm';
import BrewList from './components/BrewList';

const API_URL = 'https://coffee-brew-log-5.onrender.com';

const emptyForm = {
  beans: '',
  method: '',
  coffeeGrams: '',
  waterGrams: '',
  rating: '',
  tastingNotes: ''
};

function App() {
  const [brews, setBrews] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchBrews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/brews`);

      if (!response.ok) {
        throw new Error('Failed to fetch brews');
      }

      const data = await response.json();
      setBrews(data);
    } catch (error) {
      console.error(error);
      setError('Unable to load brews. Please try again.');
    }
  };

  useEffect(() => {
    fetchBrews();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const required = Object.values(formData).some(
      (value) => String(value).trim() === ''
    );

    if (required) {
      setError('Please fill in every field.');
      return;
    }

    const url = editingId
      ? `${API_URL}/api/brews/${editingId}`
      : `${API_URL}/api/brews`;

    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await fetchBrews();
    } catch (error) {
      console.error(error);
      setError('Unable to save brew. Please try again.');
    }
  };

  const handleEdit = (brew) => {
    setEditingId(brew.id);

    setFormData({
      beans: brew.beans || '',
      method: brew.method || '',
      coffeeGrams: brew.coffeeGrams || '',
      waterGrams: brew.waterGrams || '',
      rating: brew.rating || '',
      tastingNotes: brew.tastingNotes || ''
    });

    setError('');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/brews/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to delete brew.');
        return;
      }

      await fetchBrews();
    } catch (error) {
      console.error(error);
      setError('Unable to delete brew. Please try again.');
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError('');
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError('');
    setShowForm(false);
  };

  const visibleBrews =
    filter === 'All'
      ? brews
      : brews.filter((brew) => brew.method === filter);

  return (
    <div className="app-shell">
      <header className="page-header">
        <h1>Brews: {brews.length}</h1>

        <button
          type="button"
          className="add-button"
          onClick={handleAdd}
        >
          Add
        </button>
      </header>

      <div className="filter-container">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="All">Filter by method</option>
          <option value="Espresso">Espresso</option>
          <option value="Pour Over">Pour Over</option>
          <option value="French Press">French Press</option>
          <option value="Aeropress">Aeropress</option>
        </select>
      </div>

      {showForm && (
        <section className="form-panel">
          <div className="form-header">
            <h2>{editingId ? 'Edit brew' : 'Add brew'}</h2>

            <button
              type="button"
              className="close-button"
              onClick={handleCancel}
            >
              ×
            </button>
          </div>

          <BrewForm
            formData={formData}
            setFormData={setFormData}
            error={error}
            onSubmit={handleSubmit}
            editingId={editingId}
            onCancel={handleCancel}
          />
        </section>
      )}

      <main className="brew-log-container">
        <BrewList
          brews={visibleBrews}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
```
