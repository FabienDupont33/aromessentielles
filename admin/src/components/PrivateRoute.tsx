// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const PrivateRoute = ({ children }: Props) => {
  const [isValid, setIsValid] = useState<boolean | null>(null); // null = chargement

  useEffect(() => {
    const token = localStorage.getItem("adminAromaToken");

    if (!token) {
      setIsValid(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) setIsValid(true);
        else setIsValid(false);
      })
      .catch(() => setIsValid(false));
  }, []);

  if (isValid === null) {
    return <div className="p-8 text-center">Vérification de la session...</div>;
  }

  return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
