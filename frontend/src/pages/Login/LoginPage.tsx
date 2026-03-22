/**
 * LoginPage — Authentication page for user login
 */
export function LoginPage() {
  return (
    <div className="grid place-items-center min-h-dvh bg-gray-100" role="main">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
        </header>
        <div>{/* Auth form component goes here */}</div>
      </div>
    </div>
  );
}
