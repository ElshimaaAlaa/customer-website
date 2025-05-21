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
        <h1 className="text-3xl font-bold mb-4">About us</h1>
        <p className="text-14 font-light w-96 leading-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem
          ipsum dolor
        </p>
      </div>
      <div className="py-10 px-20 flex flex-col items-center">
        <p className="text-gray-400 text-13 leading-8 w-900">
          Vertex is a software development team that focuses on helping your
          business with mobile and web technology.We tried our best to delivery
          quality product on time according requirements and exceptions. We are
          technology oriented team so before we code, we analyze for your
          requirements and brain storm then start for development. We promise
          client and trying our best to deliver awesome product package. Thanks
          for reaching out to us. We are happy to listen your world and enjoy to
          solve the problem using technology.
        </p>
        <div className="flex mt-5 gap-6">
          <div className="flex flex-col items-center gap-3 border-1 border-gray-200 rounded-xl py-5 px-10">
            <AboutInspire className="mt-5" />
            <h3 className="font-bold text-15">Global Inspiration</h3>
            <p className="text-gray-400 text-12 text-center w-52">
              Influenced by global trends, we bring you a diverse and dynamic
              collection.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 border-1 border-gray-200 rounded-xl py-5 px-10">
            <About2 className="mt-5" />
            <h3 className="font-bold text-15">Empowering Your Style</h3>
            <p className="text-gray-400 text-12 text-center w-52">
              Beyond clothing, Klothink is a lifestyle. Join us on a journey of
              self-expression.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 border-1 border-gray-200 rounded-xl py-5 px-10">
            <About3 className="mt-5" />
            <h3 className="font-bold text-15">Passionate Craftsmanship</h3>
            <p className="text-gray-400 text-12 text-center w-52">
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