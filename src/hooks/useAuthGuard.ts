import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebaseConfig";

export const useAuthGuard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate("/login");
            }
            });
            return unsubscribe;
    }, [navigate]);
};