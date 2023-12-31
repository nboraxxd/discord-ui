import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import * as Icons from '/components/icons'
import { data } from '/data'

export default function Server() {
  const [closedCategories, setClosedCategories] = useState([])
  const router = useRouter()

  const server = data.find((item) => item.slug === router.query.sid)
  const channel = server?.categories
    .map((c) => c.channels)
    .flat()
    .find((channel) => channel.label === router.query.cid)
  const selectedChannelMessages = channel?.messages

  const ChannelIcon = channel?.icon ? Icons[channel.icon] : Icons.Hashtag

  function toggleCategory(categoryId) {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId]
    )
  }

  return (
    <>
      {/* Channels */}
      <div className="hidden w-60 flex-col bg-gray-800 lg:flex">
        <button className="flex h-12 items-center px-4 font-title text-[0.9375rem] text-white shadow-sm transition-all hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 h-4 w-4">
            <Icons.Verified className="h-4 w-4 text-gray-550" />
            <Icons.Check className="absolute inset-y-0 h-4 w-4" />
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

      {/* Messages area */}
      <div className="flex min-w-0 flex-1 flex-col bg-gray-700">
        <div className="flex h-12 items-center px-2 shadow-sm">
          {/* Channel name */}
          <div className="flex items-center">
            <ChannelIcon className="mx-2 h-6 w-6 font-semibold text-gray-400" />
            <span className="mr-2 whitespace-nowrap font-title text-white">{router.query.cid}</span>
          </div>

          {/* Channel description */}
          {channel?.description && (
            <>
              <div className="mx-2 hidden h-6 w-px bg-white/[0.06] md:block" />
              <div className="mx-2 hidden truncate text-sm font-medium text-gray-200 md:block">
                {channel.description}
              </div>
            </>
          )}

          {/* Mobile buttons */}
          <div className="ml-auto flex items-center md:hidden">
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.HashtagWithSpeechBubble className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.People className="mx-2 h-6 w-6" />
            </button>
          </div>
          {/* Desktop buttons */}
          <div className="ml-auto hidden items-center md:flex">
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
        {/* Messages */}
        <div className="scrollbar flex-1 overflow-y-scroll">
          {selectedChannelMessages
            ?.sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((message, i) => (
              <div key={message.id}>
                {i === 0 || message.user !== selectedChannelMessages[i - 1].user ? (
                  <MessageWithUser message={message} />
                ) : (
                  <Message message={message} />
                )}
              </div>
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

function MessageWithUser({ message }) {
  return (
    <div className="hover:bg-gray-950/[0.07] mt-[17px] flex py-0.5 px-4 leading-[1.375rem] transition-all">
      <img className="mr-4 mt-0.5 h-10 w-10 rounded-full" src={message.avatarUrl} alt={message.user} />
      <div>
        <p className="flex items-baseline">
          <span className="mr-2 font-medium text-green-400">{message.user}</span>
          <span className="text-xs font-medium text-gray-400">{message.date}</span>
        </p>
        <p className="text-gray-100">{message.text}</p>
      </div>
    </div>
  )
}

function Message({ message }) {
  return (
    <div className="hover:bg-gray-950/[0.07] mr-14 py-0.5 pl-4 leading-[1.375rem] transition-all">
      <p className="pl-14 text-gray-100">{message.text}</p>
    </div>
  )
}
