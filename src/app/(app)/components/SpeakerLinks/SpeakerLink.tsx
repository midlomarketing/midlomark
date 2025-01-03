import classes from './index.module.scss'
import { User } from '@/payload-types'
import Link from 'next/link'

export function SpeakerLink({
  speaker,
  activeLinks,
}: {
  speaker?: User
  activeLinks?: boolean
}) {
  return activeLinks ? (
    <Link href={`/speakers/${speaker?.name}`} className={classes.nameLinks}>
      {speaker?.name}
    </Link>
  ) : (
    <p className={classes.names}>{speaker?.name}</p>
  )
}
