import React, { useState } from 'react';
import { GrafanaTheme, StandardEditorProps, SelectableValue } from '@grafana/data';
import { useStyles, Select } from '@grafana/ui';
import { css, cx } from 'emotion';
import lodash from 'lodash'

const getStyles = (theme: GrafanaTheme) => ({
    myStyle: css`
        background: ${theme.colors.bodyBg};
        display: flex;
        border-width: 1px 1px 3px 1px;
        border-style: solid;
        border-color: rgba(25, 125, 25, 1);
    `,
    cssOptions: css`
        font-weight: bold;
    `,
    cssOptionsLabel: css`
        margin-top: 5px;
        color: rgba(55, 175, 55, 1);
    `,
    cssOptionsSelect: css`
        border-width: 1px 1px 1px 1px;
        border-style: solid;
        border-color: rgba(25, 125, 25, 1);
    `,
    cssOptionsHelper: css`
        border-width: 1px 1px 1px 1px;
        border-style: solid;
        border-color: rgba(25, 125, 25, 1);
        padding: 5px;
        marging-top: 5px;
    `,
});

let arrFields: any = [];
let valueNew = {
    seriesId: "",
    fieldLabel: "",
    fieldValue: "",
    fieldFilter: "",
    seriesIdIndex: -19491001,
    fieldLabelIndex: -19491001,
    fieldValueIndex: -19491001,
    fieldFilterIndex: -19491001
};

export const SimpleEditor: React.FC<StandardEditorProps<any>> = ({ item, value, onChange, context }) => {
    const selectOptionsSeries: Array<SelectableValue<number>> = [];
    const styles = useStyles(getStyles);
    const [state, setState] = useState({
        selectOptionsFieldLabel: new Array<SelectableValue<number>>({
            label: "请选择用于资源显示标签的字段",
            value: -19491001
        }),
        selectOptionsFieldValue: new Array<SelectableValue<number>>({
            label: "请选择用于资源状态判断的字段",
            value: -19491001
        }),
        selectOptionsFieldFilter: new Array<SelectableValue<number>>({
            label: "请选择用于资源数据过滤的字段",
            value: -19491001
        }),
        seriesIdIndex: (value !== undefined && value.seriesIdIndex !== undefined) ? value.seriesIdIndex : -19491001,
        fieldLabelIndex: (value !== undefined && value.fieldLabelIndex !== undefined) ? value.fieldLabelIndex : -19491001,
        fieldValueIndex: (value !== undefined && value.fieldValueIndex !== undefined) ? value.fieldValueIndex : -19491001,
        fieldFilterIndex: (value !== undefined && value.fieldFilterIndex !== undefined) ? value.fieldFilterIndex : -19491001,
    });

    valueNew = {
        seriesId: (value !== undefined && value.seriesId !== undefined) ? value.seriesId : "",
        fieldLabel: (value !== undefined && value.fieldLabel !== undefined) ? value.fieldLabel : "",
        fieldValue: (value !== undefined && value.fieldValue !== undefined) ? value.fieldValue : "",
        fieldFilter: (value !== undefined && value.fieldFilter !== undefined) ? value.fieldFilter : "",
        seriesIdIndex: (value !== undefined && value.seriesIdIndex !== undefined) ? value.seriesIdIndex : -19491001,
        fieldLabelIndex: (value !== undefined && value.fieldLabelIndex !== undefined) ? value.fieldLabelIndex : -19491001,
        fieldValueIndex: (value !== undefined && value.fieldValueIndex !== undefined) ? value.fieldValueIndex : -19491001,
        fieldFilterIndex: (value !== undefined && value.fieldFilterIndex !== undefined) ? value.fieldFilterIndex : -19491001,
    };

    if (context.data) {
        selectOptionsSeries.push({
            label: "请选择用于资源显示列表的查询",
            value: -19491001
        })

        arrFields = [];
        context.data.forEach((series: any, indexSeries: number) => {
            if (series.meta.preferredVisualisationType === "table") {
                selectOptionsSeries.push({
                    label: series.refId,
                    value: parseInt((indexSeries + 1).toString().padEnd(6, "0"))
                });
                series.fields.forEach((field: any, indexField: number) => {
                    arrFields.push({
                        refId: series.refId,
                        name: field.name,
                        series: series.refId,
                        type: field.type,
                        value: parseInt((indexSeries + 1).toString().padEnd(6, "0")) + parseInt((indexField + 1).toString().padEnd(3, "0"))
                    })
                })
            } else if (series.meta.preferredVisualisationType === "graph") {
                // TODO::下一个大版本（Version 2.x.x）提供对Time Series格式的支持
            }
        })

        if ((value !== undefined && value.seriesIdIndex !== undefined)) {
            arrFields.forEach((field: any) => {
                if (field.refId === value.seriesId) {
                    state.selectOptionsFieldFilter.push({
                        label: field.name,
                        value: field.value
                    });

                    switch (field.type.trim().toLowerCase()) {
                        case "string":
                            state.selectOptionsFieldLabel.push({
                                label: field.name,
                                value: field.value
                            });
                            break
                        case "number":
                            state.selectOptionsFieldValue.push({
                                label: field.name,
                                value: field.value
                            });
                            break
                        default:
                            break
                    }
                }
            })
        }
    }

    let myOnChange = (sender: string, optionValue: any) => {
        if (sender === "option_series") {
            valueNew.seriesId = optionValue.label;
            valueNew.fieldLabel = "";
            valueNew.fieldValue = "";
            valueNew.fieldFilter = "";
            valueNew.seriesIdIndex = optionValue.value;
            valueNew.fieldLabelIndex = -19491001;
            valueNew.fieldValueIndex = -19491001;
            valueNew.fieldFilterIndex = -19491001;

            let stateNew = {
                selectOptionsFieldLabel: new Array<SelectableValue<number>>({
                    label: "请选择用于资源显示标签的字段",
                    value: -19491001
                }),
                selectOptionsFieldValue: new Array<SelectableValue<number>>({
                    label: "请选择用于资源状态判断的字段",
                    value: -19491001
                }),
                selectOptionsFieldFilter: new Array<SelectableValue<number>>({
                    label: "请选择用于资源数据过滤的字段",
                    value: -19491001
                }),
                seriesIdIndex: optionValue.value,
                fieldLabelIndex: -19491001,
                fieldValueIndex: -19491001,
                fieldFilterIndex: -19491001,
            };

            arrFields.forEach((field: any) => {
                if (field.refId === optionValue.label) {
                    stateNew.selectOptionsFieldFilter.push({
                        label: field.name,
                        value: field.value
                    });

                    switch (field.type.trim().toLowerCase()) {
                        case "string":
                            stateNew.selectOptionsFieldLabel.push({
                                label: field.name,
                                value: field.value
                            });
                            break
                        case "number":
                            stateNew.selectOptionsFieldValue.push({
                                label: field.name,
                                value: field.value
                            });
                            break
                        default:
                            break
                    }
                }
            })
            setState(stateNew);
        } else if (sender === "option_label") {
            valueNew.fieldLabel = optionValue.label;
            valueNew.fieldLabelIndex = optionValue.value;

            let stateNew = lodash.cloneDeep(state);
            stateNew.fieldLabelIndex = optionValue.value;
            setState(stateNew);
        } else if (sender === "option_value") {
            valueNew.fieldValue = optionValue.label;
            valueNew.fieldValueIndex = optionValue.value;

            let stateNew = lodash.cloneDeep(state);
            stateNew.fieldValueIndex = optionValue.value;
            setState(stateNew);
        } else if (sender === "option_filter") {
            valueNew.fieldFilter = optionValue.label;
            valueNew.fieldFilterIndex = optionValue.value;

            let stateNew = lodash.cloneDeep(state);
            stateNew.fieldFilterIndex = optionValue.value;
            setState(stateNew);
        }

        onChange(valueNew);
    }

    return <div className={cx(styles.cssOptions)}>
        <div  className={cx(styles.cssOptionsHelper)}>
            <strong>简要说明：</strong><br/>
            <ul>
                <li>Version 1.x.x仅支持选择一条查询，且 Format 必须为 Table；</li>
                <li>行数据将被视为资源实例，即：存在几行数据则认定为几个资源实例；</li>
                <li>需选定某一列为标题列；</li>
                <li>需选定某一列为状态判定列，支持两种状态：正常，故障；</li>
                <li>开发中：支持自定义状态值比较表达式；</li>
                <li>开发中：选定某一列为行过滤列，且支持自定义过滤条件表达式；</li>
            </ul>
        </div>
        <div>
            <div className={cx(styles.cssOptionsLabel)}>资源查询定义选择</div>
            <Select className={cx(styles.cssOptionsSelect)}
                options={selectOptionsSeries}
                value={state.seriesIdIndex}
                onChange={(selectableValue) => myOnChange("option_series", selectableValue)} />
        </div>
        <div>
            <div className={cx(styles.cssOptionsLabel)}>资源标签字段选择</div>
            <Select className={cx(styles.cssOptionsSelect)}
                options={state.selectOptionsFieldLabel}
                value={state.fieldLabelIndex}
                onChange={(selectableValue) => myOnChange("option_label", selectableValue)} />
        </div>
        <div>
            <div className={cx(styles.cssOptionsLabel)}>资源状态字段选择</div>
            <Select className={cx(styles.cssOptionsSelect)}
                options={state.selectOptionsFieldValue}
                value={state.fieldValueIndex}
                onChange={(selectableValue) => myOnChange("option_value", selectableValue)} />
        </div>
        <div>
            <div className={cx(styles.cssOptionsLabel)}>资源过滤字段选择</div>
            <Select className={cx(styles.cssOptionsSelect)}
                options={state.selectOptionsFieldFilter}
                value={state.fieldFilterIndex}
                onChange={(selectableValue) => myOnChange("option_filter", selectableValue)} />
        </div>
    </div>;
};