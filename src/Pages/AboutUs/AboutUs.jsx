import { Helmet } from "react-helmet";
import "./aboutusStyle.scss";
import AboutInspire from "../../Svgs/about1";
import About2 from "../../Svgs/about2";
import About3 from "../../Svgs/about3";
function AboutUs() {
  return (
    <section className="bg-white pb-10">
      <Helmet>
        <title>About Us | VERTEX</title>
      </Helmet>
      <div className="aboutHeader w-full h-[65vh] flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl font-bold mb-4">About us</h1>
        <p className="text-15 font-light leading-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do
          Lorem ipsum dolor
        </p>
      </div>
      <div className="py-10 px-5 md:px-10 lg:px-20 flex flex-col items-center">
        <p className="text-gray-400 text-15 leading-8 w-full">
          Vertex is a software development team that focuses on helping your
          business with mobile and web technology.We tried our best to delivery
          quality product on time according requirements and exceptions. We are
          technology oriented team so before we code, we analyze for your
          requirements and brain storm then start for development. We promise
          client and trying our best to deliver awesome product package. Thanks
          for reaching out to us. We are happy to listen your world and enjoy to
          solve the problem using technology. Vertex is a software development
          team that focuses on helping your business with mobile and web
          technology.We tried our best to delivery quality product on time
          according requirements and exceptions. We are technology oriented team
          so before we code, we analyze for your requirements and brain storm
          then start for development. We promise client and trying our best to
          deliver awesome product package. Thanks for reaching out to us. We are
          happy to listen your world and enjoy to solve the problem using
          technology.
        </p>
        <div className="flex flex-col gap-4 md:px-20 md:gap-3 lg:gap-6 md:flex-row mt-10 w-full justify-center">
          <div className="flex flex-col items-center bg-gray-50 gap-3 border-1 border-gray-200 rounded-xl py-5 md:px-4 px-10 lg:px-10">
            <AboutInspire className="mt-5" />
            <h3 className="font-bold text-17">Global Inspiration</h3>
            <p className="text-gray-400 text-14 text-center w-52">
              Influenced by global trends, we bring you a diverse and dynamic
              collection.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 gap-4 border-1 border-gray-200 rounded-xl py-5 md:px-4 px-10 lg:px-10">
            <About2 className="mt-5" />
            <h3 className="font-bold text-17">Empowering Your Style</h3>
            <p className="text-gray-400 text-14 text-center w-52">
              Beyond clothing, Klothink is a lifestyle. Join us on a journey of
              self-expression.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 gap-4 border-1 border-gray-200 rounded-xl py-5 md:px-4 px-10 lg:px-10">
            <About3 className="mt-5" />
            <h3 className="font-bold text-17 text-center">Passionate Craftsmanship</h3>
            <p className="text-gray-400 text-14 text-center w-52">
              Every garment at Klothink is crafted with passion, reflecting our
              commitment to quality and innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutUs;
