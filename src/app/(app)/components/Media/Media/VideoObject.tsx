import { addVideo } from '../../Schema'
import { Schema } from '../../Schema/Container'
import {VideoProps} from "@/payload-types";

type Props = VideoProps & {className?: string}

export async function VideoObject(props: Props) {

  const {
    video,
    videoName,
    className
  } = props

  const videoSchema = async () => addVideo({...props})
  return (
    <div className={className}>
      <Schema schema={await videoSchema()} />
      <iframe
        src={`https://www.youtube.com/embed/${video?.split('https://youtu.be/')[1]}`}
        title={`${videoName}`}
        width="100%"
        height="100%"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      ></iframe>
    </div>
  )
}
