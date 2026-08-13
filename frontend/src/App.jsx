const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");

  const hasEmptyField = Object.values(formData).some(
    (value) => value === null || value === undefined || String(value).trim() === ""
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
      body: JSON.stringify({
        beans: formData.beans.trim(),
        method: formData.method,
        coffeeGrams: Number(formData.coffeeGrams),
        waterGrams: Number(formData.waterGrams),
        rating: Number(formData.rating),
        tastingNotes: formData.tastingNotes.trim(),
      }),
    });

    const text = await response.text();

    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {};
    }

    if (!response.ok) {
      console.error("Backend error:", data);
      setError(
        data.error || `Request failed with status ${response.status}`
      );
      return;
    }

    setFormData({ ...emptyForm });
    setEditingId(null);
    setShowForm(false);

    await fetchBrews();
  } catch (error) {
    console.error("Save error:", error);
    setError(
      "Could not connect to the Coffee Brew API. Please check the backend."
    );
  }
};
