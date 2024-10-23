"use client"
import { Carrousel } from "@/components/carrousel";
import { HeroSection } from "@/components/HeroSection";
import  Header  from "@/components/Header";


export default function Home() {

	return (
		<>
			<Header/>
			<HeroSection/>
      <Carrousel />
		</>
	)

}
