import {
  ILabShell,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { Title, Widget } from '@lumino/widgets';

/**
 * Initialization data for the jupyterlab-active-as-tab-name extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-active-as-tab-name',
  autoStart: true,
  requires: [ILabShell],
  activate: (app: JupyterFrontEnd, labShell: ILabShell) => {
    const onTitleChanged = (title: Title<Widget>) => {
      console.log('the JupyterLab main application:', title);
      document.title = title.label;
    };

    // Keep the session object on the status item up-to-date.
    labShell.currentChanged.connect((_, change) => {
      const { oldValue, newValue } = change;

      // Clean up after the old value if it exists,
      // listen for changes to the title of the activity
      if (oldValue) {
        oldValue.title.changed.disconnect(onTitleChanged);
      }
      if (newValue) {
        newValue.title.changed.connect(onTitleChanged);
      }
    });
  }
};

export default extension;
