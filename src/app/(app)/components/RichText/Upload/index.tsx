import { Media } from '../../Media'

export const RichTextUpload = (props: { node: { fields?: any; value?: any }; className?: any }) => {
  const {
    node: { fields, value },
    className,
  } = props

  const styles = {}

  return (
    <div style={styles} className={className}>
      <div>
        <Media resource={value} />
      </div>
    </div>
  )
}

export default RichTextUpload
