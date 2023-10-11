import Header from './Header/Header';
import { Box } from '@chakra-ui/react';

const Layout = ({ children, showHeader }) => {
  return (
    <Box p={5}>
      {showHeader && <Header />}
      {children}
    </Box>
  );
};

export default Layout;