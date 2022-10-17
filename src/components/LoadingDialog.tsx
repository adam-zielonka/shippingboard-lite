import { Button, Classes, Dialog } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";

export const LoadingDialog = observer(() => {
  const { ui } = store;
    
  return <Dialog isOpen={ui.isLoadingDialogOpen} title={"Loading"} onClose={ui.closeLoadingDialog}>
    <div className={Classes.DIALOG_BODY}>
      <p>
        <strong>
            Dolorum tempora mollitia enim cupiditate,
            aut perferendis iure earum reprehenderit cum, eveniet blanditiis ducimus maxime autem quibusdam
            esse ea unde et distinctio!
        </strong>
      </p>
      <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum tempora mollitia enim cupiditate,
            aut perferendis iure earum reprehenderit cum, eveniet blanditiis ducimus maxime autem quibusdam
            esse ea unde et distinctio!
      </p>
      <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum tempora mollitia enim cupiditate,
            aut perferendis iure earum reprehenderit cum, eveniet blanditiis ducimus maxime autem quibusdam
            esse ea unde et distinctio!
      </p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
    </div>
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={ui.closeLoadingDialog}>Close</Button>
      </div>
    </div>
  </Dialog>;
});
