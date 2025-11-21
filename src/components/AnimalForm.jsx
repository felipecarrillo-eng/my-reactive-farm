import { useState } from "react";

export default function AnimalForm({ onSubmit, submitError }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    age: "",
    weight: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.type) newErrors.type = "Type is required";
    if (!form.age) newErrors.age = "Age is required";
    if (!form.weight) newErrors.weight = "Weight is required";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      await onSubmit(form);

      // ⭐ Mejora 2: limpiar el formulario después de enviar
      setForm({
        name: "",
        type: "",
        age: "",
        weight: "",
      });

      setErrors({});
    } catch {}
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Animal name"
        className={`w-full border px-3 py-2 rounded-md ${
          errors.name ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        name="type"
        value={form.type}
        onChange={handleChange}
        placeholder="Type (cow, pig, etc.)"
        className={`w-full border px-3 py-2 rounded-md ${
          errors.type ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

      <input
        name="age"
        type="number"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
        className={`w-full border px-3 py-2 rounded-md ${
          errors.age ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

      <input
        name="weight"
        type="number"
        value={form.weight}
        onChange={handleChange}
        placeholder="Weight"
        className={`w-full border px-3 py-2 rounded-md ${
          errors.weight ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}

      {submitError && <p className="text-red-500">{submitError}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Add Animal
      </button>
    </form>
  );
}
