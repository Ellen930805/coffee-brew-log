import { useEffect, useState } from 'react';
import BrewForm from './components/BrewForm';
import BrewList from './components/BrewList';

const API_URL = 'https://coffee-brew-log-1-n2ka.onrender.com';

const emptyForm = {
  coffee: '',
  roast: '',
  method: '',
  ratio: '',
  notes: '',
  date: ''
};

function App() {
  const [brews, setBrews] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchBrews = async () => {
    const response = await fetch(`${API_URL}/api/brews`);
    const data = await response.json();
    setBrews(data);
  };

  useEffect(() => {
    fetchBrews();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const payload = { ...formData };

    const required = Object.values(payload).some(
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

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchBrews();
    } else {
      const data = await response.json();
      setError(data.error || 'Something went wrong');
    }
  };

  const handleEdit = (brew) => {
    setEditingId(brew.id);

    setFormData({
      coffee: brew.coffee,
      roast: brew.roast,
      method: brew.method,
      ratio: brew.ratio,
      notes: brew.notes,
      date: brew.date
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_URL}/api/brews/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      fetchBrews();
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
        <h1>Brew log</h1>

        <button className="add-button" onClick={handleAdd}>
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
