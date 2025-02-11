"use client"
import Header from "../../../app/(app)/components/CustomHeader";
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import {useEffect} from "react";
import {TableOfContentsProps} from "@/payload-types";
import {RichText} from "@/app/(app)/components/RichText";

type Props = TableOfContentsProps

export function TableOfContents(props: Props) {

  const { active,
    headerSection,
    numberedList,
    tableOfContents,
  } = props

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        window.scrollTo({
          top: document.querySelector(this.getAttribute('href')).offsetTop,
          behavior: 'smooth'
        })
      })
    })
  }, [])

  if (active) {
        return <SectionContainer>
            <ContentContainer className={classes.tocContainer}>
                <div>
                    <Header {...headerSection} />
                    {numberedList ? <ol className={classes.linkContainer}>
                        {tableOfContents?.map(content => (
                            <li key={content.id} className={classes.link}>
                                <a rel={`noreferrer noopener`} className={classes.linkText} href={`#${content.anchor}`}>
                                  {content.headerText && <RichText data={content.headerText}/>}
                                </a>
                            </li>
                        ))}
                    </ol> : <ul className={classes.linkContainer}>
                        {tableOfContents?.map(content => (
                            <li key={content.id} className={classes.link}>
                                <a rel={`noreferrer noopener`} className={classes.linkText} href={`#${content.anchor}`}>
                                    {content.headerText && <RichText data={content.headerText}/>}
                                </a>
                            </li>
                        ))}
                    </ul>}
                </div>
            </ContentContainer>
        </SectionContainer>
    }
}
