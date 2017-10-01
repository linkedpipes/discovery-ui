import React from "react"
import DiscoveryInputPart from "./discoveryInputPart"
import { values } from 'ramda';

const DiscoveryInput = ({components, ...props}) => (
    <div>
        <DiscoveryInputPart label="Data sources" componentType="datasets" components={values(components.datasets)} {...props} />
        <DiscoveryInputPart label="Transformers" componentType="processors" components={values(components.processors)} {...props} />
        <DiscoveryInputPart label="Applications" componentType="applications" components={values(components.applications)} {...props} />
    </div>
)

export default DiscoveryInput
