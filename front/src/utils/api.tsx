const API_URL = "http://localhost:3001/api/v1/user";

interface LoginResponse {
  token: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
}


export const userLogin = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data.body; 
};

export const userSignUp = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Sign up failed");
  }

  return data.body;
};

export const getUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user profile");
  }

  return data.body;
};

export const postUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user profile");
  }

  return data.body;
};

export const updateUserProfile = async (
  firstName: string,
  lastName: string,
  token: string
): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data.body;
};