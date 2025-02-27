import SocialIcons from '../SocialIcons'
import {GlobalSetting, SocialLinksProps} from "@/payload-types";
import classes from './index.module.scss'

type Props = SocialLinksProps
  & { header?: boolean, className?: string }

export default async function SocialSection({socialLinks, className, header = true}: {
  socialLinks: SocialLinksProps,
  className?: string,
  header?: boolean
}) {


  return (
    <div
      className={className}
    >
      {header ?
        <><p className={classes.header}>Connect with us on social media.</p>
          <div>
            {socialLinks?.map((channel) => (
              <SocialIcons key={channel.id} channel={channel}/>
            ))}
          </div>
        </> : socialLinks?.map((channel) => (
          <SocialIcons key={channel.id} channel={channel}/>
        ))
      }

    </div>
  )
}
