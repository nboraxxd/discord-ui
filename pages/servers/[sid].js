import { useRouter } from 'next/router'
import * as Icons from '/components/icons'
import data from '/data.json'

export default function Server1() {
  const router = useRouter()

  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <button className="flex h-12 items-center px-4 font-title text-[0.9375rem] text-white shadow-sm transition-all hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 h-4 w-4">
            <Icons.Verified className="absolute h-4 w-4 text-gray-550" />
            <Icons.Check className="absolute top-0 h-4 w-4" />
          </div>
          {data[router.query.sid]?.label}
          <Icons.Chevron className="ml-auto h-[18px] w-[18px] opacity-80" />
        </button>
        <div className="scrollbar mt-3 flex-1 space-y-[21px] overflow-y-scroll font-medium text-gray-300">
          {data[router.query.sid]?.categories.map((category) => (
            <div key={category.id} className="space-y-0.5">
              {category.label !== '' && (
                <button className="flex items-center px-0.5 font-title text-xs uppercase tracking-wide">
                  <Icons.Arrow className="mr-0.5 h-3 w-3" />
                  {category.label}
                </button>
              )}
              <div className="space-y-0.5">
                {category.channels.map((channel) => (
                  <ChannelLink key={channel.key} channel={channel} />
                ))}
              </div>
            </div>
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

function ChannelLink({ channel }) {
  const Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag

  return (
    <a
      key={channel.id}
      href="#!"
      className="group ml-2 mr-1 flex items-center rounded px-2 py-1 text-gray-300 transition-all hover:bg-gray-550/[0.16] hover:text-gray-100"
    >
      <Icon className="mr-1.5 h-5 w-5 text-gray-400" />
      {channel.label}
      <Icons.AddPerson className="invisible ml-auto h-4 w-4 text-gray-200 opacity-0 transition-all hover:text-gray-100 group-hover:visible group-hover:opacity-100" />
    </a>
  )
}
