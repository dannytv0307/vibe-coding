import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  title?: string;
}

export function AuthCard({ children, title }: AuthCardProps) {
  return (
    <div className="min-h-dvh grid place-items-center bg-gray-100 p-4">
      <div className="w-full md:max-w-[440px] bg-white rounded-2xl shadow-lg p-4 md:p-8">
        {title && (
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </header>
        )}
        {children}
      </div>
    </div>
  );
}
