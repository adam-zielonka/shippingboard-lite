import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";

export const Header = observer(() => {
    
  return <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>ShippingBoard Light</Navbar.Heading>
      <Navbar.Divider />
      <Button minimal icon="dashboard" text="Dashboard" />
      <Button minimal icon="th" text="List" />
    </Navbar.Group>
  </Navbar>;
});
