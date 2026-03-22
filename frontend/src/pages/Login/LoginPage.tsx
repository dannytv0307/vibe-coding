import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AuthCard } from "../../components/AuthCard";
import { LoginForm } from "../../components/LoginForm";

export function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <AuthCard title="Sign in">
      <LoginForm />
    </AuthCard>
  );
}
