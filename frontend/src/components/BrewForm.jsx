```jsx
function BrewForm({
  formData,
  setFormData,
  error,
  onSubmit,
  editingId,
  onCancel
}) {
  const updateField = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value
    }));
  };

  return (
    <form className="brew-form" onSubmit={onSubmit}>
      <label>
        Beans
        <input
          type="text"
          value={formData.beans}
          onChange={updateField('beans')}
          required
        />
      </label>

      <label>
        Brew method
        <select
          value={formData.method}
          onChange={updateField('method')}
          required
        >
          <option value="">Select method</option>
          <option value="Espresso">Espresso</option>
          <option value="Pour Over">Pour Over</option>
          <option value="French Press">French Press</option>
          <option value="Aeropress">Aeropress</option>
        </select>
      </label>

      <label>
        Coffee grams
        <input
          type="number"
          min="1"
          value={formData.coffeeGrams}
          onChange={updateField('coffeeGrams')}
          required
        />
      </label>

      <label>
        Water grams
        <input
          type="number"
          min="1"
          value={formData.waterGrams}
          onChange={updateField('waterGrams')}
          required
        />
      </label>

      <label>
        Rating
        <input
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={updateField('rating')}
          required
        />
      </label>

      <label>
        Tasting notes
        <textarea
          value={formData.tastingNotes}
          onChange={updateField('tastingNotes')}
          required
        />
      </label>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="form-actions">
        <button type="submit">
          {editingId ? 'Update brew' : 'Save brew'}
        </button>

        {editingId ? (
          <button
            type="button"
            className="secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default BrewForm;
```
