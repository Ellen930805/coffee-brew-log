import { useEffect, useState } from 'react';
import BrewForm from './components/BrewForm';
import BrewList from './components/BrewList';

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

  const fetchBrews = async () => {
    const response = await fetch('/api/brews');
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
    const required = Object.values(payload).some((value) => String(value).trim() === '');
    if (required) {
      setError('Please fill in every field.');
      return;
    }

    const url = editingId ? `/api/brews/${editingId}` : '/api/brews';
    const method = editingId ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setFormData(emptyForm);
      setEditingId(null);
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
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/brews/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchBrews();
    }
  };

  const visibleBrews = filter === 'All'
    ? brews
    : brews.filter((brew) => brew.method === filter);

  return (
    <div className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Coffee Brew Log</p>
          <h1>Brews: {brews.length}</h1>
        </div>
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="All">All methods</option>
          <option value="Espresso">Espresso</option>
          <option value="Pour Over">Pour Over</option>
          <option value="French Press">French Press</option>
          <option value="Aeropress">Aeropress</option>
        </select>
      </header>

      <main className="content-grid">
        <section className="panel">
          <h2>{editingId ? 'Edit brew entry' : 'New brew entry'}</h2>
          <BrewForm
            formData={formData}
            setFormData={setFormData}
            error={error}
            onSubmit={handleSubmit}
            editingId={editingId}
            onCancel={() => {
              setEditingId(null);
              setFormData(emptyForm);
            }}
          />
        </section>

        <section className="panel">
          <BrewList brews={visibleBrews} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}

export default App;
