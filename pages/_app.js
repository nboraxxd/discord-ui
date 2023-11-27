import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Discord } from '/components/icons'
import '/styles/globals.css'
import '/styles/font.css'

const servers = [
  { id: '1', img: 'tailwind.png' },
  { id: '2', img: 'next.png' },
  { id: '3', img: 'mirage.png' },
]

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Discord Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen text-gray-100">
        <div className="space-y-2 overflow-y-scroll bg-gray-900 p-3 scrollbar-hide">
          <NavLink href="/">
            <Discord className="h-5 w-7" />
          </NavLink>

          <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />

          {servers.map((item) => {
            const serverName = item.img.split('.')[0]

            return (
              <NavLink
                key={item.id}
                href={`/servers/${serverName}/channels/welcome`}
                active={router.query.sid === serverName}
              >
                <img src={`/servers/${item.img}`} alt={`${serverName} server`} />
              </NavLink>
            )
          })}
        </div>

        <Component {...pageProps} />
      </div>
    </>
  )
}

function NavLink({ href, active, children }) {
  const router = useRouter()
  active ||= router.asPath === href // same: active = active || router.asPath === href

  return (
    <Link href={href}>
      <a className="group relative block">
        <div className="absolute -left-3 flex h-full items-center">
          <div
            className={clsx(
              'w-1 origin-left rounded-r bg-white transition-all duration-200 ',
              { 'h-10 scale-100 opacity-100': active },
              { 'h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100': !active }
            )}
          />
        </div>

        <div className="transition-all duration-75 group-active:translate-y-[2px]">
          <div
            className={clsx(
              'flex h-12 w-12 items-center justify-center overflow-hidden bg-gray-700 transition-all duration-200',
              { 'rounded-2xl bg-brand text-white': active },
              {
                'rounded-3xl text-gray-100 group-hover:rounded-2xl group-hover:bg-brand group-hover:text-white':
                  !active,
              }
            )}
          >
            {children}
          </div>
        </div>
      </a>
    </Link>
  )
}
