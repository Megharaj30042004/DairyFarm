import { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import {
  buffaloInventorySeed,
  createAnimalDraft,
  cowInventorySeed,
  herdSetupDefaults
} from "./data/mockData";
import AppShell from "./components/AppShell";
import BuffaloPage from "./components/BuffaloPage";
import CowsPage from "./components/CowsPage";
import DiseasesPage from "./components/DiseasesPage";
import EmergencyPage from "./components/EmergencyPage";
import FinanceWorkspace from "./components/FinanceWorkspace";
import LoginPage from "./components/LoginPage";
import MarketplaceHub from "./components/MarketplaceHub";
import SetupPage from "./components/SetupPage";

const routes = [
  { key: "setup", label: "Farm Setup" },
  { key: "cows", label: "Cows" },
  { key: "buffaloes", label: "Buffaloes" },
  { key: "finance", label: "Finance" },
  { key: "marketplace", label: "Marketplace" },
  { key: "emergency", label: "Emergency" },
  { key: "diseases", label: "Disease Guide" }
];

const routeMap = new Set(routes.map((route) => route.key));

function getRouteFromHash() {
  const route = window.location.hash.replace("#/", "");
  return routeMap.has(route) ? route : "setup";
}

function syncAnimalDrafts(currentAnimals, count, animalType) {
  const safeCount = Math.max(Number(count || 0), 0);

  if (safeCount === 0) {
    return [];
  }

  return Array.from({ length: safeCount }, (_, index) => {
    const existing = currentAnimals[index];
    return (
      existing || {
        ...createAnimalDraft(animalType, index),
        id: `${animalType.toLowerCase()}-${index + 1}-${Date.now()}`
      }
    );
  });
}

export default function App() {
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState(null);
  const [activeRoute, setActiveRoute] = useState(() => getRouteFromHash());
  const [herdSetup, setHerdSetup] = useState(herdSetupDefaults);
  const [cows, setCows] = useState(cowInventorySeed);
  const [buffaloes, setBuffaloes] = useState(buffaloInventorySeed);
  const [finance, setFinance] = useState(null);
  const [marketplaceListings, setMarketplaceListings] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState({
    priority: [],
    districts: []
  });
  const [diseases, setDiseases] = useState([]);
  const [appError, setAppError] = useState("");
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const handleHashChange = () => setActiveRoute(getRouteFromHash());

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("dairyfarm-token");
    if (storedToken) {
      setAuthToken(storedToken);
    } else {
      setIsBootstrapping(false);
    }
  }, []);

  const updateAnimalList = (type, index, field, value) => {
    const setter = type === "Cow" ? setCows : setBuffaloes;

    setter((current) =>
      current.map((animal, animalIndex) =>
        animalIndex === index ? { ...animal, [field]: value } : animal
      )
    );
  };

  const stats = useMemo(
    () => ({
      cows: Number(herdSetup.cowsCount || 0),
      buffaloes: Number(herdSetup.buffaloesCount || 0),
      totalAnimals:
        Number(herdSetup.cowsCount || 0) + Number(herdSetup.buffaloesCount || 0),
      totalMilkCapacity: [...cows, ...buffaloes].reduce(
        (sum, animal) => sum + Number(animal.milkYieldPerDay || 0),
        0
      ),
      projectedMonthlyMilk: [...cows, ...buffaloes].reduce(
        (sum, animal) => sum + Number(animal.milkYieldPerDay || 0) * 30,
        0
      )
    }),
    [buffaloes, cows, herdSetup]
  );

  useEffect(() => {
    setCows((current) => syncAnimalDrafts(current, herdSetup.cowsCount, "Cow"));
  }, [herdSetup.cowsCount]);

  useEffect(() => {
    setBuffaloes((current) =>
      syncAnimalDrafts(current, herdSetup.buffaloesCount, "Buffalo")
    );
  }, [herdSetup.buffaloesCount]);

  useEffect(() => {
    async function bootstrap() {
      if (!authToken) {
        return;
      }

      try {
        setIsBootstrapping(true);
        setAppError("");

        const [
          meResponse,
          farmResponse,
          cowsResponse,
          buffaloesResponse,
          financeResponse,
          marketplaceResponse,
          emergencyResponse,
          diseasesResponse
        ] = await Promise.all([
          api.me(authToken),
          api.getFarm(authToken),
          api.getCows(authToken),
          api.getBuffaloes(authToken),
          api.getFinance(authToken),
          api.getMarketplace(),
          api.getEmergencyContacts(),
          api.getDiseases()
        ]);

        setUser(meResponse.user);
        setHerdSetup({
          cowsCount: farmResponse.cowsCount || 0,
          buffaloesCount: farmResponse.buffaloesCount || 0
        });
        setCows(
          cowsResponse.length
            ? syncAnimalDrafts(
                cowsResponse.map((animal) => ({
                id: animal._id,
                animalType: "Cow",
                nameTagId: animal.nameTagId,
                age: `${animal.age?.years || 0} years ${animal.age?.months || 0} months`,
                milkYieldPerDay: animal.milkYieldPerDay,
                pregnancyStatus: animal.pregnancyStatus
                })),
                farmResponse.cowsCount || cowsResponse.length || 0,
                "Cow"
              )
            : syncAnimalDrafts(cowInventorySeed, farmResponse.cowsCount || 0, "Cow")
        );
        setBuffaloes(
          buffaloesResponse.length
            ? syncAnimalDrafts(
                buffaloesResponse.map((animal) => ({
                id: animal._id,
                animalType: "Buffalo",
                nameTagId: animal.nameTagId,
                age: `${animal.age?.years || 0} years ${animal.age?.months || 0} months`,
                milkYieldPerDay: animal.milkYieldPerDay,
                pregnancyStatus: animal.pregnancyStatus
                })),
                farmResponse.buffaloesCount || buffaloesResponse.length || 0,
                "Buffalo"
              )
            : syncAnimalDrafts(
                buffaloInventorySeed,
                farmResponse.buffaloesCount || 0,
                "Buffalo"
              )
        );
        setFinance(financeResponse);
        setMarketplaceListings(marketplaceResponse);
        setEmergencyContacts(emergencyResponse);
        setDiseases(diseasesResponse);
      } catch (error) {
        setAppError(error.message);
        setAuthToken("");
        setUser(null);
        window.localStorage.removeItem("dairyfarm-token");
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrap();
  }, [authToken]);

  const handleAuthSuccess = ({ token, user: nextUser }) => {
    window.localStorage.setItem("dairyfarm-token", token);
    setAuthToken(token);
    setUser(nextUser);
    window.location.hash = "/setup";
  };

  const handleLogout = () => {
    window.localStorage.removeItem("dairyfarm-token");
    setAuthToken("");
    setUser(null);
    window.location.hash = "/";
  };

  const handleSaveSetup = async () => {
    const saved = await api.saveFarm(authToken, {
      cowsCount: Number(herdSetup.cowsCount || 0),
      buffaloesCount: Number(herdSetup.buffaloesCount || 0)
    });

    setHerdSetup({
      cowsCount: saved.cowsCount,
      buffaloesCount: saved.buffaloesCount
    });
  };

  const parseAge = (ageText = "") => {
    const numbers = ageText.match(/\d+/g)?.map(Number) || [];
    return {
      ageYears: numbers[0] || 0,
      ageMonths: numbers[1] || 0
    };
  };

  const handleSaveAnimals = async (type) => {
    const items = (type === "Cow" ? cows : buffaloes).map((animal) => ({
      nameTagId: animal.nameTagId,
      milkYieldPerDay: Number(animal.milkYieldPerDay || 0),
      pregnancyStatus: animal.pregnancyStatus,
      ...parseAge(animal.age)
    }));

    const saved =
      type === "Cow"
        ? await api.saveCows(authToken, items)
        : await api.saveBuffaloes(authToken, items);

    const normalized = saved.map((animal) => ({
      id: animal._id,
      animalType: type,
      nameTagId: animal.nameTagId,
      age: `${animal.age?.years || 0} years ${animal.age?.months || 0} months`,
      milkYieldPerDay: animal.milkYieldPerDay,
      pregnancyStatus: animal.pregnancyStatus
    }));

    if (type === "Cow") {
      setCows(
        syncAnimalDrafts(
          normalized,
          herdSetup.cowsCount || normalized.length || 0,
          "Cow"
        )
      );
    } else {
      setBuffaloes(
        syncAnimalDrafts(
          normalized,
          herdSetup.buffaloesCount || normalized.length || 0,
          "Buffalo"
        )
      );
    }
  };

  const handleSaveFinance = async (payload) => {
    const saved = await api.saveFinance(authToken, payload);
    setFinance(saved);
    return saved;
  };

  const handleCreateListing = async (payload) => {
    const saved = await api.createMarketplaceListing(authToken, {
      ...payload,
      sellerName: user?.fullName || "Farm seller"
    });
    setMarketplaceListings((current) => [saved, ...current]);
  };

  if (isBootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/70">
        Loading your dairy workspace...
      </div>
    );
  }

  if (!authToken) {
    return <LoginPage onAuthSuccess={handleAuthSuccess} appError={appError} />;
  }

  let page;

  switch (activeRoute) {
    case "cows":
      page = (
        <CowsPage
          cows={cows}
          herdSetup={herdSetup}
          onSave={() => handleSaveAnimals("Cow")}
          onUpdateAnimal={(index, field, value) =>
            updateAnimalList("Cow", index, field, value)
          }
        />
      );
      break;
    case "buffaloes":
      page = (
        <BuffaloPage
          buffaloes={buffaloes}
          herdSetup={herdSetup}
          onSave={() => handleSaveAnimals("Buffalo")}
          onUpdateAnimal={(index, field, value) =>
            updateAnimalList("Buffalo", index, field, value)
          }
        />
      );
      break;
    case "finance":
      page = (
        <FinanceWorkspace
          stats={stats}
          finance={finance}
          cows={cows}
          buffaloes={buffaloes}
          onSave={handleSaveFinance}
        />
      );
      break;
    case "marketplace":
      page = (
        <MarketplaceHub
          listings={marketplaceListings}
          onCreateListing={handleCreateListing}
        />
      );
      break;
    case "emergency":
      page = <EmergencyPage contacts={emergencyContacts} />;
      break;
    case "diseases":
      page = <DiseasesPage diseases={diseases} />;
      break;
    case "setup":
    default:
      page = (
        <SetupPage
          herdSetup={herdSetup}
          setHerdSetup={setHerdSetup}
          stats={stats}
          onSave={handleSaveSetup}
        />
      );
      break;
  }

  return (
    <AppShell
      routes={routes}
      activeRoute={activeRoute}
      herdSetup={herdSetup}
      stats={stats}
      user={user}
      onLogout={handleLogout}
    >
      {page}
    </AppShell>
  );
}
