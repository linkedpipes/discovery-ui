import React, { PureComponent } from 'react';
import { Button, DialogContainer } from 'react-md';

export default class OutputDataSamplePreview extends PureComponent {
    state = { visible: false };

    show = () => {
        this.setState({ visible: true });
    };

    hide = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible } = this.state;
        const actions = [{
            onClick: this.hide,
            primary: true,
            children: 'Close',
        }];

        return (
            <span>
                <Button raised onClick={this.show}>Show Data Sample</Button>
                <DialogContainer
                    id="data-sample"
                    visible={visible}
                    title="Output data sample"
                    onHide={this.hide}
                    modal
                    actions={actions}
                >
                    <pre id="speed-boost-description" className="md-color--secondary-text">
                        {this.props.dataSample}
                    </pre>
                </DialogContainer>
            </span>
        );
    }
}