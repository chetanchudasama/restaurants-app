import { EarlyUsersBoxWrapper, BenefitsSkims } from "./styled";

const EarlyUsers = (props) => {
  return (
    <EarlyUsersBoxWrapper>
      {/* <div className="BenefitsSkimsTitle">
        <p>Pricing Strategy</p>
      </div>
      <BenefitsSkims>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>
            Our top 8 chefs are introducing their toothsome menus with the
            'First Come-Buy Best' deals for Early Access Users just like you.
          </p>
        </div>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>
            The chefs are at high availability now. With the shooting demand,
            our chefs will get busier, leading to a surge in the dish price.
          </p>
        </div>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>
            Cuirato considers chef's availability as the key commodity factoring
            in the pricing strategy.
            <br />
            Start Prebooking Now because now is the best time!
          </p>
        </div>
      </BenefitsSkims> */}
      <div className="BenefitsSkimsTitle">
        <p>
          Early user benefits
          {/* {props.notLoggedIn
            ? "Privileges after Sign up:"
            : "A token of thanks to all you lovely Early Users from Team Cuirato."} */}
        </p>
      </div>
      <BenefitsSkims>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>Access the first 8 chefs before everyone else.</p>
        </div>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>Explore menus of up to 4 chefs of your choice.</p>
        </div>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>Check discounted dish prices of up to 10 dishes.</p>
        </div>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>Pre-order up to 2 dishes.</p>
        </div>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>Discounts range from 40-99% depending on the popularity of the chef and dish.</p>
        </div>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>
            Get your own referral code. For every friend you refer, you get to:
          </p>
        </div>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>
            Pre-order 1 more dish. <br />
            Explore menu of 1 more chef. <br />
            Check discounted prices of up to 5 more dishes.
          </p>
        </div>
      </BenefitsSkims>
      {/* <div className="BenefitsSkimsTitle">
        <p>Privileges without signup:</p>
      </div>
      <BenefitsSkims>
        <div className="SkimItem">
          <img src="./images/true.png" alt="" />
          <p>Explore the menu of up to 2 Chefs.</p>
        </div>
      </BenefitsSkims> */}
    </EarlyUsersBoxWrapper>
  );
};

export default EarlyUsers;
