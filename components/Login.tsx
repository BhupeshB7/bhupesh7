"use client";

import { useState, ChangeEvent, FormEvent, JSX, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock, Smartphone, X } from "lucide-react";
import usersData from "@/data/user.json";

interface User {
  id: string;
  name: string;
  email?: string;
  password: string;
  mobile?: string;
  role: string;
  avatar?: string;
}

interface FormData {
  identifier: string;
  countryCode: string;
  password: string;
}

interface Errors {
  identifier?: string;
  password?: string;
  general?: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

export default function Login(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [formData, setFormData] = useState<FormData>({
    identifier: "",
    countryCode: "+91",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const identifierValue: string = formData.identifier;
  const isMobileInput: boolean =
    /^[0-9]+$/.test(identifierValue) && identifierValue.length <= 10;

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const showToast = (message: string, type: "success" | "error"): void => {
    const newToast: Toast = {
      id: Date.now(),
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or mobile number is required";
    } else {
      const isEmail: boolean = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(
        formData.identifier,
      );
      const isMobile: boolean = /^[0-9]{10}$/.test(formData.identifier);

      if (!isEmail && !isMobile) {
        newErrors.identifier = "Enter a valid email or 10-digit mobile number";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 50) {
      newErrors.password = "Password is too long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFormData((prev) => ({
      ...prev,
      countryCode: e.target.value,
    }));
  };

  const authenticateUser = (
    identifier: string,
    password: string,
  ): User | null => {
    const users: User[] = usersData as User[];

    const isEmail = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(identifier);
    const isMobile = /^[0-9]{10}$/.test(identifier);

    if (isEmail) {
      return (
        users.find(
          (user: User) =>
            user.email === identifier && user.password === password,
        ) || null
      );
    } else if (isMobile) {
      return (
        users.find((user: User) => {
          const userMobile = user.mobile || "";
          const fullMobileNumber = identifier;
          const userMobileWithoutCode = userMobile.replace(/^\+[0-9]{1,3}/, "");
          return (
            (userMobile === fullMobileNumber ||
              userMobileWithoutCode === identifier) &&
            user.password === password
          );
        }) || null
      );
    }

    return null;
  };

  const setCookie = (name: string, value: string, days: number): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      let identifier = formData.identifier;

      if (isMobileInput && formData.identifier.length === 10) {
        identifier = formData.countryCode + formData.identifier;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      const user = authenticateUser(identifier, formData.password);

      if (user) {
        const token = btoa(`${user.id}:${Date.now()}:${user.role}`);
        setCookie("auth_token", token, 7);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            avatar: user.avatar,
          }),
        );

        showToast(`Welcome back, ${user.name}! Login successful.`, "success");

        setTimeout(() => {
          router.push(redirectTo);
        }, 1000);
      } else {
        showToast(
          "Invalid email/mobile or password. Please try again.",
          "error",
        );
        setErrors({ general: "Invalid credentials" });
      }
    } catch (error) {
      showToast("Something went wrong. Please try again later.", "error");
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h1>
              <p className="text-gray-400">
                Sign in to your personal brand blog
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">
                  Email or Mobile Number
                </label>
                <div className="flex gap-2">
                  {isMobileInput && (
                    <div className="relative">
                      <select
                        value={formData.countryCode}
                        onChange={handleCountryCodeChange}
                        className="h-11 px-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 hover:bg-white/10 appearance-none cursor-pointer"
                      >
                        <option value="+91" className="bg-gray-900">
                          🇮🇳 +91
                        </option>
                        <option value="+1" className="bg-gray-900">
                          🇺🇸 +1
                        </option>
                        <option value="+44" className="bg-gray-900">
                          🇬🇧 +44
                        </option>
                        <option value="+61" className="bg-gray-900">
                          🇦🇺 +61
                        </option>
                        <option value="+86" className="bg-gray-900">
                          🇨🇳 +86
                        </option>
                      </select>
                    </div>
                  )}
                  <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {isMobileInput ? (
                        <Smartphone className="h-4 w-4" />
                      ) : (
                        <Mail className="h-4 w-4" />
                      )}
                    </div>
                    <input
                      type={isMobileInput ? "tel" : "text"}
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleInputChange}
                      placeholder={
                        isMobileInput
                          ? "Enter mobile number"
                          : "email@example.com"
                      }
                      className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:bg-white/10 ${
                        errors.identifier
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                          : "border-white/10 focus:border-blue-500 focus:ring-blue-500/50"
                      }`}
                      disabled={isLoading}
                      autoComplete="off"
                    />
                  </div>
                </div>
                {errors.identifier && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.identifier}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-2.5 bg-white/5 border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:bg-white/10 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                        : "border-white/10 focus:border-blue-500 focus:ring-blue-500/50"
                    }`}
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {errors.general && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400 text-center">
                    {errors.general}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-center text-gray-500">
                Demo credentials: guest@example.com / 123456
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 min-w-[300px] max-w-md px-4 py-3 rounded-lg shadow-lg animate-slide-in-right ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : "bg-gradient-to-r from-red-500 to-rose-600"
            } text-white`}
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
