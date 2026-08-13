const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");

  // Check that every field has a value
  const hasEmptyField = Object.values(formData).some(
    (value) =>
      value === null ||
      value === undefined ||
      String(value).trim() === ""
  );

  if (hasEmptyField) {
    setError("Please fill in every field.");
    return;
  }

  const url = editingId
    ? `${API_URL}/api/brews/${editingId}`
    : `${API_URL}/api/brews`;

  const method = editingId ? "PUT" : "POST";

  const brewData = {
    beans: formData.beans.trim(),
    method: formData.method,
    coffeeGrams: Number(formData.coffeeGrams),
    waterGrams: Number(formData.waterGrams),
    rating: Number(formData.rating),
    tastingNotes: formData.tastingNotes.trim(),
  };

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brewData),
    });

    const responseText = await response.text();

    let data = {};

    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch {
        data = {};
      }
    }

    if (!response.ok) {
      console.error("API error:", {
        status: response.status,
        response: data,
      });

      setError(
        data.error ||
          `Unable to ${editingId ? "update" : "create"} brew.`
      );

      return;
    }

    // Success
    setFormData({ ...emptyForm });
    setEditingId(null);
    setShowForm(false);
    setError("");

    await fetchBrews();
  } catch (error) {
    console.error("Connection error:", error);

    setError(
      "Unable to connect to the Coffee Brew API. Please try again."
    );
  }
};
