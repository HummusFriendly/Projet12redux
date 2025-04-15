import chatIcon from "../assets/icon-chat.png";
import moneyIcon from "../assets/icon-money.png";
import securityIcon from "../assets/icon-security.png";

interface Feature {
  img: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    img: chatIcon,
    title: "You are our #1 priority",
    description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
  },
  {
    img: moneyIcon,
    title: "More savings means higher rates",
    description: "The more you save with us, the higher your interest rate will be!"
  },
  {
    img: securityIcon,
    title: "Security you can trust",
    description: "We use top of the line encryption to make sure your data and money is always safe."
  }
];

const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {features.map((feature, index) => (
        <div className="feature-item" key={index}>
          <img src={feature.img} alt={feature.title} className="feature-icon" />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;