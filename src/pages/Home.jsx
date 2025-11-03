import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { EntityCard } from "../components/EntityCard";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const fetchDetails = async (resourceType, results) => {
    const detailPromises = results.map(async (item) => {
      const detailRes = await fetch(
        `https://www.swapi.tech/api/${resourceType}/${item.uid}`
      );
      if (detailRes.ok) {
        const detailData = await detailRes.json();
        return { ...item, ...detailData.result.properties };
      }
      return item;
    });
    return Promise.all(detailPromises);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "set_loading", payload: true });

        const [peopleRes, planetsRes, vehiclesRes] = await Promise.all([
          fetch("https://www.swapi.tech/api/people?page=1&limit=10"),
          fetch("https://www.swapi.tech/api/planets?page=1&limit=10"),
          fetch("https://www.swapi.tech/api/vehicles?page=1&limit=10"),
        ]);

        const peopleData = await peopleRes.json();
        const planetsData = await planetsRes.json();
        const vehiclesData = await vehiclesRes.json();

        const detailedPeople = await fetchDetails("people", peopleData.results);

        dispatch({ type: "set_people", payload: detailedPeople });
        dispatch({ type: "set_planets", payload: planetsData.results });
        dispatch({ type: "set_vehicles", payload: vehiclesData.results });
        dispatch({ type: "set_loading", payload: false });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "set_loading", payload: false });
      }
    };

    fetchData();
  }, []);

  if (store.loading) {
    return (
      <div className="loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container px-5">
      <section className="mb-5">
        <h2 className="section-title">Characters</h2>
        <div className="horizontal-scroll-container">
          {store.people.map((person) => (
            <EntityCard key={person.uid} item={person} type="people" />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title">Planets</h2>
        <div className="horizontal-scroll-container">
          {store.planets.map((planet) => (
            <EntityCard key={planet.uid} item={planet} type="planets" />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title">Vehicles</h2>
        <div className="horizontal-scroll-container">
          {store.vehicles.map((vehicle) => (
            <EntityCard key={vehicle.uid} item={vehicle} type="vehicles" />
          ))}
        </div>
      </section>
    </div>
  );
};
