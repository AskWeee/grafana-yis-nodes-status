import React, { useState, useEffect } from 'react';
import { GrafanaTheme, PanelProps } from '@grafana/data';
import { useStyles } from '@grafana/ui';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';

interface Props extends PanelProps<SimpleOptions> { }

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
    const styles = useStyles(getStyles);

    const [state, setState] = useState({
        arrLabels: new Array(),
        arrValues: new Array()
    });

    // options is changed ...
    useEffect(() => {
        let stateNew = {
            arrLabels: new Array(),
            arrValues: new Array()
        }

        let seriesIndex = -1;
        for (let i = 0; i < data.series.length; i++) {
            if (data.series[i].refId = options.editorOptions.seriesId) {
                seriesIndex = i;
                break
            }
        }

        if (seriesIndex != -1) {
            data.series[seriesIndex].fields.forEach((field) => {
                if (field.name.toLowerCase() === options.editorOptions.fieldLabel) {
                    stateNew.arrLabels = field.values.toArray();
                }

                if (field.name.toLowerCase() === options.editorOptions.fieldValue) {
                    stateNew.arrValues = field.values.toArray();
                }
            });

            setState(stateNew);
        }
    }, [options]);

    return (
        <div
            className={cx(
                styles.wrapper,
                css`
                    width: ${width}px;
                    height: ${height}px;
                `
            )}
        >
            {
                state.arrLabels.map((value: any, index: number) => {
                    let myLabel = value;
                    let myValue = state.arrValues[index];
                    let myStatus = "正常";
                    let className = styles.hostNormal;

                    if (myValue > 0) {
                        className = styles.hostWarn;
                        myStatus = "故障";
                    }

                    return <div className={cx(className, css`height: ${height - 20}px;`)}>
                        <div className={cx(styles.boxMain)}>
                            <div className={cx(styles.boxStatus)}>
                                <div className={cx(styles.hostStatus)}>{myStatus}</div>
                            </div>
                            <div className={cx(styles.boxLabel)}>
                                <div className={cx(styles.hostName)}>{myLabel}</div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
};

const getStyles = (theme: GrafanaTheme) => ({
    wrapper: css`
    position: relative;
    overflow: auto;
    white-space: nowrap;
`,
    hostNormal: css`
    display: inline-block;
    width: 100px;
    background: rgba(55, 175, 55, 1);
    border-width: 1px 1px 3px 1px;
    border-style: solid;
    border-color: rgba(25, 125, 25, 1);
    margin: 10px 0 0 10px;
    color: rgba(225, 225, 225, 1);
    text-align: center;
    border-radius: 25px 25px 0 0;
`,
    hostWarn: css`
    display: inline-block;
    width: 100px;
    background: rgba(175, 55, 55, 1);
    border-width: 1px 1px 3px 1px;
    border-style: solid;
    border-color: rgba(125, 25, 25, 1);
    margin: 10px 0 0 10px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    border-radius: 25px 25px 0 0;
`,
    boxMain: css`
    display: grid;
    grid-template-rows: 1fr 30px;
    height: 100%;
`,
    boxStatus: css`
    display: grid;
    justify-content: center;
    align-content: center;
`,
    boxLabel: css`
    display: grid;
    justify-content: center;
    align-content: center;
`,
    hostStatus: css`
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 3px;
    color: rgba(225, 225, 225, 1);
`,
    hostName: css`
    display: inline-block;
`});

// const getStyles = stylesFactory(() => {
//     return {

//     };
// });
