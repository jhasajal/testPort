import React, { useRef } from 'react'
import styles from './style.module.scss';
import { useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import Link from 'next/link'

interface Project {
    title: string;
    speed: number;
    i: number;
}

interface IndexProps {
    data: Project[];
    setSelectedProject: (i: number | null) => void;
}

export default function index({ data, setSelectedProject }: IndexProps) {
    return (
        <div className={styles.titles}>
            {
                data.map((project, i) => {
                    return <Title key={i} data={{ ...project, i }} setSelectedProject={setSelectedProject} />
                })
            }
        </div>
    )
}

function Title({ data, setSelectedProject }: { data: Project, setSelectedProject: (i: number | null) => void }) {

    const { title, speed, i } = data;
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', `${25 / speed}vw end`]
    })

    const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;

    return (
        <div ref={container} className={styles.title}>
            <div
                className={styles.wrapper}
                onMouseOver={() => { setSelectedProject(i) }}
                onMouseLeave={() => { setSelectedProject(null) }}
            >

                {/* <motion.p style={{clipPath: clip}}>
                  
                </motion.p> */}
                {/* <HoverCard>
                    <HoverCardTrigger>
                        <Link href={`/projects`}>
                            <p>
                                {title}
                            </p>
                        </Link>
                    </HoverCardTrigger>
                        <HoverCardContent className="HoverCardContent z-[999]" sideOffset={5}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                               
                                <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                                    <div>
                                        <div className="Text bold">Radix</div>
                                        <div className="Text faded">@radix_ui</div>
                                    </div>
                                    <div className="Text">
                                        Components, icons, colors, and templates for building
                                        high-quality, accessible UI. Free and open-source.
                                    </div>
                                    <div style={{ display: "flex", gap: 15 }}>
                                        <div style={{ display: "flex", gap: 5 }}>
                                            <div className="Text bold">0</div>{" "}
                                            <div className="Text faded">Following</div>
                                        </div>
                                        <div style={{ display: "flex", gap: 5 }}>
                                            <div className="Text bold">2,900</div>{" "}
                                            <div className="Text faded">Followers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <HoverCardArrow className="HoverCardArrow" />
                        </HoverCardContent>
                    </HoverCard> */}
                    <Link href={`/projects`}>
                            <p>
                                {title}
                            </p>
                        </Link>
            </div>
        </div>
    )
}