import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link, Element, scroller } from 'react-scroll';
import {
    IoMdHome
  } from "react-icons/io";
import {
    IoAlbums,
    IoDocument,
    IoPerson,
    IoFootsteps
  } from "react-icons/io5";


function App() {
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = event => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  return (
    <Background.Wrapper>
    <Styles.Wrapper>
      <CSSReset />

      <Navbar.Wrapper>
        <Navbar.Logo>RJ</Navbar.Logo>

        <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
          <HamburgerButton.Lines />
        </HamburgerButton.Wrapper>

        <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
          <Navbar.Item>
            <Link activeClass="active" to="home" spy={true} smooth={true} duration={500}>
                <Navbar.Link>
                  <Navbar.Icon>
                    <IoMdHome /> 
                  </Navbar.Icon>
                  <Navbar.Text>
                    Home 
                  </Navbar.Text>
                </Navbar.Link>
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link activeClass="active" to="about" spy={true} smooth={true} duration={500}>
              <Navbar.Link>
                <Navbar.Icon>
                  <IoPerson /> 
                </Navbar.Icon>
                <Navbar.Text>
                  About 
                </Navbar.Text>
              </Navbar.Link>
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link activeClass="active" to="projects" spy={true} smooth={true} duration={500}>
              <Navbar.Link>
                <Navbar.Icon>
                  <IoAlbums /> 
                </Navbar.Icon>
                <Navbar.Text>
                  Projects 
                </Navbar.Text>
              </Navbar.Link>
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link activeClass="active" to="resume" spy={true} smooth={true} duration={500}>
              <Navbar.Link>
                <Navbar.Icon>
                  <IoDocument /> 
                </Navbar.Icon>
                <Navbar.Text>
                  Resume 
                </Navbar.Text>
              </Navbar.Link>
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link activeClass="active" to="tutorials" spy={true} smooth={true} duration={500}>
              <Navbar.Link>
                <Navbar.Icon>
                  <IoFootsteps /> 
                </Navbar.Icon>
                <Navbar.Text>
                  Tutorials 
                </Navbar.Text>
              </Navbar.Link>
            </Link>
          </Navbar.Item>
        </Navbar.Items>
      </Navbar.Wrapper>
      </Styles.Wrapper>
      <Navbar.TopSpace></Navbar.TopSpace>
      <Section.Wrapper>
        <Section.Header name="home">
Home
        </Section.Header>
        <Section.Content>
        In the beginning God created the heavens and the earth. 2Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.
3And God said, “Let there be light,” and there was light. 4God saw that the light was good, and he separated the light from the darkness. 5God called the light “day,” and the darkness he called “night.” And there was evening, and there was morning—the first day.
6And God said, “Let there be a vault between the waters to separate water from water.” 7So God made the vault and separated the water under the vault from the water above it. And it was so. 8God called the vault “sky.” And there was evening, and there was morning—the second day.
9And God said, “Let the water under the sky be gathered to one place, and let dry ground appear.” And it was so. 10God called the dry ground “land,” and the gathered waters he called “seas.” And God saw that it was good.
11Then God said, “Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds.” And it was so. 12The land produced vegetation: plants bearing seed according to their kinds and trees bearing fruit with seed in it according to their kinds. And God saw that it was good. 13And there was evening, and there was morning—the third day.
14And God said, “Let there be lights in the vault of the sky to separate the day from the night, and let them serve as signs to mark sacred times, and days and years, 15and let them be lights in the vault of the sky to give light on the earth.” And it was so. 16God made two great lights—the greater light to govern the day and the lesser light to govern the night. He also made the stars. 17God set them in the vault of the sky to give light on the earth, 18to govern the day and the night, and to separate light from darkness. And God saw that it was good. 19And there was evening, and there was morning—the fourth day.
20And God said, “Let the water teem with living creatures, and let birds fly above the earth across the vault of the sky.” 21So God created the great creatures of the sea and every living thing with which the water teems and that moves about in it, according to their kinds, and every winged bird according to its kind. And God saw that it was good. 22God blessed them and said, “Be fruitful and increase in number and fill the water in the seas, and let the birds increase on the earth.” 23And there was evening, and there was morning—the fifth day.
24And God said, “Let the land produce living creatures according to their kinds: the livestock, the creatures that move along the ground, and the wild animals, each according to its kind.” And it was so. 25God made the wild animals according to their kinds, the livestock according to their kinds, and all the creatures that move along the ground according to their kinds. And God saw that it was good.
26Then God said, “Let us make mankind in our image, in our likeness, so that they may rule over the fish in the sea and the birds in the sky, over the livestock and all the wild animals, and over all the creatures that move along the ground.”
27So God created mankind in his own image,
in the image of God he created them;
male and female he created them.
28God blessed them and said to them, “Be fruitful and increase in number; fill the earth and subdue it. Rule over the fish in the sea and the birds in the sky and over every living creature that moves on the ground.”
29Then God said, “I give you every seed-bearing plant on the face of the whole earth and every tree that has fruit with seed in it. They will be yours for food. 30And to all the beasts of the earth and all the birds in the sky and all the creatures that move along the ground—everything that has the breath of life in it—I give every green plant for food.” And it was so.
31God saw all that he had made, and it was very good. And there was evening, and there was morning—the sixth day.
        </Section.Content>
        <Section.Header name="about">
            About
        </Section.Header>
        <Section.Content>
        Blessed is the one
who does not walk in step with the wicked
or stand in the way that sinners take
or sit in the company of mockers,
2but whose delight is in the law of the Lord,
and who meditates on his law day and night.
3That person is like a tree planted by streams of water,
which yields its fruit in season
and whose leaf does not wither—
whatever they do prospers.
4Not so the wicked!
They are like chaff
that the wind blows away.
5Therefore the wicked will not stand in the judgment,
nor sinners in the assembly of the righteous.
6For the Lord watches over the way of the righteous,
but the way of the wicked leads to destruction.
        </Section.Content>
        <Section.Header name="projects">
            Projects
        </Section.Header>
        <Section.Content>
        1This is the genealogy of Jesus the Messiah the son of David, the son of Abraham:
2Abraham was the father of Isaac,
Isaac the father of Jacob,
Jacob the father of Judah and his brothers,
3Judah the father of Perez and Zerah, whose mother was Tamar,
Perez the father of Hezron,
Hezron the father of Ram,
4Ram the father of Amminadab,
Amminadab the father of Nahshon,
Nahshon the father of Salmon,
5Salmon the father of Boaz, whose mother was Rahab,
Boaz the father of Obed, whose mother was Ruth,
Obed the father of Jesse,
6and Jesse the father of King David.
David was the father of Solomon, whose mother had been Uriah’s wife,
7Solomon the father of Rehoboam,
Rehoboam the father of Abijah,
Abijah the father of Asa,
8Asa the father of Jehoshaphat,
Jehoshaphat the father of Jehoram,
Jehoram the father of Uzziah,
9Uzziah the father of Jotham,
Jotham the father of Ahaz,
Ahaz the father of Hezekiah,
10Hezekiah the father of Manasseh,
Manasseh the father of Amon,
Amon the father of Josiah,
11and Josiah the father of Jeconiah and his brothers at the time of the exile to Babylon.
12After the exile to Babylon:
Jeconiah was the father of Shealtiel,
Shealtiel the father of Zerubbabel,
13Zerubbabel the father of Abihud,
Abihud the father of Eliakim,
Eliakim the father of Azor,
14Azor the father of Zadok,
Zadok the father of Akim,
Akim the father of Elihud,
15Elihud the father of Eleazar,
Eleazar the father of Matthan,
Matthan the father of Jacob,
16and Jacob the father of Joseph, the husband of Mary, and Mary was the mother of Jesus who is called the Messiah.
17Thus there were fourteen generations in all from Abraham to David, fourteen from David to the exile to Babylon, and fourteen from the exile to the Messiah.
Joseph Accepts Jesus as His Son
18This is how the birth of Jesus the Messiah came about: His mother Mary was pledged to be married to Joseph, but before they came together, she was found to be pregnant through the Holy Spirit. 19Because Joseph her husband was faithful to the law, and yet did not want to expose her to public disgrace, he had in mind to divorce her quietly.
20But after he had considered this, an angel of the Lord appeared to him in a dream and said, “Joseph son of David, do not be afraid to take Mary home as your wife, because what is conceived in her is from the Holy Spirit. 21She will give birth to a son, and you are to give him the name Jesus, because he will save his people from their sins.”
22All this took place to fulfill what the Lord had said through the prophet: 23“The virgin will conceive and give birth to a son, and they will call him Immanuel” (which means “God with us”).
24When Joseph woke up, he did what the angel of the Lord had commanded him and took Mary home as his wife. 25But he did not consummate their marriage until she gave birth to a son. And he gave him the name Jesus.
        </Section.Content>
        <Section.Header name="resume">
            Resume
        </Section.Header>
        <Section.Content>
        1Paul, a servant of Christ Jesus, called to be an apostle and set apart for the gospel of God— 2the gospel he promised beforehand through his prophets in the Holy Scriptures 3regarding his Son, who as to his earthly life was a descendant of David, 4and who through the Spirit of holiness was appointed the Son of God in power by his resurrection from the dead: Jesus Christ our Lord. 5Through him we received grace and apostleship to call all the Gentiles to the obedience that comes from faith for his name’s sake. 6And you also are among those Gentiles who are called to belong to Jesus Christ.
7To all in Rome who are loved by God and called to be his holy people:
Grace and peace to you from God our Father and from the Lord Jesus Christ.
Paul’s Longing to Visit Rome
8First, I thank my God through Jesus Christ for all of you, because your faith is being reported all over the world. 9God, whom I serve in my spirit in preaching the gospel of his Son, is my witness how constantly I remember you 10in my prayers at all times; and I pray that now at last by God’s will the way may be opened for me to come to you.
11I long to see you so that I may impart to you some spiritual gift to make you strong— 12that is, that you and I may be mutually encouraged by each other’s faith. 13I do not want you to be unaware, brothers and sisters, that I planned many times to come to you (but have been prevented from doing so until now) in order that I might have a harvest among you, just as I have had among the other Gentiles.
14I am obligated both to Greeks and non-Greeks, both to the wise and the foolish. 15That is why I am so eager to preach the gospel also to you who are in Rome.
16For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes: first to the Jew, then to the Gentile. 17For in the gospel the righteousness of God is revealed—a righteousness that is by faith from first to last, just as it is written: “The righteous will live by faith.”
God’s Wrath Against Sinful Humanity
18The wrath of God is being revealed from heaven against all the godlessness and wickedness of people, who suppress the truth by their wickedness, 19since what may be known about God is plain to them, because God has made it plain to them. 20For since the creation of the world God’s invisible qualities—his eternal power and divine nature—have been clearly seen, being understood from what has been made, so that people are without excuse.
21For although they knew God, they neither glorified him as God nor gave thanks to him, but their thinking became futile and their foolish hearts were darkened. 22Although they claimed to be wise, they became fools 23and exchanged the glory of the immortal God for images made to look like a mortal human being and birds and animals and reptiles.
24Therefore God gave them over in the sinful desires of their hearts to sexual impurity for the degrading of their bodies with one another. 25They exchanged the truth about God for a lie, and worshiped and served created things rather than the Creator—who is forever praised. Amen.
26Because of this, God gave them over to shameful lusts. Even their women exchanged natural sexual relations for unnatural ones. 27In the same way the men also abandoned natural relations with women and were inflamed with lust for one another. Men committed shameful acts with other men, and received in themselves the due penalty for their error.
28Furthermore, just as they did not think it worthwhile to retain the knowledge of God, so God gave them over to a depraved mind, so that they do what ought not to be done. 29They have become filled with every kind of wickedness, evil, greed and depravity. They are full of envy, murder, strife, deceit and malice. They are gossips, 30slanderers, God-haters, insolent, arrogant and boastful; they invent ways of doing evil; they disobey their parents; 31they have no understanding, no fidelity, no love, no mercy. 32Although they know God’s righteous decree that those who do such things deserve death, they not only continue to do these very things but also approve of those who practice them.       
 </Section.Content>
        <Section.Header name="tutorials">
            Tutorials
        </Section.Header>
        <Section.Content>
        1The revelation from Jesus Christ, which God gave him to show his servants what must soon take place. He made it known by sending his angel to his servant John, 2who testifies to everything he saw—that is, the word of God and the testimony of Jesus Christ. 3Blessed is the one who reads aloud the words of this prophecy, and blessed are those who hear it and take to heart what is written in it, because the time is near.
Greetings and Doxology
4John,
To the seven churches in the province of Asia:
Grace and peace to you from him who is, and who was, and who is to come, and from the seven spirits before his throne, 5and from Jesus Christ, who is the faithful witness, the firstborn from the dead, and the ruler of the kings of the earth.
To him who loves us and has freed us from our sins by his blood, 6and has made us to be a kingdom and priests to serve his God and Father—to him be glory and power for ever and ever! Amen.
7“Look, he is coming with the clouds,”
and “every eye will see him,
even those who pierced him”;
and all peoples on earth “will mourn because of him.”
So shall it be! Amen.
8“I am the Alpha and the Omega,” says the Lord God, “who is, and who was, and who is to come, the Almighty.”
John’s Vision of Christ
9I, John, your brother and companion in the suffering and kingdom and patient endurance that are ours in Jesus, was on the island of Patmos because of the word of God and the testimony of Jesus. 10On the Lord’s Day I was in the Spirit, and I heard behind me a loud voice like a trumpet, 11which said: “Write on a scroll what you see and send it to the seven churches: to Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia and Laodicea.”
12I turned around to see the voice that was speaking to me. And when I turned I saw seven golden lampstands, 13and among the lampstands was someone like a son of man, dressed in a robe reaching down to his feet and with a golden sash around his chest. 14The hair on his head was white like wool, as white as snow, and his eyes were like blazing fire. 15His feet were like bronze glowing in a furnace, and his voice was like the sound of rushing waters. 16In his right hand he held seven stars, and coming out of his mouth was a sharp, double-edged sword. His face was like the sun shining in all its brilliance.
17When I saw him, I fell at his feet as though dead. Then he placed his right hand on me and said: “Do not be afraid. I am the First and the Last.18I am the Living One; I was dead, and now look, I am alive for ever and ever! And I hold the keys of death and Hades.
19 “Write, therefore, what you have seen, what is now and what will take place later.20The mystery of the seven stars that you saw in my right hand and of the seven golden lampstands is this: The seven stars are the angels of the seven churches, and the seven lampstands are the seven churches.
        </Section.Content>
      </Section.Wrapper>
      <Navbar.BottomSpace></Navbar.BottomSpace>
      </Background.Wrapper>
    
    
  );
}

const Background = {
  Wrapper: styled.div`
    background-image: linear-gradient(rgba(0,0,200,0), rgba(0,100,225,.1), rgba(0,0,200,0), rgba(100,200,250,.1))`
}

const Styles = {
  Wrapper: styled.main`
    z-index: 1000;
    display: flex;
    background-color: rgba(255,255,255,1);
    position: fixed;
    box-shadow: 0px 5px 5px -7px;
    height: 70px;
    // 40em == 640px
    @media only screen and (max-width: 42em) {
      
      bottom: 0;
      background-color: white;
    }
  `
};

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;
    
    align-self: flex-start;

    padding: 1rem 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100vw;
    height: 60px;
  `,
  Logo: styled.div`
    color: rgb(0,0,128);
    padding-top: 10px;
    font-size: 60px;
  `,
  Items: styled.ul`
    list-style: none;
    padding-top: 20px;
    font-size: 20px;
    display: flex;

    @media only screen and (max-width: 42em) {
      position: fixed;
      right: 0;
      top: 0;

      height: 100%;

      flex-direction: column;

      background-color: white;
      padding: 1rem 2rem;

      transition: 0.2s ease-out;

      transform: ${({ openDrawer }) =>
        openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;

    @media only screen and (max-width: 42em) {
      padding: 1rem 0;
    }
  `,
  Link: styled.div`
    display: flex;
  `,
  Icon: styled.div`
  text-align: center;
  flex: 1;
  padding-right: 7px;
  padding-top: 2px;
  `,
  Text: styled.div`
  text-align: center;
  flex: 1;
  `,
  TopSpace: styled.div`
    position: relative;
    height: 70px;
    @media only screen and (max-width: 42em) {
      height: 0px;
    }
  `,
  BottomSpace: styled.div`
    position: relative;
    height: 0px;
    @media only screen and (max-width: 42em) {
      height: 70px;
    }
  `
};

const Section = {
  Header: styled(Element)`
    font-size: 45px;
    padding-top: 5px;
    padding-left: 10px;
  `,
  Content: styled.div`

  `,
  Wrapper: styled.div`
    position: relative;
  `
}

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 3rem;
    position: relative;
    font-size: 12px;

    display: none;

    @media only screen and (max-width: 42em) {
      display: block;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25%;
    }
  `,
  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      /* Create lines */
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: black;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `
};

const CSSReset = createGlobalStyle`
  *,
  *::before, 
  *::after {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;      
  }  

  body {
    font-size: 1.4rem;
    font-family: sans-serif;
  }
`;

export default App;
