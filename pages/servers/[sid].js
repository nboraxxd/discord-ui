import { useRouter } from 'next/router'
import { VerifiedIcon, CheckIcon, ChevronIcon } from '/components/icons'

export default function Server1() {
  const router = useRouter()

  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <button className="hover:bg-gray-550/[0.16] flex h-12 items-center px-4 font-title text-[0.9375rem] text-white shadow-sm transition-all">
          <div className="relative mr-1 h-4 w-4">
            <VerifiedIcon className="text-gray-550 absolute h-4 w-4" />
            <CheckIcon className="absolute top-0 h-4 w-4" />
          </div>
          {router.query.sid}
          <ChevronIcon className="ml-auto h-[1.125rem] w-[1.125rem] opacity-80" />
        </button>
        <div className="scrollbar flex-1 space-y-2 overflow-y-scroll p-3 font-medium text-gray-300">
          <p className="text-white">general</p>
          {[...Array(20)].map((_, i) => (
            <p key={i}>channel {i}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-gray-700">
        <div className="flex h-12 items-center px-3 shadow-sm">general</div>
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
