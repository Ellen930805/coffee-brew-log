import { useState } from "react";

const initialFormData = {
  beans: "",
  method: "",
  coffee_grams: "",
  water_grams: "",
  rating: "",
  tasting_notes: "",
};

function BrewForm({
  initialValues = initialFormData,
  onSubmit,
  onCancel,
  onDelete,
  isSaving = false,
  isDeleting = false,
  serverError = "",
  submitLabel = "Save",
}) {
  const [formData, setFormData] = useState(initialValues);
  const [validationError, setValidationError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setValidationError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasBlankField = Object.values(formData).some(
      (value) =>
        value === null ||
        value === undefined ||
        String(value).trim() === ""
    );

    if (hasBlankField) {
      setValidationError("Please complete every field.");
      return;
    }

    setValidationError("");

    await onSubmit({
      ...formData,
      coffee_grams: Number(formData.coffee_grams),
      water_grams: Number(formData.water_grams),
      rating: Number(formData.rating),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {validationError && (
        <div className="alert alert-warning" role="alert">
          {validationError}
        </div>
      )}

      {serverError && (
        <div className="alert alert-danger" role="alert">
          {serverError}
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
          <label htmlFor="coffee_grams" className="form-label">
            Coffee grams
          </label>

          <input
            id="coffee_grams"
            name="coffee_grams"
            type="number"
            min="1"
            className="form-control"
            value={formData.coffee_grams}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="water_grams" className="form-label">
            Water grams
          </label>

          <input
            id="water_grams"
            name="water_grams"
            type="number"
            min="1"
            className="form-control"
            value={formData.water_grams}
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
        <label htmlFor="tasting_notes" className="form-label">
          Tasting notes
        </label>

        <textarea
          id="tasting_notes"
          name="tasting_notes"
          className="form-control"
          rows="4"
          value={formData.tasting_notes}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSaving || isDeleting}
          >
            {isSaving ? "Saving..." : submitLabel}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
            disabled={isSaving || isDeleting}
          >
            Cancel
          </button>
        </div>

        {onDelete && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={onDelete}
            disabled={isSaving || isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}

export default BrewForm;
