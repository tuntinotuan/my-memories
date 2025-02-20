import Button from "@/components/button/Button";

export default function Page() {
  return (
    <section className="flex flex-col justify-center gap-5 w-[350px] mx-auto h-[100vh]">
      <h1 className="text-3xl font-bold text-center text-gray-700">
        Welcome back
      </h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className="border border-gray-200 rounded px-3 py-2 focus:outline-blue-200"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        className="border border-gray-200 rounded px-3 py-2 focus:outline-blue-200"
      />
      <Button>Continue</Button>
    </section>
  );
}
