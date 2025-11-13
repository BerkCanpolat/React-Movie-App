import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(localStorage.getItem("session_id") || null);
  const [loading, setLoading] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
}, [sessionId]);

  const createRequestToken = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`);
    const data = await res.json();
    return data.request_token;
  };

const redirectToTMDB = async () => {
  const token = await createRequestToken();

  const redirectURL =
    import.meta.env.MODE === "development"
      ? `http://localhost:5173/approved?request_token=${token}`
      : `https://saintstreamwatch.netlify.app/approved?request_token=${token}`;

  window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${redirectURL}`;
};


  const createSession = async (approvedToken) => {
    setLoading(true);
    const res = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_token: approvedToken }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      localStorage.setItem("session_id", data.session_id);
      setSessionId(data.session_id);
    }
  };

 const logout = async () => {
  if (!sessionId) return;

  if (!window.confirm("Are you sure you want to log out?")) return;

  setLoading(true);
  try {
    const res = await fetch(`https://api.themoviedb.org/3/authentication/session?api_key=${TMDB_API_KEY}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });

    const data = await res.json();

    localStorage.removeItem("session_id");
    setSessionId(null);

    alert("Logout successful!");
  } catch (err) {
    console.error("Logout error:", err);
    alert("Logout failed!");
  } finally {
    setLoading(false);
  }
};

  const value = {
    sessionId,
    loading,
    redirectToTMDB,
    createSession,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
