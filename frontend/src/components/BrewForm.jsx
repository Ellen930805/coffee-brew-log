function BrewForm({
  formData,
  setFormData,
  error,
  onSubmit,
  editingId,
  onCancel,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="beans" className="form-label">
          Beans
        </label>

        <input
          id="beans"
          name="beans"
          type="text"
          className="form-control"
          value={formData.beans}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="method" className="form-label">
          Method
        </label>

        <select
          id="method"
          name="method"
          className="form-select"
          value={formData.method}
          onChange={handleChange}
          required
        >
          <option value="">Select a method</option>
          <option value="Pour Over">Pour Over</option>
          <option value="French Press">French Press</option>
          <option value="Espresso">Espresso</option>
          <option value="Aeropress">Aeropress</option>
        </select>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="coffeeGrams" className="form-label">
            Coffee grams
          </label>

          <input
            id="coffeeGrams"
            name="coffeeGrams"
            type="number"
            min="1"
            className="form-control"
            value={formData.coffeeGrams}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="waterGrams" className="form-label">
            Water grams
          </label>

          <input
            id="waterGrams"
            name="waterGrams"
            type="number"
            min="1"
            className="form-control"
            value={formData.waterGrams}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>

        <select
          id="rating"
          name="rating"
          className="form-select"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value="">Select a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="tastingNotes" className="form-label">
          Tasting notes
        </label>

        <textarea
          id="tastingNotes"
          name="tastingNotes"
          className="form-control"
          rows="4"
          value={formData.tastingNotes}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Brew" : "Save Brew"}
        </button>

        {editingId && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BrewForm;

      
