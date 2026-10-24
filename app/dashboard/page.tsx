import EmployeesLocation from "./@locations/_components/EmployeesLocation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ store?: string | string[] }>;
}) {
  const { store } = await searchParams;
  const storeId = Array.isArray(store) ? store[0] : store;

  return (
    <div className="h-full w-4/12">
      <div className="my-10 h-[90vh] overflow-hidden overflow-y-auto">
        {storeId ? (
          <EmployeesLocation store={storeId} />
        ) : (
          <p className="w-full text-2xl text-center">
            Selecciona una tienda para ver los empleados
          </p>
        )}
      </div>
    </div>
  );
}
