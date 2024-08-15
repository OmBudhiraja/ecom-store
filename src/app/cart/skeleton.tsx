function CartPageSkeleton() {
  return (
    <div className="relative m-auto flex max-w-screen-xl flex-col items-center justify-center gap-10 px-6 py-10 md:flex-row md:items-start md:gap-8 md:px-8 lg:gap-20 lg:px-10">
      <ul className="flex max-w-full flex-col gap-6 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex w-[650px] max-w-full items-center justify-between gap-7 rounded-lg border p-4 shadow-sm md:p-2 lg:p-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="aspect-square h-[100px] w-[100px] shrink-0 animate-pulse rounded-md bg-gray-200" />
              <div className="">
                <div className="md:32 mb-3 h-5 w-52 animate-pulse rounded bg-gray-200 lg:w-52" />
                <div className="flex items-center gap-2">
                  <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="ml-2 h-4 w-16 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-md bg-gray-200" />
              <div className="mx-2 h-6 w-3 animate-pulse rounded bg-gray-200" />
              <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-md bg-gray-200" />
              <div className="ml-2 flex h-8 w-8 animate-pulse items-center justify-center rounded-md bg-gray-200" />
            </div>
          </div>
        ))}
      </ul>
      <div className="top-24 h-fit w-80 shrink-0 rounded-lg border p-6 shadow-sm md:sticky">
        <div className="mb-6 h-6 w-40 animate-pulse rounded bg-gray-200" />
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2 py-1">
            <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mt-1 flex items-center justify-between">
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mt-4 flex h-10 w-full animate-pulse items-center justify-center rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default CartPageSkeleton;
