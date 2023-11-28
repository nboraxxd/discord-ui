import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import * as Icons from '/components/icons'
import { data } from '/data'

export default function Server() {
  const [closedCategories, setClosedCategories] = useState([])
  const router = useRouter()

  const server = data[router.query.sid]
  const selectedChannel = server?.categories
    .map((c) => c.channels)
    .flat()
    .find((channel) => channel.label === router.query.cid)

  const ChannelIcon = selectedChannel?.icon ? Icons[selectedChannel.icon] : Icons.Hashtag

  function toggleCategory(categoryId) {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId]
    )
  }

  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <button className="flex h-12 items-center px-4 font-title text-[0.9375rem] text-white shadow-sm transition-all hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 h-4 w-4">
            <Icons.Verified className="absolute h-4 w-4 text-gray-550" />
            <Icons.Check className="absolute top-0 h-4 w-4" />
          </div>
          {server?.label}
          <Icons.Chevron className="ml-auto h-[18px] w-[18px] opacity-80" />
        </button>
        <div className="scrollbar mt-3 flex-1 space-y-[21px] overflow-y-scroll font-medium text-gray-300">
          {server?.categories.map((category) => (
            <div key={category.id} className="space-y-0.5">
              {category.label !== '' && (
                <button
                  className="flex w-full items-center px-0.5 font-title text-xs uppercase tracking-wide transition-all hover:text-gray-100"
                  onClick={() => toggleCategory(category.id)}
                >
                  <Icons.Arrow
                    className={clsx('mr-0.5 h-3 w-3 transition-all duration-200', {
                      '-rotate-90': closedCategories.includes(category.id),
                    })}
                  />
                  {category.label}
                </button>
              )}
              <div className="space-y-0.5">
                {category.channels
                  .filter((channel) => {
                    let categoryIsOpen = !closedCategories.includes(category.id)

                    return categoryIsOpen || channel.unread
                  })
                  .map((channel) => (
                    <ChannelLink sid={router.query.sid} key={channel.id} channel={channel} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-gray-700">
        <div className="flex h-12 items-center px-2 shadow-sm">
          {/* Channel name */}
          <div className="flex items-center">
            <ChannelIcon className="mx-2 h-6 w-6 font-semibold text-gray-400" />
            <span className="mr-2 whitespace-nowrap font-title text-white">{router.query.cid}</span>
          </div>

          {/* Channel description */}
          {selectedChannel?.description && (
            <>
              <div className="mx-2 h-6 w-px bg-white/[0.06]" />
              <div className="mx-2 truncate text-sm font-medium text-gray-200">{selectedChannel.description}</div>
            </>
          )}

          {/* Icons */}
          <div className="ml-auto flex items-center">
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.HashtagWithSpeechBubble className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Bell className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Pin className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.People className="mx-2 h-6 w-6" />
            </button>
            <div className="relative mx-2">
              <input
                type="text"
                placeholder="Search"
                className="relative h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Icons.Spyglass className="mr-1.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Inbox className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.QuestionCircle className="mx-2 h-6 w-6" />
            </button>
          </div>
        </div>
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

function ChannelLink({ sid, channel }) {
  const router = useRouter()

  const Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag
  const active = channel.label === router.query.cid

  const state = active ? 'active' : channel.unread ? 'inactiveUnread' : 'inactiveRead'
  const classes = {
    active: 'bg-gray-550/[0.32] text-white',
    inactiveUnread: 'text-white hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]',
    inactiveRead: 'text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100 active:bg-gray-550/[0.24]',
  }

  return (
    <Link key={channel.id} href={`/servers/${sid}/channels/${channel.label}`}>
      <a
        className={clsx('group relative ml-2 mr-1 flex items-center rounded px-2 py-1 transition-all', classes[state])}
      >
        {state === 'inactiveUnread' && (
          <div className="absolute -left-2 flex h-full items-center">
            <div className="flex h-2 w-1 rounded-r-full bg-white" />
          </div>
        )}
        <Icon className="mr-1.5 h-5 w-5 text-gray-400" />
        {channel.label}
        <Icons.AddPerson
          className={clsx('ml-auto h-4 w-4 text-gray-200 transition-all hover:text-gray-100', {
            'invisible opacity-0 group-hover:visible group-hover:opacity-100': state !== 'active',
          })}
        />
      </a>
    </Link>
  )
}
