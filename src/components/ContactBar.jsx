import Button from "react-bootstrap/Button";
import {
  IoIosMail,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMdDownload
} from "react-icons/io";
import styled from "styled-components";

/*
Contact bar displaying a resume download button, as well as links to linkedin,
github, and email.
*/

function ContactBar() {
  return (
    <Contactbar.Items>
      <Contactbar.Item>
        <Button
          variant="primary"
          href="/src/resources/RyanJakielResume.pdf"
          target="_blank"
          style={{ maxWidth: "250px" }}
        >
          <IoMdDownload />
          &nbsp;Download Resume
        </Button>
      </Contactbar.Item>
      <Contactbar.Item>
        <a
          href="https://github.com/ryanjakiel4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoGithub />
        </a>
      </Contactbar.Item>
      <Contactbar.Item>
        <a
          href="https://www.linkedin.com/in/ryan-jakiel-ba3a73107/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoLinkedin />
        </a>
      </Contactbar.Item>
      <Contactbar.Item>
        <a
          href="mailto:rjakiel@vt.edu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoIosMail />
        </a>
      </Contactbar.Item>
    </Contactbar.Items>
  );
}

const Contactbar = {
  Items: styled.ul`
      list-style: none;
      padding-top: 20px;
      font-size: 20px;
      display: flex;
    `,
  Item: styled.li`
      padding: 0 1rem;
    `
};

export default ContactBar;
