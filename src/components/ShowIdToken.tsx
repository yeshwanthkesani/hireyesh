import { useState } from "react";
import { auth } from "@/firebaseConfig";

const ShowIdToken = () => {
  const [token, setToken] = useState("");

  const handleClick = async () => {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      setToken(idToken); // ⬅️ Store it in state so it appears below
    } else {
      alert("⚠️ No user is logged in");
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Show Firebase ID Token
      </button>

      {token && (
        <textarea
          value={token}
          readOnly
          className="w-full h-40 p-2 border rounded text-xs"
        />
      )}
    </div>
  );
};

export default ShowIdToken;
