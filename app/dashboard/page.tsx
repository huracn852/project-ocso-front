export default function DashboardPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-6 p-6 sm:flex-row">
      <div className="flex min-h-48 w-full max-w-md items-center justify-center bg-red-100 text-center">
        <p>Hola soy section 1</p>
      </div>
      <div className="flex min-h-48 w-full max-w-md items-center justify-center bg-red-100 text-center">
        <p>Hola soy section 2</p>
      </div>
    </div>
  );
}
