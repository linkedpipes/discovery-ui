import React from "react"
import DiscoveryInputPart from "./discoveryInputPart"

const DiscoveryInput = ({components, ...props}) => (
    <div>
        <DiscoveryInputPart label="Data sources" componentType="datasets" components={components.datasets} {...props} />
        <DiscoveryInputPart label="Transformers" componentType="processors" components={components.processors} {...props} />
        <DiscoveryInputPart label="Applications" componentType="applications" components={components.applications} {...props} />
    </div>
)

export default DiscoveryInput
