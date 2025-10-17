import { useState } from "react";
import { useLogin } from "./useLogin";

function Login() {
  const [email, setEmail] = useState("862677188@qq.com");
  const [password, setPassword] = useState("509509");

  const { login, isLoggingIn } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600">
            <span className="text-2xl">👔</span>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">欢迎回来</h2>
          <p className="text-gray-600">登录您的天气穿搭助手账户</p>
        </div>

        {/* Form */}
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                邮箱地址
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  placeholder="请输入您的邮箱"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400">📧</span>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                密码
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  placeholder="请输入您的密码"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400">🔒</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
            >
              {isLoggingIn ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  <span>登录中...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>登录</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              还没有账户？
              <a
                href="#"
                className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
              >
                立即注册
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
