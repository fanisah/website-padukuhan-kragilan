import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import type { AdminRole } from "../../types/admin";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  role: AdminRole | null;
  isActive: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
};

export type { AdminRole } from "../../types/admin";

type AdminAccessRecord = {
  role: AdminRole;
  is_active: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [accessLoading, setAccessLoading] = useState(false);
  const [access, setAccess] = useState<AdminAccessRecord | null>(null);

  useEffect(() => {
    let active = true;

    if (!supabase) {
      setSessionLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      setSession(error ? null : data.session);
      setSessionLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession);
        setSessionLoading(false);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;
    const userId = session?.user.id;

    if (!userId || !supabase) {
      setAccess(null);
      setAccessLoading(false);
      return;
    }

    setAccessLoading(true);
    supabase
      .schema("public")
      .from("admin_profiles")
      .select("role, is_active")
      .eq("user_id", userId)
      .maybeSingle<AdminAccessRecord>()
      .then(({ data, error }) => {
        if (!active) return;
        setAccess(error ? null : data);
        setAccessLoading(false);
      });

    return () => {
      active = false;
    };
  }, [session?.user.id]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      role: access?.role ?? null,
      isActive: access?.is_active === true,
      isAdmin: Boolean(session && access?.is_active),
      isSuperAdmin: Boolean(session && access?.is_active && access.role === "super_admin"),
      loading: sessionLoading || accessLoading,
      async signIn(email, password) {
        if (!supabase) {
          return { error: new Error("Supabase authentication is unavailable.") };
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
      },
      async signOut() {
        if (!supabase) {
          return { error: new Error("Supabase authentication is unavailable.") };
        }
        const { error } = await supabase.auth.signOut();
        return { error };
      },
    }),
    [access, accessLoading, session, sessionLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}
