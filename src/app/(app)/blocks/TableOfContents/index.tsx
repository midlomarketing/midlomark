"use client"
import Header, {HeaderType} from "../../components/CustomHeader";
import {SerializeLexical} from "../../components/RichText/Lexical";
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {RichTextType} from "@/app/(app)/utils/types";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import {useEffect} from "react";

export default function TableOfContents({active, headerSection, tableOfContents, numberedList}: {
    active?: boolean,
    headerSection: HeaderType
    numberedList?: boolean
    tableOfContents: {
        anchor: string
        headerText: RichTextType
        id: string
    }[]
}) {

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
                        {tableOfContents.map(content => (
                            <li key={content.id} className={classes.link}>
                                <a rel={`noreferrer noopener`} className={classes.linkText} href={`#${content.anchor}`}>
                                    <SerializeLexical nodes={content.headerText.root.children}/>
                                </a>
                            </li>
                        ))}
                    </ol> : <ul className={classes.linkContainer}>
                        {tableOfContents.map(content => (
                            <li key={content.id} className={classes.link}>
                                <a rel={`noreferrer noopener`} className={classes.linkText} href={`#${content.anchor}`}>
                                    <SerializeLexical nodes={content.headerText.root.children}/>
                                </a>
                            </li>
                        ))}
                    </ul>}
                </div>
            </ContentContainer>
        </SectionContainer>
    }
}
