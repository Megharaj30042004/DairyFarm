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
import ChatBot from "./components/ChatBot";
import CowsPage from "./components/CowsPage";
import DiseasesPage from "./components/DiseasesPage";
import EmergencyPage from "./components/EmergencyPage";
import FinanceWorkspace from "./components/FinanceWorkspace";
import LoginPage from "./components/LoginPage";
import MarketplaceHub from "./components/MarketplaceHub";
import SetupPage from "./components/SetupPage";
import Toast from "./components/Toast";

const routes = [
  { key: "setup", label: "Farm Setup" },
  { key: "cows", label: "Cows" },
  { key: "buffaloes", label: "Buffaloes" },
  { key: "finance", label: "Finance" },
  { key: "marketplace", label: "Marketplace" },
  { key: "emergency", label: "Emergency" },
  { key: "diseases", label: "Disease Guide" },
  { key: "chatbot", label: "AI Assistant" }
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
  const [toast, setToast] = useState(null);

  const triggerToast = (title, message, type = "success") => {
    setToast({ title, message, type, id: Date.now() });
  };

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

        const currentUserObj = meResponse.user || meResponse;
        const normalizedUser = {
          ...currentUserObj,
          id: String(currentUserObj.id || currentUserObj._id || ""),
          _id: String(currentUserObj.id || currentUserObj._id || "")
        };
        setUser(normalizedUser);
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
            : syncAnimalDrafts(
                cowInventorySeed,
                farmResponse.cowsCount || 0,
                "Cow"
              )
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
    const normalizedUser = {
      ...nextUser,
      id: String(nextUser.id || nextUser._id || ""),
      _id: String(nextUser.id || nextUser._id || "")
    };
    setUser(normalizedUser);
    triggerToast(
      "ನಮಸ್ಕಾರ (Namaskara)! 🙏",
      `ಸ್ವಾಗತ ${nextUser?.fullName || "ರೈತರೇ"}! Welcome to your Dairy Farm Management Dashboard.`,
      "success"
    );
    window.location.hash = "/setup";
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (_err) {
      // Fallback cleanup
    }
    window.localStorage.removeItem("dairyfarm-token");
    setAuthToken("");
    setUser(null);
    triggerToast(
      "ವಂದನೆಗಳು (Vandanegalu)! 🙏",
      "ಧನ್ಯವಾದಗಳು! You have been logged out successfully.",
      "info"
    );
    window.location.hash = "/";
  };

  const handleSaveSetup = async () => {
    try {
      const saved = await api.saveFarm(authToken, {
        cowsCount: Number(herdSetup.cowsCount || 0),
        buffaloesCount: Number(herdSetup.buffaloesCount || 0)
      });

      setHerdSetup({
        cowsCount: saved.cowsCount,
        buffaloesCount: saved.buffaloesCount
      });

      triggerToast(
        "Herd Setup Saved!",
        `Configured count: ${saved.cowsCount} Cows, ${saved.buffaloesCount} Buffaloes.`,
        "success"
      );
    } catch (error) {
      triggerToast("Setup Failed", error.message || "Failed to save herd setup.", "error");
      throw error;
    }
  };

  const parseAge = (ageText = "") => {
    const numbers = ageText.match(/\d+/g)?.map(Number) || [];
    return {
      ageYears: numbers[0] || 0,
      ageMonths: numbers[1] || 0
    };
  };

  const handleSaveAnimals = async (type) => {
    try {
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

      triggerToast(
        `${type} Records Saved!`,
        `All ${type.toLowerCase()} livestock records have been updated.`,
        "success"
      );
    } catch (error) {
      triggerToast(`${type} Save Failed`, error.message || `Failed to save ${type.toLowerCase()} records.`, "error");
      throw error;
    }
  };

  const handleSaveFinance = async (payload) => {
    try {
      const saved = await api.saveFinance(authToken, payload);
      setFinance(saved);
      triggerToast(
        "Finance Data Saved!",
        "Milk sales, rates, and expenses have been stored.",
        "success"
      );
      return saved;
    } catch (error) {
      triggerToast("Finance Save Failed", error.message || "Failed to save finance data.", "error");
      throw error;
    }
  };

  const handleCreateListing = async (payload) => {
    try {
      const saved = await api.createMarketplaceListing(authToken, {
        ...payload,
        sellerName: user?.fullName || "Farm seller"
      });
      setMarketplaceListings((current) => [saved, ...current]);
      triggerToast(
        "Listing Published!",
        "Your livestock listing is now live in the marketplace.",
        "success"
      );
    } catch (error) {
      triggerToast("Publish Failed", error.message || "Failed to publish listing.", "error");
      throw error;
    }
  };

  const handleUpdateListing = async (id, payload) => {
    try {
      let updated;
      try {
        updated = await api.updateMarketplaceListing(authToken, id, payload);
      } catch (err) {
        console.warn("Backend update fallback:", err.message);
        updated = { _id: id, ...payload };
      }
      setMarketplaceListings((current) =>
        current.map((item) => ((item._id || item.id) === id ? { ...item, ...updated } : item))
      );
      triggerToast(
        "Listing Updated!",
        "Your livestock listing details have been updated.",
        "success"
      );
      return updated;
    } catch (error) {
      triggerToast("Update Failed", error.message || "Failed to update listing.", "error");
      throw error;
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      try {
        await api.deleteMarketplaceListing(authToken, id);
      } catch (apiError) {
        console.warn("Backend delete note:", apiError.message);
      }

      setMarketplaceListings((current) =>
        current.filter((item) => (item._id || item.id) !== id)
      );

      triggerToast(
        "Listing Removed",
        "The marketplace listing was deleted successfully.",
        "info"
      );
    } catch (error) {
      triggerToast("Delete Failed", error.message || "Failed to delete listing.", "error");
      throw error;
    }
  };


  if (isBootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/70">
        Loading your dairy workspace...
      </div>
    );
  }

  if (!authToken) {
    return (
      <>
        <Toast toast={toast} onClose={() => setToast(null)} />
        <LoginPage onAuthSuccess={handleAuthSuccess} appError={appError} />
      </>
    );
  }

  let page = null;

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
          user={user}
          onCreateListing={handleCreateListing}
          onUpdateListing={handleUpdateListing}
          onDeleteListing={handleDeleteListing}
        />
      );
      break;
    case "emergency":
      page = <EmergencyPage contacts={emergencyContacts} />;
      break;
    case "diseases":
      page = <DiseasesPage diseases={diseases} />;
      break;
    case "chatbot":
      page = <ChatBot stats={stats} user={user} authToken={authToken} />;
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
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
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
    </>
  );
}
