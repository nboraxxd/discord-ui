import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { data } from '/data'
import { Discord } from '/components/icons'
import '/styles/globals.css'
import '/styles/font.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Discord UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen text-gray-100">
        <div className="hidden space-y-2 overflow-y-scroll bg-gray-900 p-3 scrollbar-hide sm:block">
          <NavLink href="/">
            <Discord className="h-5 w-7" />
          </NavLink>

          <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />

          {data.map((item) => {
            return (
              <NavLink
                key={item.id}
                href={`/servers/${item.slug}/channels/${item.categories[0].channels[0].label}`}
                active={router.query.sid === item.slug}
              >
                <img src={`/servers/${item.img}`} alt={`${item.label} server`} />
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
