import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "landlord" | "supervisor" | "tenant";
}

interface AuthState {
  authState: "check-account" | "login" | "signup";
  isAuthenticated: boolean;
  user: User | null;
  mobileNumber: string;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "AUTH_LOGIN_START" }
  | { type: "AUTH_LOGIN_SUCCESS"; payload: User }
  | { type: "AUTH_LOGIN_FAILURE"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "AUTH_CLEAR_ERROR" }
  | { type: "SET_AUTH_STATE"; payload: AuthState["authState"] }
  | { type: "SET_MOBILE_NUMBER"; payload: string };

const initialState: AuthState = {
  authState: "check-account",
  isAuthenticated: false,
  user: null,
  mobileNumber: "",
  loading: false,
  error: null,
};

const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "AUTH_LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "AUTH_LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "AUTH_LOGOUT":
      return {
        ...initialState,
      };
    case "AUTH_CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_AUTH_STATE":
      return {
        ...state,
        authState: action.payload,
        error: null,
      };
    case "SET_MOBILE_NUMBER":
      return {
        ...state,
        mobileNumber: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
