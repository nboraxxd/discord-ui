import { useRouter } from 'next/router'

export default function Server1() {
  const router = useRouter()

  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <div className="flex h-12 items-center px-3 font-title capitalize text-white shadow-md">
          {' '}
          {router.query.sid}
        </div>
        <div className="scrollbar flex-1 space-y-2 overflow-y-scroll p-3 font-medium text-gray-300">
          <p className="text-white">general</p>
          {[...Array(20)].map((_, i) => (
            <p key={i}>channel {i}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-gray-700">
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
    </>
  )
}
