import Paragraph from "@components/elements/paragraph/Paragraph";

const SocialNetwork = () => {
  return (
    <section className="flex w-full items-center justify-evenly gap-5">
      <div className="flex flex-col">
        <img src="assets/social/github.svg" className="h-15 w-15" />
        <Paragraph>rhAlves42</Paragraph>
      </div>
      <div className="flex flex-col">
        <img src="assets/social/linkedin.svg" className="h-15 w-15" />
        <Paragraph>ricardohenri</Paragraph>
      </div>
    </section>
  );
};

export default SocialNetwork;
