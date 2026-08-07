function BrewForm({ formData, setFormData, error, onSubmit, editingId, onCancel }) {
  const updateField = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  return (
    <form className="brew-form" onSubmit={onSubmit}>
      <label>
        Coffee
        <input value={formData.coffee} onChange={updateField('coffee')} />
      </label>
      <label>
        Roast
        <input value={formData.roast} onChange={updateField('roast')} />
      </label>
      <label>
        Brew method
        <select value={formData.method} onChange={updateField('method')}>
          <option value="">Select method</option>
          <option value="Espresso">Espresso</option>
          <option value="Pour Over">Pour Over</option>
          <option value="French Press">French Press</option>
          <option value="Aeropress">Aeropress</option>
        </select>
      </label>
      <label>
        Ratio
        <input value={formData.ratio} onChange={updateField('ratio')} />
      </label>
      <label>
        Date
        <input type="date" value={formData.date} onChange={updateField('date')} />
      </label>
      <label>
        Notes
        <textarea value={formData.notes} onChange={updateField('notes')} />
      </label>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="form-actions">
        <button type="submit">{editingId ? 'Update brew' : 'Save brew'}</button>
        {editingId ? <button type="button" className="secondary" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  );
}

export default BrewForm;
