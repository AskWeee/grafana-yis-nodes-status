import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { SimpleEditor } from './SimpleEditor';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
    return builder
        .addCustomEditor({
            id: 'editorOptions',
            path: 'editorOptions',
            name: '参数配置',
            editor: SimpleEditor
        });

});
