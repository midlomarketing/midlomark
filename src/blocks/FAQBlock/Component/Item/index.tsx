"use client"
import {SerializeLexical} from "@/app/(app)/components/RichText/Lexical";
import {useRef, useState} from "react";
import classes from './index.module.scss'
import {RichTextType} from "@/app/(app)/utils/types";
import {FAQArrayProps} from "@/payload-types";
import {RichText} from "@/app/(app)/components/RichText";

type Props = NonNullable<FAQArrayProps>[number]

export function FAQItem(props: Props) {

  const {question, answer} = props


    const inputEl = useRef(null);
    const [clicked, setClicked] = useState(false);
    const [height, setHeight] = useState(0);

    const handleClick = () => {
        setClicked((current) => !current)
        // @ts-ignore
        setHeight(!clicked ? inputEl.current.offsetHeight + 20 : 0);
    }

    return <div>
        <div onClick={handleClick} className={classes.questionContainer}>
            <div>
              {question && <RichText data={question}/>}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 className={`bi bi-chevron-compact-up ${clicked ? classes.arrowUp : classes.arrowDown}`} viewBox="0 0 16 16">
                <path fillRule="evenodd"
                      d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z"/>
            </svg>
        </div>
        <div className={`${clicked ? classes.answerContainerClicked : null} ${classes.answerContainer}`} style={{
            height: `${height}px`,
            minHeight: `${height}px`,
            maxHeight: `${height}px`,
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
        }}>
            <div ref={inputEl} style={{
                opacity: clicked ? `1` : `0`,
                transition: 'all 0.5s',
                transitionDelay: 'all 0.1s'
            }}>
              {answer && <RichText data={answer}/>}
            </div>
        </div>
    </div>
}
