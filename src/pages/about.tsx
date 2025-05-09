import { AppPage } from "@/layouts/types";
import Image from "next/image";
import ViliyoLogoBig from "../../public/img/ViliyoLogoBig.svg";
import { BackNavigation, YouTubeFrame } from "@/components/shared";


const AboutPage: AppPage = () => {
  return (
    <>
      <BackNavigation title="About Viliyo" />
      <div className="grid grid-cols-2 gap-2 bg-app-blue text-white  rounded-xl mobile:grid-cols-1 mobile:py-8">
        {/* header Card */}
        <div className="col-span-1 rounded-lg flex place-content-center ">
          <Image
            alt="ViliyoLogo"
            src={ViliyoLogoBig}
            width={300}
            height={160}
          />
        </div>
        <div className="text-[14px] p-8 col-span-1 text-justify">
          Breaking down geographic and social barriers to make education
          accessible to all. We are leveraging cutting-edge technology for an
          immersive learning experience. World-class educators and mentors
          guiding your learning journey. Tailored curriculum that adapts to your
          pace and preferences. A vibrant online community for shared insights
          and collaborative projects. Viliyo's vision is to redefine education
          and unlocking limitless potential.
        </div>
      </div>
      {/* Main section with youtube frame and  */}
      <div className="grid grid-cols-2 gap-4 mobile:grid mobile:grid-cols-1 tablet:grid tablet:grid-cols-1 mt-2">
        <div className="flex justify-center w-full h-96 mobile:h-72 tablet:h-30rem">
          <YouTubeFrame />
        </div>
        <div className="flex flex-col justify-stretch items-center mobile:mt-2 w-full ">
          <p className="text-zinc-600 text-[20px] font-bold mobile:text-center">
            Introducing Viliyo - the next big disruptor in online training and
            teaching
          </p>
          <p className="text-app-blue text-[12px] text-justify mt-2">
            Welcome to Viliyo, where innovation meets education to usher in a
            new era of online training and teaching. We are the trailblazers,
            the visionaries, and the architects of a revolution in learning. Say
            goodbye to the ordinary and embrace the extraordinary with Viliyo.
            In a world that is constantly evolving, traditional education is no
            longer enough to keep pace with the ever-changing demands of our
            time. That's where Viliyo comes in, with a mission to empower both
            learners and educators by providing a cutting-edge platform that
            redefines how knowledge is shared, acquired, and applied.
          </p>
          <p className="text-app-blue text-[12px] text-justify mt-2">
            <b>Unparalleled Accessibility:</b> We believe that knowledge should
            be accessible to everyone, regardless of their location, background,
            or circumstances. With Viliyo, education knows no boundaries. Our
            platform opens doors to learners from all corners of the globe,
            offering a diverse and inclusive community of passionate individuals
            eager to learn and teach.
          </p>
          <p className="text-app-blue text-[12px] text-justify mt-2">
            <b>Innovative Technology:</b> We harness the power of the latest
            technologies to create an immersive and engaging learning
            experience. From virtual classrooms to interactive simulations, our
            platform brings education to life in ways you've never imagined. Our
            commitment to staying at the forefront of technological advancements
            ensures that you'll always have access to cutting-edge tools and
            resources, empowering you to thrive in a rapidly evolving digital
            landscape.
          </p>
        </div>
        <div className="hidden mobile:flex text-app-blue text-[12px] text-justify mt-2 tablet:col-span-1 mobile:col-span-1">
          <p>
            <b>What sets Viliyo apart?</b>
            <br></br>Unparalleled Accessibility: We believe that knowledge
            should be accessible to everyone, regardless of their location,
            background, or circumstances. With Viliyo, education knows no
            boundaries. Our platform opens doors to learners from all corners of
            the globe, offering a diverse and inclusive community of passionate
            individuals eager to learn and teach. Innovative Technology: We
            harness the power of the latest technologies to create an immersive
            and engaging learning experience. From virtual classrooms to
            interactive simulations, our platform brings education to life in
            ways you've never imagined. Expert Instructors: At Viliyo, we're
            proud to have a network of world-class instructors and mentors who
            are experts in their fields. Whether you're looking to enhance your
            professional skills or explore a new hobby, our educators are here
            to guide you on your learning journey. Personalized Learning: No two
            learners are alike, which is why we tailor our approach to suit your
            unique needs. Viliyo's adaptive learning algorithms ensure that you
            receive a personalized curriculum that adapts to your pace and
            preferences. Community and Collaboration: Learning is not just a
            solo endeavor; it's a collaborative journey. Connect with
            like-minded learners, share insights, and collaborate on projects
            through our vibrant online community. Together, we foster an
            environment of support, creativity, and growth. The Future of
            Learning: Viliyo isn't just a platform; it's a vision for the future
            of learning. We're not content with the status quo, and neither
            should you be. Join us as we redefine education and unlock the
            limitless potential within each and every one of us. Are you ready
            to embark on a transformative educational journey with Viliyo? The
            future of online training and teaching is here, and it starts with
            you. Embrace the disruptor, embrace Viliyo. Your adventure in
            knowledge awaits.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
AboutPage.Layout = "Admin";
