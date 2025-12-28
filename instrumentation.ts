export async function register() {
  const { register: sentryRegister } = await import("./instrumentation");
  await sentryRegister();
}
