import { Alignment, Button, ButtonGroup, Navbar } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { Loading } from "../store/Loading";
import { store } from "../store/Store";

export const Header = observer(() => {
  const { ui } = store;
    
  return <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>ShippingBoard Lite</Navbar.Heading>
      <Navbar.Divider />
      <ButtonGroup minimal>
        <Button icon="dashboard" text="Dashboard" onClick={ui.openDashboard} active={ui.isDashboardOpen}/>
        <Button icon="th" text="Loadings" onClick={ui.openLoadings} active={ui.isLoadingsOpen} />
      </ButtonGroup>
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT}>
      <ButtonGroup minimal>
        <Button icon="add" text="Add loading" onClick={() => ui.openLoadingDialog(Loading.create())}/>
      </ButtonGroup>
    </Navbar.Group>
  </Navbar>;
});
