export class ApiError extends Error {
  public statusCode: number;
  public data?: any;

  constructor(message: string, statusCode: number = 500, data?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static fromResponse(res: Response, data?: any): ApiError {
    const message =
      data?.msg ||
      data?.message ||
      data?.error ||
      (res.statusText ? `Request failed with ${res.statusText} (${res.status})` : `HTTP ${res.status} Error`);
    return new ApiError(message, res.status, data);
  }
}

export interface LoginResponse {
  success: boolean;
  user: any;
  role: "CANDIDATE" | "RECRUITER" | "ADMIN" | string;
  token?: string;
  redirectTo: string;
}

export interface SignupResponse {
  success: boolean;
  user: any;
  role: string;
  token?: string;
  redirectTo: string;
}

export interface LogoutResponse {
  success: boolean;
  msg: string;
}

export class ApiClient {
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = new Headers(options.headers || {});
    if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    let response: Response;
    try {
      response = await fetch(endpoint, {
        ...options,
        headers,
      });
    } catch (networkError: any) {
      throw new ApiError(
        networkError?.message || "Network error. Please verify your connection.",
        0
      );
    }

    let data: any = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      try {
        data = await response.json();
      } catch (jsonErr) {
        data = null;
      }
    } else {
      try {
        const text = await response.text();
        data = { message: text };
      } catch {
        data = null;
      }
    }

    if (!response.ok) {
      throw ApiError.fromResponse(response, data);
    }

    return data as T;
  }

  public auth = {
    login: async (credentials: {
      email: string;
      password: string;
    }): Promise<LoginResponse> => {
      return this.request<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },

    signup: async (payload: {
      name: string;
      email: string;
      password: string;
      username?: string;
      phonenumber?: string;
      role?: "CANDIDATE" | "RECRUITER" | "ADMIN";
      companyName?: string;
      companyWebsite?: string;
    }): Promise<SignupResponse> => {
      return this.request<SignupResponse>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    logout: async (): Promise<LogoutResponse> => {
      return this.request<LogoutResponse>("/api/logout", {
        method: "POST",
        cache: "no-store",
      });
    },

    userSignout: async (): Promise<{ message?: string; success?: boolean }> => {
      return this.request("/api/user/signout", {
        method: "POST",
        cache: "no-store",
      });
    },
  };

  public jobs = {
    getAll: async (): Promise<any> => {
      return this.request("/api/user/job", {
        method: "GET",
      });
    },

    create: async (jobData: any): Promise<any> => {
      return this.request("/api/admin/jobpost", {
        method: "POST",
        body: JSON.stringify(jobData),
      });
    },
  };

  public user = {
    getMe: async (): Promise<any> => {
      return this.request("/api/user/me", {
        method: "GET",
      });
    },

    uploadResume: async (formData: FormData): Promise<any> => {
      return this.request("/api/resume", {
        method: "POST",
        body: formData,
      });
    },
  };
}

export const api = new ApiClient();
export default api;
