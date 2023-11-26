export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 text-white">
      <div className="max-w-lg">
        <div className="flex px-4 py-1 transition-all hover:bg-gray-800 hover:bg-opacity-20">
          <img className="mr-4 h-10 w-10 rounded-full" src="/adamwathan.jpeg" alt="adamwathan avatar" />
          <div>
            <p className="flex items-baseline">
              <span className="mr-2 text-sm font-medium text-green-500">adamwathan</span>
              <span className="text-xs text-gray-400">01/15/2021</span>
            </p>
            <p className="text-gray-300">
              You should never use something like leading relaxed with a big font size, it goes against all typography
              best practices. Line height should decrease as font size gets bigger
            </p>
          </div>
        </div>
        <div className="mt-1 px-4 py-1 transition-all hover:bg-gray-800 hover:bg-opacity-20">
          <p className="pl-14 text-gray-300">
            You can override it in your config if you want but ultimately we chose the defaults they did because they
            let you get results closest to what a professional designer would do more easily
          </p>
        </div>
        <div className="mt-1 px-4 py-1 transition-all hover:bg-gray-800 hover:bg-opacity-20">
          <p className="pl-14 text-gray-300">
            Since we changed this in tailwind 2 I’ve almost never used a leading class at all
          </p>
        </div>
      </div>
    </div>
  )
}
