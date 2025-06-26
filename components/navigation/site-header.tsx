export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sticky top-3 z-0 bg-blue-500">
      <div className="flex w-full justify-center items-center gap-1 p-3 md:px-12 ease-in-out border-b-2 border-red-500 transition-all duration-200 rounded-y-2xl" role="banner" aria-label="Site Header">
        <h1 className="flex flex-cols w-full justify-end sm:justify-center items-center text-md sm:text-lg font-medium">DeDevs Space</h1>
      </div>
    </header>
  )
}
