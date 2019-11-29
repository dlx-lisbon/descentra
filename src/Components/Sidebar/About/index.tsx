import React from 'react';
import { Panel } from 'rsuite';


export default function About() {
    return (
        <div style={{ margin: '50px 0px' }}>
            <Panel shaded={true} bordered={true} bodyFill={true} style={{ display: 'inline-block', width: 350 }}>
                <img alt="placeholder" src="https://via.placeholder.com/350x240" height="240" />
                <Panel header="RSUITE">
                    <p>
                        <small>
                            A suite of React components, sensible UI design,
                            and a friendly development experience.
                    </small>
                    </p>
                </Panel>
            </Panel>
        </div>
    );
}
