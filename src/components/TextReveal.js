'use client'
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

export const TextReveal = () => {
    const [lettersRef, setlettersRef] = useArrayRef();
    const triggerRef = useRef(null)
    


    function useArrayRef() {
        const lettersRef = useRef([]);
        lettersRef.current = [];
        return [lettersRef, (ref) => ref && lettersRef.current.push(ref)];
    }

    gsap.registerPlugin(ScrollTrigger)
    const text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut."

    useGSAP(()=>{
        const anim = gsap.to(
            lettersRef.current,
            {
                scrollTrigger: {
                    trigger: triggerRef.current,
                    scrub: true,
                    start: "top center",
                    end: "bottom 85%",
                    markers: true,

                },
                color: "#2A2A2A",
                duration: 5,
                stagger: 1,

            }
        )

        return () => {
            anim.kill()
        }
    })
    
    return (
        <>
            <section className="flex flex-col items-center justify-center w-full h-screen">
                section 1
            </section>
            <section className="flex flex-col items-center justify-center w-full h-screen">
                section 2
            </section>
            <section className="flex flex-col items-center justify-center w-full h-[200vh] p-[5%]">
                <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-xl">
                    <div 
                        className="w-1/2"
                        ref={triggerRef}
                    >
                        {
                            text.split("").map((letter, index) => (
                                <span 
                                    key={index} 
                                    // className="text-reveal text-8xl text-[#2A2A2A] font-extrabold"
                                    className="text-8xl  font-extrabold text-reveal"
                                    ref={setlettersRef}
                                >
                                    {letter}
                                </span>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center w-full h-screen">
                section 2
            </section>
        </>
    )
}
