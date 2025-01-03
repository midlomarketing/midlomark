import { addVideo } from '../../Schema'
import { Individual } from '../../Schema/Container'
import {VideoType} from "@/app/(app)/components/Media/Media/types";

export async function VideoObject({
  video,
  className
}: {
  video: VideoType
  className?: string
}) {
  const videoSchema = async () => addVideo(video)
  return (
    <div className={className}>
      <Individual schema={await videoSchema()} />
      <iframe
        src={`https://www.youtube.com/embed/${video.video.split('https://youtu.be/')[1]}`}
        title={`${video.videoName}`}
        width="100%"
        height="100%"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      ></iframe>
    </div>
  )
}
