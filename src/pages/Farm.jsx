import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout.jsx";
import Alert from "../components/Alert.jsx";
import Loader from "../components/Loader.jsx";
import AnimalList from "../components/AnimalList.jsx";
import AnimalForm from "../components/AnimalForm.jsx";
import { getAnimals, createAnimal } from "../services/animalsApi.js";

// Filtros disponibles
const TYPES = ["all", "cow", "chicken", "sheep", "pig", "other"];
const STATUSES = ["all", "healthy", "review", "sick"];

export default function Farm() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Filtros UI
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");

  // ⭐ Nuevo estado para ACTIVIDAD 2
  const [minAge, setMinAge] = useState(0);

  // Error de envío desde el formulario (red / servidor)
  const [submitError, setSubmitError] = useState(null);

  // Carga inicial con useEffect
  useEffect(() => {
    let cancelled = false;
    async function fetchAnimals() {
      try {
        setLoading(true);
        setLoadError(null);
        const data = await getAnimals();
        if (!cancelled) setAnimals(data);
      } catch (err) {
        if (!cancelled) setLoadError("Failed to load animals. Please retry.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAnimals();
    return () => {
      cancelled = true;
    };
  }, []);

  // Crear animal (llamado por AnimalForm)
  async function handleCreate(animal) {
    try {
      setSubmitError(null);
      const created = await createAnimal(animal);
      setAnimals((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setSubmitError("Could not create the animal. Try again.");
      throw err;
    }
  }

  // ⭐ Lógica de filtrado con el nuevo filtro de edad
  const filteredAnimals = useMemo(() => {
    const q = query.trim().toLowerCase();

    return animals.filter((a) => {
      const byType = typeFilter === "all" || a.type === typeFilter;
      const byStatus = statusFilter === "all" || a.status === statusFilter;
      const byQuery =
        q.length === 0 ||
        a.name?.toLowerCase().includes(q) ||
        a.type?.toLowerCase().includes(q) ||
        String(a.weight).includes(q) ||
        String(a.age).includes(q);

      // ⭐ Nuevo filtro: edad mínima
      const byMinAge = a.age >= Number(minAge);

      return byType && byStatus && byQuery && byMinAge;
    });
  }, [animals, typeFilter, statusFilter, query, minAge]);

  return (
    <Layout title="My Reactive Farm 🐄🌾">
      {loading && <Loader message="Fetching animals from the farm…" />}
      {loadError && <Alert variant="error">{loadError}</Alert>}

      {!loading && !loadError && (
        <div className="space-y-8">
          <section aria-labelledby="create-animal">
            <h2 id="create-animal" className="mb-3 text-xl font-semibold">
              Add new animal
            </h2>
            <AnimalForm onSubmit={handleCreate} submitError={submitError} />
          </section>

          <section aria-labelledby="animals-list">
            <h2 id="animals-list" className="sr-only">
              Animals
            </h2>

            <AnimalList animals={filteredAnimals}>
              <div className="flex flex-wrap items-center gap-3">

                {/* Search */}
                <input
                  id="search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, type, age, weight…"
                  className="w-64 rounded-md border px-3 py-2 text-sm"
                />

                {/* Type filter */}
                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-md border px-3 py-2 text-sm"
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                {/* Status filter */}
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border px-3 py-2 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                {/*  NUEVO - Filtro por edad mínima */}
                <input
                  type="number"
                  min="0"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  placeholder="Min age"
                  className="w-32 rounded-md border px-3 py-2 text-sm"
                />
              </div>
            </AnimalList>
          </section>
        </div>
      )}
    </Layout>
  );
}
