import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Mensaje = styled.p`
  background-color: #a50a0a;
  color: white;
  font-size: 20px;
  font-weight: 700;
  padding: 20px 10px;
  text-align: center;
`;

const Error = ({ children }) => {
  return <Mensaje>{children}</Mensaje>;
};

Error.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Error;
