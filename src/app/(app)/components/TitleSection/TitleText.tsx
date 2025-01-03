import classes from './index.module.scss'

export function TitleText({ title }: { title: string }) {
  return <h1 className={`text-highlight mb1 ${classes.title}`}>{title}</h1>
}
