export default function Home() {
  return (
    <div className="flex h-screen text-white">
      <div className="scrollbar-hide space-y-2 overflow-y-scroll bg-gray-800 p-3">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-800">
            {i}
          </div>
        ))}
      </div>
      <div className="flex w-60 flex-col bg-gray-700">
        <div className="flex h-12 items-center px-3 shadow-md">Tailwind CSS</div>
        <div className="scrollbar flex-1 space-y-2 overflow-y-scroll p-3">
          {[...Array(20)].map((_, i) => (
            <p key={i}>channel {i}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-gray-600">
        <div className="flex h-12 items-center px-3 shadow-md">general</div>
        <div className="scrollbar flex-1 space-y-4 overflow-y-scroll p-3">
          {[...Array(20)].map((_, i) => (
            <p key={i}>
              Message {i}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ipsam repudiandae tempore
              cupiditate iusto quisquam necessitatibus sed unde perspiciatis, earum molestiae quae aliquid ullam, id
              dicta labore? Nam, deserunt in!
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
