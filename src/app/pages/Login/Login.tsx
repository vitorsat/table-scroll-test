export function Login() {
  return (
    <main className="flex items-center justify-center h-screen">
      <form>
        <div className="bg-white w-96 p-6 rounded shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://logolook.net/wp-content/uploads/2021/12/Gryffindor-Logo.png"
              className="h-32"
              alt="logo"
            />
          </div>
          <div className="bg-red-500 px-3 py-2 rounded text-gray-100 mb-3">
            <p>Wrong email entered!</p>
          </div>
          <label htmlFor="email" className="text-gray-700">
            Email
            <input
              id="email"
              type="email"
              className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
            />
          </label>
          <label htmlFor="password" className="text-gray-700">
            Password
            <input
              id="password"
              type="password"
              className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
            />
          </label>
          <button
            className="bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
