import { auth } from "./firebase";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";

// ✅ Wait for Firebase auth
const getUser = () =>
  new Promise<any>((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();

      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
) => {
  try {
    const user = await getUser();

    const token = await user.getIdToken();

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    const contentType = response.headers.get("content-type");

    let data: any;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // ✅ IMPORTANT DEBUGGING
    console.log("📡 API RESPONSE:", {
      url: `${BASE_URL}${url}`,
      status: response.status,
      data,
    });

    if (!response.ok) {
      throw new Error(
        typeof data === "string"
          ? data
          : data?.message || "API request failed"
      );
    }

    return data;
  } catch (error) {
    console.error("❌ fetchWithAuth ERROR:", error);
    throw error;
  }
};