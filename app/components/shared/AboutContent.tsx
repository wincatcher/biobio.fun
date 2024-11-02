"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { Education } from "../Education";
import { iconType, educationType } from "@/app/types";
import { educationList, techonologyIconList, whoAmIData } from "@/app/utils";
import aboutAnimation from "../../utils/aboutSectionAnimations";
import IconComponent from "../ui/IconComponent";

const { fullName, profession, whoAmI, quote } = whoAmIData;

interface AboutContentProps {
  variant?: 'page' | 'tab';
}

export const AboutContent = ({ variant = 'page' }: AboutContentProps) => {
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (mq.matches) {
      aboutAnimation.whoAmIAnimation();
      aboutAnimation.professionAnimation();
      aboutAnimation.quoteAnimation();
      aboutAnimation.techonologyIconListAnimation();
      aboutAnimation.verticalImageAnimation();
      aboutAnimation.educationContentAnimation();
    } else {
      aboutAnimation.mobileAnimation();
    }
  }, []);

  return (
    <div className="grid grid-rows-8 grid-cols-4 lg:grid-cols-3 gap-5">
      <Card className="col-span-full lg:row-start-2 lg:row-span-2 lg:col-start-2 lg:col-span-1">
        <CardBody className="flex-col items-center justify-center gap-2">
          <Avatar
            name="LM"
            src={variant === 'page' ? "https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?q=80&w=3737&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : "/avatar/avatartion.png"}
            className="w-24 h-24 text-large brightness-90"
          />
          <h1 className="text-3xl ">{fullName}</h1>
        </CardBody>
      </Card>

      <Card className="col-span-full lg:row-start-1 lg:row-span-1 lg:col-span-2  opacity-0 mobile-animation whoAmICard">
        <CardBody className="gap-2">
          <div className="text-2xl ">我是谁？</div>
          <div className="text-lg text-gray-400">{whoAmI} </div>
        </CardBody>
      </Card>

      <Card className="col-span-full row-start-2 row-end-3 lg:row-start-2 lg:col-start-1 lg:col-span-1 bg-blue opacity-0 mobile-animation professionCard">
        <CardBody className="justify-center items-center">
          <h2 className="text-2xl lg:text-2xl   text-center">
            {profession}
          </h2>
        </CardBody>
      </Card>

      <Card className="hidden lg:flex col-span-2 lg:row-start-3 lg:row-span-1 lg:col-start-3 lg:col-span-1 bg-blue opacity-0 mobile-animation quoteCard">
        <CardBody className="justify-center items-center lg:row-start-2 lg:cols-start-4">
          <div className="text-2xl  text-center">
            &#34;{quote}&#34;
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-full lg:row-start-3 lg:row-span-2 lg:col-start-1 lg:col-span-1 opacity-0 mobile-animation technologyIconList">
        <CardBody className="gap-4">
          <h2 className="text-2xl ">
            用到的技术
          </h2>

          <div className="flex flex-wrap justify-center lg:justify-center gap-x-10 gap-y-6">
            {techonologyIconList.map(({ name, icon }: iconType) => (
              <Tooltip
                key={`technology-item-${name}`}
                content={name}
              >
                <IconComponent icon={icon} />
              </Tooltip>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="hidden lg:block lg:row-start-1 lg:row-span-2 lg:col-start-3  lg:h-[350px] rounded-xl relative opacity-0 mobile-animation verticalImage">
        <Image
          src="https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?q=80&w=1576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          priority={true}
          alt="profile image"
          fill
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      </div>

      <Card className="col-span-full lg:row-start-4 lg:row-span-1 lg:col-start-2 lg:col-span-2 opacity-0 mobile-animation educationContent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hidden lg:block icon icon-tabler icon-tabler-timeline absolute top-0 -right-7"
          width="200"
          height="200"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#232323"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          ></path>
          <path d="M4 16l6 -7l5 5l5 -6"></path>
          <path d="M15 14m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M10 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M4 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M20 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        </svg>
        <CardBody className="gap-2 flex-wrap">
          <h2 className="text-2xl  ">教育</h2>

          <div className="flex flex-col lg:flex-col gap-2">
            {educationList.map((education: educationType) => (
              <Education
                key={`education-item-${education.career}`}
                career={education.career}
                years={education.years}
                description={education.description}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};