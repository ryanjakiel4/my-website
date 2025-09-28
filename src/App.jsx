import styled from "styled-components";
import { Element } from 'react-scroll';

import Autotype from "./components/Autotype";
import FadeInSection from "./components/FadeInSection";
import NavigationBar from "./components/NavigationBar";
import ContactBar from "./components/ContactBar";
import GameMenu from "./components/GameMenu";

/*
Main js file for the website, additional comments can be found in the component files.
*/

function App() {
  return (
    <Background.Wrapper>
      <NavigationBar />
      <Section.Wrapper>
        <Section.Header name="home">
          <Autotype />
        </Section.Header>
        <FadeInSection>
          <Section.Content>
            Hi!  My name is Ryan.  I am a Christian, a husband, a software developer, a board game enthusiast, and an ice cream aficionado.
            My hometown is Haymarket, Virginia (near DC).  I graduated from Virginia Tech with a Computer Science degree in 2019.  From there,
            God blessed me with internship opportunities at Amazon in Seattle and Facebook in Menlo Park.  For 4 years post-college,
            I worked for AWS as a Back-End Developer metering EC2 instance usage globally.  Now I'm tinkering with React and brushing up on
            my Front-End development.
          </Section.Content>
        </FadeInSection>
        <Section.Header name="about">
          About Me
        </Section.Header>
        <FadeInSection>
          <Section.Content>
            <Section.Left>
              <Image.AboutMe src="/src/resources/AllisonandI.jpg" />
            </Section.Left>
            <Section.Right>
              My wife, Allison, and I moved to Birmingham, Alabama in June of 2023 while she attends Christ Health Center's family medicine residency
              program.  We met in college as Bible study leaders in the same campus ministry, Chi Alpha.  We were married on July 2nd, 2022
              and have been loving life together!

              This past year, we've had the opportunity to travel and stay for extended periods in Maine, Virginia, Alabama, South Carolina,
              Oklahoma, Spain, and Italy.  Safe to say it feels nice to be settled and building community in Birmingham.

              Aside from board games and ice cream, I enjoy playing sports, especially ultimate frisbee, disc golf, and regular golf.  Allison and I
              like running, hiking, and exploring landmarks in our community.  Cooking is a fun hobby we share, and since we've moved we've begun
              making our own ice cream. (Yes, it's delicious!)
            </Section.Right>
          </Section.Content>
        </FadeInSection>
        <Section.Header name="projects">
          Projects
        </Section.Header>
        <FadeInSection>
          <Section.ContentReverse>
            <Section.Left>
              I worked for AWS as a Back-End Engineer responsible for tracking the network usage for all EC2 instances globally and linking
              the traffic to specific user accounts.  I collaborated directly with the VPC Flow Logs team, a customer-facing service on the AWS console,
              and with the teams handling AWS Billing.  Our service processed about 3PB of network packets per day, and that number increased in step
              with growing EC2 usage.  As a challenging, big-data problem requiring a distributed, scalable service running reliably 24/7,
              thorough integration and end-to-end testing were essential.  I acquired experience designing and documenting integration testing for both
              functionality and efficiency.  One notable project I led implemented a feature to process network packets per-packet rather than per-batch,
              ensuring packets were processed once and only once using a distributed cache and DDB table to maintain state across all EC2 instances.
              This was a necessary improvement because our service enriches network packets with metadata from dependency teams, however, one of our
              dependencies was frequently late in providing its metadata for some individual packets, previously causing the whole batch to timeout
              and be put into a retry queue. The project was a success, delivering network packets that would have previously been in failed batches
              15 minutes faster to VPC Flow Logs, allowing customers, including the Security & Abuse teams, to view their complete flows earlier.
              With less packets waiting in the retry queue, our retry fleet ran more efficiently, and the additional resource usage from the
              distributed cache and DDB storage was negligible relative to our prior levels of usage.  The feature has been running in production
              for 18 months without any operational issues.
            </Section.Left>
            <Section.Right>
              <Image.AWS src="/src/resources/aws.jpg" />
            </Section.Right>
          </Section.ContentReverse>
        </FadeInSection>
        <FadeInSection>
          <Section.Content>
            <Section.Left>
              <Image.Fblite src="/src/resources/Fblite.jpg" />
            </Section.Left>
            <Section.Right>
              During my internship at Facebook, I worked as a front-end developer and implemented the settings menu for Facebook Lite Stories,
              as well as both the functionality and style of Stories’ Reactions and other parts of the Stories’ UI.  I really enjoyed having the
              opportunity to work with the designer to create the best user experience possible, and seeing the direct user impact of my code commits.
              For this project I programmed with Typescript, Javascript, Hack (PHP), and CSS.
            </Section.Right>
          </Section.Content>
        </FadeInSection>
        <FadeInSection>
          <Section.ContentReverse>
            <Section.Left>
              For my Human Computer Interaction Capstone project, I worked on a team with an Interior Design professor
              to build and program a large piece of tree bark with over 1000 led's with weather animations to be a
              display piece.  It gathered real-time weather data using a Python script running on a Raspberry Pi and displayed
              different animations based on the current weather.  Our project won 1st place (out of 40) for best CS senior
              capstone project at the Virginia Tech Undergraduate Research in Computer Science (VTURCS).
            </Section.Left>
            <Section.Right>
              <Image.Barklight src="/src/resources/Barklight.jpg" />
            </Section.Right>
          </Section.ContentReverse>
        </FadeInSection>
        <FadeInSection>
          <Section.Content>
            <Section.Left>
              <Image.Myo src="/src/resources/Myo.jpg" />
            </Section.Left>
            <Section.Right>
              I had the opportunity to take several advanced CS courses in high school, including Artificial
              Intelligence, Machine Learning, Web App Development, and Mobile App Development.  In my senior year, as part
              of the Computer Systems Research Lab, I wrote a Java program to translate sign language gestures
              into text using a beta device called the Myo Armband.  The armband detects  electro-Myographic (EMG) muscle
              pulses in the arm with 8 different sensors on the armband worn around the bicep.  My application
              received data from the armband via bluetooth and translated the gestures in real time using a
              pattern-recognition training method.
            </Section.Right>
          </Section.Content>
        </FadeInSection>
        <Section.Header name="resume">
          Resume & Contact
        </Section.Header>
        <Section.Content>
          <ContactBar />
        </Section.Content>
        <Section.Header name="games">
          Games
        </Section.Header>
        <Section.Content>
          <GameMenu />
        </Section.Content>
      </Section.Wrapper>
    </Background.Wrapper>
  );
}

const Background = {
  Wrapper: styled.div`
    background-image: linear-gradient(rgba(0,0,200,0), rgba(0,100,225,.1), rgba(0,0,200,0), rgba(100,200,250,.1));
    `
}

const Section = {
  Header: styled(Element)`
    font-size: 40px;
    padding-top: 5px;
    padding-bottom: 10px;
    color: rgb(0,0,128);
  `,
  Content: styled.div`
  @media only screen and (max-width: 42em) {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: column wrap
  }
    display: flex;
    justify-content: center; /* Align horizontal */
    align-items: center; /* Align vertical */
    font-size: 20px;
    padding-bottom: 30px;
  `,
  ContentReverse: styled.div`
  @media only screen and (max-width: 42em) {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: column wrap
  }
    display: flex;
    justify-content: center; /* Align horizontal */
    align-items: center; /* Align vertical */
    font-size: 20px;
    padding-bottom: 30px;
  `,
  Left: styled.div`
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    @media only screen and (min-width: 42em) {
      flex: 1;
    }
  `,
  Right: styled.div`
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    @media only screen and (min-width: 42em) {
      flex: 1;
    }
  `,
  Wrapper: styled.div`
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    max-width: 1000px;
    margin: 0 auto !important; 
  `
}

const Image = {
  AboutMe: styled.img`
    max-width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `,
  AWS: styled.img`
    max-width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `,
  Fblite: styled.img`
    max-width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `,
  Barklight: styled.img`
    max-width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `,
  Myo: styled.img`
    max-width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `
}

export default App;
